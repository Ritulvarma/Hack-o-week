const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Connect to MongoDB (assuming local MongoDB is running)
mongoose.connect('mongodb://localhost:27017/wearable', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define schema for encrypted data
const dataSchema = new mongoose.Schema({
  encryptedData: String,
  timestamp: { type: Date, default: Date.now }
});

const Data = mongoose.model('Data', dataSchema);

// Encryption settings
const algorithm = 'aes-256-cbc';
// In production, use a secure key from environment variables
const key = crypto.scryptSync('your-secret-key', 'salt', 32); // Example key derivation
const iv = crypto.randomBytes(16); // Generate a new IV for each encryption

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted
  };
}

// WebSocket connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('wearableData', (data) => {
    console.log('Received data:', data);
    // Validate data (basic check)
    if (data.heartRate && data.steps) {
      const payload = JSON.stringify(data);
      const encrypted = encrypt(payload);
      const encryptedPayload = JSON.stringify(encrypted);

      const newData = new Data({ encryptedData: encryptedPayload });
      newData.save()
        .then(() => {
          console.log('Data encrypted and saved to database');
          socket.emit('dataReceived', { status: 'success' });
        })
        .catch(err => {
          console.error('Error saving data:', err);
          socket.emit('dataReceived', { status: 'error', message: 'Failed to save data' });
        });
    } else {
      socket.emit('dataReceived', { status: 'error', message: 'Invalid data format' });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
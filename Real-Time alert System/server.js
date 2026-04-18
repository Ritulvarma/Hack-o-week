const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Encryption key (in production, use environment variable)
const ENCRYPTION_KEY = crypto.randomBytes(32); // 32 bytes for AES-256
const ALGORITHM = 'aes-256-cbc';

function encrypt(text) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

io.on('connection', (socket) => {
  console.log('Client connected');

  // Simulate heart rate monitoring
  const interval = setInterval(() => {
    const bpm = Math.floor(Math.random() * 60) + 60; // Random BPM between 60-120
    socket.emit('data', { bpm });

    if (bpm > 100) {
      const message = `Anomaly detected: High BPM ${bpm}`;
      const encryptedMessage = encrypt(message);
      socket.emit('alert', { encryptedMessage });
    }
  }, 1000); // Every second

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    clearInterval(interval);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
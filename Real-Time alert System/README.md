# Real-Time Alert System Backend

This is the backend service for a real-time alert system that monitors streams, detects anomalies (e.g., high BPM), and pushes encrypted notifications.

## Features

- Real-time monitoring of heart rate (BPM) streams
- Anomaly detection for high BPM (>100)
- Encrypted notifications pushed to connected clients via WebSockets

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Run the server:
   ```
   npm start
   ```

The server will start on port 3000.

## Usage

Clients can connect using Socket.io client.

- Receives 'data' events with BPM values
- Receives 'alert' events with encrypted anomaly messages

To decrypt alerts, use the same key and AES-256-CBC algorithm.

## Security

- Notifications are encrypted using AES-256-CBC
- In production, use secure key management and HTTPS
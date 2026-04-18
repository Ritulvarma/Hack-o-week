# Wearable Data Ingestion API

This project provides a WebSocket-based API endpoint for receiving real-time wearable data (heart rate and steps), encrypting the payloads, and storing them in a MongoDB database.

## Setup

1. Ensure Node.js is installed.
2. Ensure MongoDB is installed and running locally on port 27017.
3. Install dependencies:
   ```
   npm install
   ```

## Running the Server

```
npm start
```

The server will run on port 3000.

## Usage

Connect to the WebSocket server at `ws://localhost:3000` using a WebSocket client (e.g., Socket.io client).

Send data in the format:
```json
{
  "heartRate": 75,
  "steps": 1000
}
```

The data will be encrypted and stored in the database.

## Encryption

Data is encrypted using AES-256-CBC before being inserted into the database. The encryption key is derived from a secret key (change in production).

## Database

Data is stored in a MongoDB collection with fields:
- `encryptedData`: The encrypted JSON string
- `timestamp`: Automatic timestamp
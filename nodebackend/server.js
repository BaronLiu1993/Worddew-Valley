const WebSocket = require('ws');
const { SerialPort } = require('serialport');
const port = new SerialPort({
  path: 'COM4', 
  baudRate: 115200,
});
const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', (ws) => {
  console.log('Client connected');

  port.on('data', (data) => {
    // Send the incoming data from Arduino to the client
    ws.send(data.toString());
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');

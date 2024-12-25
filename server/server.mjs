import express from "express";
import bodyParser from "body-parser";
import { SerialPort } from "serialport";

const app = express();
// Start the server

const PORT = 3001;

// Replace 'COM8' with the correct COM port for your Arduino
const COM_PORT = "COM8";
const BAUD_RATE = 9600;

// Middleware
app.use(bodyParser.json());

/* // Initialize SerialPort
let port;
try {
  port = new SerialPort({ path: COM_PORT, baudRate: BAUD_RATE }, (err) => {
    if (err) {
      console.error(`Failed to open serial port: ${err.message}`);
      process.exit(1); // Exit the server if the port fails to open
    } else {
      console.log(`Serial port ${COM_PORT} opened successfully.`);
    }
  });
} catch (error) {
  console.error(`Error initializing serial port: ${error.message}`);
  process.exit(1); // Exit the server if the port initialization fails
} */

// Store the latest ETA received from the client
let latestETA = null;
app.get("/health", (req, res) => {
  res.send("Server is healthy");
});
// POST endpoint to receive ETA
app.post("/send-eta", (req, res) => {
  const { etaMinutes } = req.body;

  if (etaMinutes === undefined) {
    res.status(400).send("ETA is missing from the request.");
    return;
  }

  latestETA = etaMinutes; // Update the latest ETA
  console.log(`Received new ETA: ${latestETA} minutes`);
  res.send(`ETA received: ${latestETA} minutes`);
});

// Function to send ETA to Arduino every minute
/* function sendETAtoArduino() {
  if (latestETA === null) {
    console.log("No ETA to send yet.");
    return;
  }

  const message = `ETA:${latestETA}\n`; // Format message to send to Arduino

  if (port && port.isOpen) {
    port.write(message, (err) => {
      if (err) {
        console.error(`Error writing to serial port: ${err.message}`);
      } else {
        console.log(`ETA sent to Arduino: ${message}`);
      }
    });
  } else {
    console.error("Serial port is not open.");
  }
} */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// setInterval(sendETAtoArduino, 60000); // 60,000 milliseconds = 1 minute

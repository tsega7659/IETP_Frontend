import axios from "axios";

const busStops = [
  { name: "Megenagna", timeToNext: 10 },
  { name: "Gerji (Infront of Tottot)", timeToNext: 8 },
  { name: "Gerji MebratHail", timeToNext: 5 },
  { name: "Jackros Square", timeToNext: 6 },
  { name: "Goro Intersection", timeToNext: 15 },
  { name: "ICT Park", timeToNext: 8 },
  { name: "Hot Water Spring", timeToNext: 5 },
  { name: "Gojo Arsema Station", timeToNext: 13 },
  { name: "Koye 16", timeToNext: 5 },
  { name: "Koye Square", timeToNext: 5 },
  { name: "AASTU", timeToNext: 5 },
  { name: "Tulu Dimtu Square", timeToNext: 0 }, // Last stop
];

// Total trip duration
let tripDuration = busStops.reduce((total, stop) => total + stop.timeToNext, 0); // Sum of timeToNext values
let currentStopIndex = 0; // Track current stop
let boardingFlag = false; // Flag for boarding status

// Calculate ETAs for all stops based on tripDuration
function calculateETAs() {
  let remainingTime = tripDuration;
  return busStops.map((stop, index) => {
    const eta = remainingTime;
    remainingTime -= stop.timeToNext; // Decrease remaining time for the next stop
    return { ...stop, eta };
  });
}

// Simulate ETA updates
async function sendSimulatedETA() {
  try {
    const etas = calculateETAs(); // Recalculate ETAs
    const currentStop = etas[currentStopIndex];

    if (boardingFlag) {
      console.log(`Bus is boarding passengers at ${currentStop.name}...`);
      await axios.post("http://localhost:3000/send-eta", {
        stopName: currentStop.name,
        status: "boarding",
      });
      boardingFlag = false; // End boarding status
      currentStopIndex++; // Move to next stop
    } else if (currentStop.eta <= 1) {
      console.log(`Bus has arrived at ${currentStop.name}.`);
      await axios.post("http://localhost:3000/send-eta", {
        stopName: currentStop.name,
        eta: currentStop.eta,
        status: "arrived",
      });
      boardingFlag = true; // Set boarding flag
    } else {
      console.log(
        `Sending ETA for ${currentStop.name}: ${currentStop.eta} minutes`
      );
      await axios.post("http://localhost:3000/send-eta", {
        stopName: currentStop.name,
        eta: currentStop.eta,
        status: "en route",
      });
    }

    // Decrement trip duration
    tripDuration--;

    // Reset trip if all stops are covered
    if (currentStopIndex >= busStops.length) {
      console.log("Trip completed. Resetting...");
      resetTrip();
    }
  } catch (error) {
    console.error("Error sending simulated ETA:", error.message);
  }
}

// Reset trip variables for a new trip
function resetTrip() {
  tripDuration = busStops.reduce((total, stop) => total + stop.timeToNext, 0); // Reset trip duration
  currentStopIndex = 0;
  boardingFlag = false;
}

// Simulate updates every 1 minute
setInterval(sendSimulatedETA, 60000);

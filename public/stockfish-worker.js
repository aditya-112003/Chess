const Stockfish = require('./stockfish.js')

const stockfish = self.Stockfish(); // Initialize Stockfish

self.onmessage = (e) => {
  const { uciMessage } = e.data;

  if (uciMessage === "quit") {
    stockfish.postMessage(uciMessage);
    self.close(); // Terminate the worker
  } else {
    stockfish.postMessage(uciMessage);
  }
};

stockfish.onmessage = (e) => {
  self.postMessage(e.data);
};

"use strict";

import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET"],
      credentials: true
  }
});

// Store data in an object to keep the global namespace clean and 
// prepare for multiple instances of data if necessary
function Data() {
  this.orders = {};
}

/*
  Adds an order to to the queue
*/
Data.prototype.addOrder = function (order) {
  //Store the order in an "associative array" with orderId as key
  this.orders[order.orderId] = order;
};

Data.prototype.setStatus = function (orderId, status) {
  //Store the order in an "associative array" with orderId as key
  this.orders[orderId].status = status;
};

Data.prototype.getAllOrders = function () {
  return this.orders;
};

let data = new Data();

io.on('connection', function (socket) {

  // Send list of orders when a client connects
  socket.emit('currentQueue', { orders: data.getAllOrders() });

  // When a connected client emits an "addOrder" message
  socket.on('addOrder', function (order) {
    data.addOrder(order);
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('currentQueue', { orders: data.getAllOrders() });
  });

  // When a connected client emits an "clearQueue" message
  socket.on('clearQueue', function () {
    data = new Data();
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('currentQueue', { orders: data.getAllOrders() });
  });

  socket.on('changeStatus', function (orderStatus) {
    data.setStatus(orderStatus.orderId, orderStatus.status);
    // send updated info to all connected clients, note the use of io instead of socket
    io.emit('currentQueue', { orders: data.getAllOrders() });
  });

});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, function() {
    console.log("Socket.io server running on http://localhost:" + PORT);
});


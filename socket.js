const { isTransactionUpdateString, extractAddress } = require("./utils");

class socketActions {
  constructor(socket) {
    this.io = socket;
    this.connectInternal();
  }
  connectInternal = () => {
    this.io.on("connection", (socket) => {
      console.log("New user connected");
      socket.on("subscribe", (data) => {
        console.log(data.eventType);
        if (data.eventType === "chart_updates") {
          console.log(
            `Client subscribed to recieve chart updates for token ${data.room}`
          );
          socket.join(data.room);
        } else if (data.eventType === 'transaction_updates'){
          console.log(`Client subscribed to receive transaction updates`);
          socket.join('transaction_updates')
        } else if (isTransactionUpdateString(data.eventType)){
          const address = extractAddress(data.eventType);
          console.log(`client subscribed to receive transaction updates about token ${address}`);
          socket.join(`transaction_updates:${address}`);
        } else if (data.eventType === "hype_lord_update"){
          console.log(`client subscribed to receive hype lord updates`);
          socket.join(`hype_lord_updates`);
        } else if (data.eventType === "pump_king_update"){
          console.log('client subscribed to recieve updates about pump king');
          socket.join('pump_king_updates');
        } else if (data.eventType === 'token_launch_updates'){
          console.log('client subscribed to recieve token launch updatse');
          socket.join('token_launch_updates');
        }
      });
      socket.on("new_transaction", (data) => {
        this.sendTransactionUpdate(data);
        this.sendTokenTransactionUpdate(data.token_mint, data);
      })
      socket.on('new_hype_lord',(data) => {
        this.io.to('hype_lord_updates').emit('hype_lord_update', data);
      })
      socket.on('new_pump_king', (data) => {
        this.io.to('pump_king_updates').emit('pump_king_update', data);
      })
      socket.on('new_token_launch', (data) => {
        this.io.to('token_launch_updates').emit('token_launched', data)
      })
    });
  };
  sendUpdateToRoom(room, data) {
    this.io.to(room).emit("chart_updates", data);
    console.log(`Sent update to room: ${room}`);
  };
  sendTransactionUpdate(data){
    this.io.to("transaction_updates").emit("transaction_update", data);
  };
  sendTokenTransactionUpdate(mint, data){
    console.log(mint, data);
    this.io.to(`transaction_updates:${mint}`).emit(`transaction_update:${mint}`, data)
  }
}

module.exports = socketActions;

const { initPrompt, chat } = require('./chatAI');

module.exports = SocketIO = (io) => {
    initPrompt();
    const socketio = io;
    socketio.sockets.on('connection', socket => {
        
        socket.on('disconnect', () => {
            console.log('disconnected')
        })

        socket.on('chat', async(msg) => {
            const reply = await chat(msg);
            socket.emit('@response', {
                message: reply
            })
        })
    })
}
module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.content === '!ping') {
            const ping = client.ws.ping;
            message.channel.send(`ค่า Ping ของบอทคือ ${ping} ms`);
        }
    });
};

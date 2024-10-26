module.exports = (client, startTime) => {
    client.on('messageCreate', async (message) => {
        if (message.content === '!uptime') {
            const uptimeInSeconds = Math.floor((Date.now() - startTime) / 1000);
            const hours = Math.floor(uptimeInSeconds / 3600);
            const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
            const seconds = uptimeInSeconds % 60;

            message.channel.send(`บอทกำลังทำงานมาแล้ว ${hours} ชั่วโมง ${minutes} นาที ${seconds} วินาที`);
        }
    });
};

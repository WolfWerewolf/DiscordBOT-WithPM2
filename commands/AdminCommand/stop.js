const { exec } = require('child_process');

module.exports = (client) => {
client.on('messageCreate', (message) => {
    // ตรวจสอบว่าผู้ใช้ไม่เป็นบอทและส่งข้อความที่เริ่มต้นด้วย !
    if (!message.author.bot && message.content.startsWith('!stop')) {
        message.channel.send('Stopping the bot...');
        
        // รันคำสั่งใน cmd
        exec('pm2 stop DiscordBOT', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });

        client.destroy(); // ปิดบอท
    }
});
};
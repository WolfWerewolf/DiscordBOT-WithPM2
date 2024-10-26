const { exec } = require('child_process');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.content === '!restart') {
            // ตรวจสอบว่าเป็นผู้ใช้ที่มีสิทธิ์ในการใช้คำสั่ง
            if (!message.member.permissions.has('ADMINISTRATOR')) {
                return message.channel.send('คุณไม่มีสิทธิ์ในการรีสตาร์ทบอท!');
            }

            message.channel.send('กำลังรีสตาร์ทบอท...');

            // รีสตาร์ทบอทด้วย pm2
            exec('pm2 restart DiscordBOT', (error, stdout, stderr) => {
                if (error) {
                    console.error(`เกิดข้อผิดพลาด: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`ข้อผิดพลาด: ${stderr}`);
                    return;
                }
                console.log(`ผลลัพธ์: ${stdout}`);
            });
        }
    });
};

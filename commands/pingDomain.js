const { exec } = require('child_process');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.content.startsWith('!ping ')) {
            const target = message.content.split(' ')[1]; // ดึง IP หรือ Domain ที่ผู้ใช้ระบุ
            exec(`ping -c 4 ${target}`, (error, stdout, stderr) => { // สำหรับ Unix/Linux
                if (error) {
                    message.channel.send(`เกิดข้อผิดพลาด: ${error.message}`);
                    return;
                }
                if (stderr) {
                    message.channel.send(`ข้อผิดพลาด: ${stderr}`);
                    return;
                }
                message.channel.send(`ผลลัพธ์การ ping:\n\`\`\`${stdout}\`\`\``);
            });
        }
    });
};

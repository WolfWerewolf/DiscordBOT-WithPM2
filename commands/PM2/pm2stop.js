const { exec } = require('child_process');

module.exports = (client) => {
    client.on('messageCreate', message => {
    // ตรวจสอบคำสั่ง !pm stop <name>
    if (message.content.startsWith('!pm stop') && message.member.permissions.has('Administrator')) {
        const args = message.content.split(' ');
        const processName = args.slice(2).join(' '); // ดึงชื่อโปรเซสที่ต้องการหยุด

        if (!processName) {
            message.reply('กรุณาระบุชื่อโปรเซสที่ต้องการหยุด เช่น `!pm stop DiscordBOT`');
            return;
        }

        // รันคำสั่ง pm2 stop <name>
        exec(`pm2 stop ${processName}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error stopping process: ${error.message}`);
                message.reply(`ไม่สามารถหยุดโปรเซส **${processName}** ได้: ${error.message}`);
                return;
            }
            
            message.reply(`โปรเซส **${processName}** ถูกหยุดเรียบร้อยแล้ว`);
        });
    }
});
};
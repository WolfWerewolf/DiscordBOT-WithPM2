const { exec } = require('child_process');

module.exports = (client) => {
    client.on('messageCreate', message => {
        if (message.content === '!pm list' && message.member.permissions.has('Administrator')) {
            // รันคำสั่ง pm2 jlist เพื่อดึงข้อมูลในรูปแบบ JSON
            exec('pm2 jlist', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error running pm2 jlist: ${error.message}`);
                    message.reply(`ไม่สามารถรันคำสั่ง pm2 jlist ได้: ${error.message}`);
                    return;
                }
                
                // แปลงผลลัพธ์ JSON เป็นข้อมูลที่อ่านง่าย
                let statusMessage = 'สถานะของโปรเซสใน PM2:\n';
    
                try {
                    const processes = JSON.parse(stdout);
                    
                    processes.forEach(proc => {
                        const name = proc.name;
                        const id = proc.pm_id;
                        const status = proc.pm2_env.status;
                        
                        // สร้างข้อความรายงานสถานะ
                        statusMessage += `\n**${name}** (ID: ${id}): ${status === 'online' ? '🟢 เปิดอยู่' : '🔴 ปิดอยู่'}`;
                    });
    
                    message.reply(statusMessage.trim()); // ส่งสถานะไปยังช่อง Discord
    
                } catch (parseError) {
                    console.error(`Error parsing JSON output: ${parseError.message}`);
                    message.reply('เกิดข้อผิดพลาดในการแปลงข้อมูล JSON จาก pm2');
                }
            });
        }
    });
};

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.content === '!help') {
            const helpMessage = `
\n\`\`\`**คำสั่งที่มีในบอท:**
1. **!weather <สถานที่>** - ดูสภาพอากาศปัจจุบัน
2. **!uptime** - ดูระยะเวลาที่บอททำงาน
3. **!ping** - ดูค่า Ping ของบอท
4. **!ping <IP/Domain>** - ปิง IP หรือ Domain
5. **!commands** - ดูรายการคำสั่งทั้งหมด (คำสั่งนี้)\`\`\`
            `;
            message.channel.send(helpMessage);
        }
    });
};

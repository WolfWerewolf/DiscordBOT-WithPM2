// roleHandler.js
const config = require('../settings/config');

async function addRole(member) {
    const role = member.guild.roles.cache.get(config.ROLE_ID);
    if (role) {
        await member.roles.add(role);
        console.log(`Added role ${role.name} to ${member.user.tag}`);
        
        // ส่งข้อความในช่องที่กำหนด
        const channel = member.guild.channels.cache.get(config.LOG_CHANNEL_ID); // เปลี่ยนเป็น ID ของช่องที่ต้องการ
        if (channel) {
            await channel.send(`เพิ่ม role ${role.name} ให้กับ ${member.user.tag}`);
        }
    }
}

async function removeRole(member) {
    const role = member.guild.roles.cache.get(config.ROLE_ID);
    if (role) {
        await member.roles.remove(role);
        console.log(`Removed role ${role.name} from ${member.user.tag}`);
        
        // ส่งข้อความเมื่อมีการลบ role
        const channel = member.guild.channels.cache.get(config.LOG_CHANNEL_ID); // เปลี่ยนเป็น ID ของช่องที่ต้องการ
        if (channel) {
            await channel.send(`ลบ role ${role.name} จาก ${member.user.tag}`);
        }
    }
}

module.exports = {
    addRole,
    removeRole,
};

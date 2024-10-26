const { GuildMember } = require('discord.js');
const config = require('../settings/config');
const { addRole, removeRole } = require('./roleHandler'); // นำเข้าฟังก์ชันจัดการยศ

async function handleReactionAdd(reaction, user) {
    if (reaction.emoji.name === config.EMOJI && reaction.message.id === config.MESSAGE_ID && !user.bot) {
        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
        await addRole(member); // เรียกใช้ฟังก์ชันเพิ่มยศ
    }
}

async function handleReactionRemove(reaction, user) {
    if (reaction.emoji.name === config.EMOJI && reaction.message.id === config.MESSAGE_ID && !user.bot) {
        const guild = reaction.message.guild;
        const member = guild.members.cache.get(user.id);
        await removeRole(member); // เรียกใช้ฟังก์ชันลบยศ
    }
}

module.exports = {
    handleReactionAdd,
    handleReactionRemove,
};

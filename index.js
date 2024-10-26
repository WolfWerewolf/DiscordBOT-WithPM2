const { Client, GatewayIntentBits } = require('discord.js');
const config = require('./settings/config');
const { handleReactionAdd, handleReactionRemove } = require('./features/reactionHandler');
const startTime = Date.now();
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
});
// นำเข้าคำสั่ง
const uptimeCommand = require('./commands/uptime');
const pingCommand = require('./commands/ping');
const pingDomainCommand = require('./commands/pingDomain');
const weatherCommand = require('./commands/weather'); // เพิ่มคำสั่ง Weather
const helpCommand = require('./commands/help');
//คำสั่ง Admin
const stopCommand = require('./commands/AdminCommand/stop')
const restartCommand = require('./commands/AdminCommand/restart');
//คำสั่ง PM2
const pm2stopCommand = require('./commands/PM2/pm2stop')
const pm2startCommand = require('./commands/PM2/pm2start')
const pm2listCommand = require('./commands/PM2/pm2list')

// เรียกใช้คำสั่ง
uptimeCommand(client, startTime);
pingCommand(client);
pingDomainCommand(client);
weatherCommand(client);
helpCommand(client);
restartCommand(client);
stopCommand(client)
pm2listCommand(client)
pm2stopCommand(client)
pm2startCommand(client)

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const channel = await client.channels.fetch(config.CHANNEL_ID);
    const message = await channel.messages.fetch(config.MESSAGE_ID);
    await message.react(config.EMOJI);
});

client.on('messageReactionAdd', handleReactionAdd);
client.on('messageReactionRemove', handleReactionRemove);

client.login(config.TOKEN);
console.log('Bot Startup!');

const axios = require('axios');
const config = require('../settings/config');

module.exports = (client) => {
    client.on('messageCreate', async (message) => {
        if (message.content.startsWith('!weather ')) {
            const location = message.content.split(' ').slice(1).join(' '); // ดึงชื่อสถานที่ทั้งหมด
            const apiKey = config.WEATHER_API_KEY; // รับ API Key จาก config

            // เพิ่มการระบุประเทศในคำค้นหา
            const query = `${location},TH`; // เปลี่ยน 'TH' เป็นรหัสประเทศที่ต้องการ

            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=no`);
                const weatherData = response.data;

                const weatherDescription = weatherData.current.condition.text;
                const temperature = weatherData.current.temp_c;
                const humidity = weatherData.current.humidity;
                const windSpeed = weatherData.current.wind_kph;

                const weatherMessage = `🌤️ สภาพอากาศใน ${location}:\n` +
                    `📅 รายละเอียด: ${weatherDescription}\n` +
                    `🌡️ อุณหภูมิ: ${temperature}°C\n` +
                    `💧 ความชื้น: ${humidity}%\n` +
                    `💨 ความเร็วลม: ${windSpeed} kph`;

                message.channel.send(weatherMessage);
            } catch (error) {
                message.channel.send(`ไม่สามารถค้นหาข้อมูลสภาพอากาศสำหรับ "${location}". กรุณาลองใหม่.`);
            }
        }
    });
};

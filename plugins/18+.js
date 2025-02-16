const config = require('../config');
const {cmd , commands} = require('../command');
const { fetchJson } = require('../lib/functions')
const axios = require('axios');
const cheerio = require('cheerio');

let session = {};

async function xnxxs(query) {
    return new Promise((resolve, reject) => {
        const baseurl = 'https://www.xnxx.com';
        axios.get(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`)
            .then((res) => {
                const $ = cheerio.load(res.data);
                const title = [];
                const url = [];
                const desc = [];
                const results = [];
                
                $('div.mozaique').each(function(a, b) {
                    $(b).find('div.thumb').each(function(c, d) {
                        url.push(baseurl + $(d).find('a').attr('href').replace('/THUMBNUM/', '/'));
                    });
                });

                $('div.mozaique').each(function(a, b) {
                    $(b).find('div.thumb-under').each(function(c, d) {
                        desc.push($(d).find('p.metadata').text());
                        $(d).find('a').each(function(e, f) {
                            title.push($(f).attr('title'));
                        });
                    });
                });

                // Prepare results
                for (let i = 0; i < title.length; i++) {
                    results.push({ title: title[i], info: desc[i], link: url[i] });
                }
                resolve({ status: true, result: results });
            }).catch((err) => {
                console.error(err);
                reject({ status: false, result: err });
            });
    });
}

cmd({
    pattern: "xnxx",
    alias: ["xnxxdl"],
    use: '.xnxx <query>',
    react: "🔞",
    desc: "Search and DOWNLOAD VIDEOS from xnxx.",
    category: "download",
    filename: __filename
}, async (messageHandler, context, quotedMessage, { from, q, reply }) => {
    try {
        if (!q) return reply('⭕ *Please Provide Search Terms.*');

        let res = await xnxxs(q);
        const data = res.result;
       
        const limitedData = data.slice(0, 10);
        if (limitedData.length < 1) 
            
return await messageHandler.sendMessage(from, {
            text: "⭕ *I Couldn't Find Anything 🙄*" 
        }, { quoted: quotedMessage });

        let message = `*🔞 QUEEN NETHU XNXX DOWNLOADER 🔞*\n\n`;
        let options = ""; 

        limitedData.forEach((v, index) => {
            options += `${index + 1}. *${v.title}*\n\n`;
        });

        message += options;
        message += `\n\n> ⚜️ _𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐝_ *- :* *_SL NETHU MAX_ ᵀᴹ*`;

        const sentMessage = await messageHandler.sendMessage(from, {
            image: { url: `https://i.ibb.co/ntvzPr8/s-Wuxk4b-KHr.jpg` },
            caption: message,          
        }, { quoted: quotedMessage });

        session[from] = {
            searchResults: limitedData,
            messageId: sentMessage.key.id, 
        };

        const handleUserReply = async (update) => {
            const userMessage = update.messages[0];

            if (!userMessage.message.extendedTextMessage ||
                userMessage.message.extendedTextMessage.contextInfo.stanzaId !== sentMessage.key.id) {
                return;
            }

            const userReply = userMessage.message.extendedTextMessage.text.trim();
            const videoIndexes = userReply.split(',').map(x => parseInt(x.trim()) - 1); // Convert reply to an array of indexes

            for (let index of videoIndexes) {
                if (isNaN(index) || index < 0 || index >= limitedData.length) {
                    return reply("⭕ *Please Enter Valid Numbers From The List.*");
                }
            }

            for (let index of videoIndexes) {
                const selectedVideo = limitedData[index];

                try {
                    let downloadRes = await fetchJson(`https://raganork-network.vercel.app/api/xvideos/download?url=${selectedVideo.link}`);
                    let videoUrl = downloadRes.url;

                    if (!videoUrl) {
                        return reply(`⛔ *Failed To Fetch Video* For "${selectedVideo.title}".`);
                    }

                    await messageHandler.sendMessage(from, {
                        video: { url: videoUrl },
                        caption: `${selectedVideo.title}\n\n> ⚜️ _𝐃𝐞𝐯𝐞𝐥𝐨𝐩𝐞𝐝_ *- :* *_SL NETHU MAX_ ᵀᴹ*`,
               }, { quoted: quotedMessage });         

                } catch (err) {
                    console.error(err);
                    return reply(`⛔ *An Error Occurred While Downloading "${selectedVideo.title}".*`);
                }
            }

            delete session[from];
        };

        messageHandler.ev.on("messages.upsert", handleUserReply);

    } catch (error) {
        console.error(error);
        await messageHandler.sendMessage(from, { text: '⛔ *Error Occurred During The Process!*' }, { quoted: quotedMessage });
    }
});

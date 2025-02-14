const config = require('../config')
const os = require('os')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { lyrics, lyricsv2 } = require('@bochilteam/scraper');

var tmsg =''
if(config.LANG === 'SI') tmsg = 'එය Bot link ලබා දෙයි.'
else tmsg = "It gives bot link."

//01.ALIVE MSG
cmd({
    pattern: "alive",
    react: "👋",
    alias: ["online","test","bot"],
    desc: "Check bot online or no.",
    category: "main",
    use: '.alive',
    filename: __filename
},
async(conn, mek, m,{from, prefix, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const moment = require("moment-timezone");
const date = moment().tz("Asia/Colombo").format("YYYY-MM-DD");
const time = moment().tz("Asia/Colombo").format("HH:mm:ss");
const hour = moment().tz("Asia/Colombo").format("HH");
const minute = moment().tz("Asia/Colombo").format("mm");

const greeting = hour >= 0 && hour < 12 ? '⛅ GOOG MORNING' :
                 hour >= 12 && hour < 15 ? '🌤️ GOOD AFTERNOON' :
                 hour >= 15 && hour < 18 ? '🌥️ GOOD EVENING' :
                 hour >= 18 && hour <= 23 ? '🌝 GOOD NIGHT' :
                 '';
  
if(os.hostname().length == 12 ) hostname = 'replit'
else if(os.hostname().length == 36) hostname = 'heroku'
else if(os.hostname().length == 8) hostname = 'koyeb'
else hostname = os.hostname()

let monspace ='```'
let monspacenew ='`'
if(config.ALIVE === "default") {
const buttons = [
  {buttonId: prefix + 'menu' , buttonText: {displayText: 'COMMANDS MENU'}, type: 1},
  {buttonId: prefix + 'ping' , buttonText: {displayText: 'BOT\'S SPEED'}, type: 1}
]
const buttonMessage = {
    image: {url: "https://i.ibb.co/DKjtz24/6724.jpg" },
    caption: `${greeting} *${pushname}*

> *ᴅᴀᴛᴇ:* ${date}  
> *ᴛɪᴍᴇ:* ${time} 
      
*┃🪢Version:* ${require("../package.json").version}
*┃💾Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*┃⏳Runtime:* ${runtime(process.uptime())}
*┃📍Platform:* ${os.hostname()}

*🌻 Have A Nice Day 🌻*`,
    
    footer: "> *_Created by_* 👨🏼‍💻 :- *_Sl Nethu Max Yt_*",
    buttons: buttons,
    headerType: 4
}
return await conn.buttonMessage2(from, buttonMessage)}
else {
  const buttons = [
    {buttonId: prefix + 'menu' , buttonText: {displayText: 'COMMANDS MENU'}, type: 1},
    {buttonId: prefix + 'ping' , buttonText: {displayText: 'BOT\'S SPEED'}, type: 1}
  ]
  const buttonMessage = {
      image: {url: "https://i.ibb.co/DKjtz24/6724.jpg" },
      caption: config.ALIVE,
      footer: "> *_Created by_* 👨🏼‍💻 :- *_Sl Nethu Max Yt_*",
      buttons: buttons,
      headerType: 4
  }

  return await conn.buttonMessage2(from, buttonMessage, mek)}
} catch (e) {
reply('*Error !!*')
l(e)
}
});

//02.PING MSG
cmd({
    pattern: "ping",
    react: "✅",
    alias: ["speed"],
    desc: "Check bot\'s ping",
    category: "main",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
    const qMessage = { key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: "status@broadcast" },
    message: {
        contactMessage: {
            vcard: 
                'BEGIN:VCARD\n' +
                'VERSION:3.0\n' +
                'FN:QUEEN NETHU\n' +
                'ORG:QUEEN NETHU\n' +
                'TEL;type=CELL;type=VOICE;waid=94704227534:+94 70 422 7534\n' +
                'EMAIL:nethmikakaushalya10@gmail.com\n' +
                'END:VCARD'
                    },
             contacts: { displayName: "QUEEN NETHU", contacts: [{ vcard: '' }] }}};
    
var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: '```Pinging To index.js!!!```'  }, { quoted: qMessage });
var final = new Date().getTime();
return await conn.edite(ping, '*Pong*\n *' + (final - inital) + ' ms* ' )
} catch (e) {
reply('*Error !!*')
l(e)
}
});

//03.MENU MSG


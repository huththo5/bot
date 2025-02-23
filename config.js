const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}


module.exports = {
SESSION_ID: 'VAJIRA-MD=4XUQFJKa#y4Ntn-c3JJyl7lJ1NZS8mk0_ZN5-PQ6RXv0Uf1GhDL4',
GITHUB_AUTH_TOKEN: 'FKCftYEgo3ZhDMN5dz09fdHthrdFvx05CV0P', //"ghp_ " මෙම කොටස ඉවත් කර token එක දාන්න.
GITHUB_USER_NAME: 'deploy585',
AUTO_STATUS_READ: process.env.AUTO_STATUS_READ || "true",
};

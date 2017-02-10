'use strict';

const fs = require('fs');
const Clapp = require('./modules/clapp-discord');
const cfg = require('../config.js');
const pkg = require('../package.json');
const Discord = require('discord.js');
const bot = new Discord.Client();

var app = new Clapp.App({
  name: cfg.name,
  desc: pkg.description,
  prefix: cfg.prefix,
  version: pkg.version,
  onReply: (message, context) => {
    // Fired when input is needed to be shown to the user, this is where the commands 'return' to.
    console.log(message);
    context.message.reply('\n' + message).then(botResponse => {
      if (cfg.deleteAfterReply.enabled) {
        context.message.delete(cfg.deleteAfterReply.time)
          .then(message => console.log(`Deleted message from ${message.author}`))
          .catch(console.log);
        botResponse.delete(cfg.deleteAfterReply.time)
          .then(message => console.log(`Deleted message from ${message.author}`))
          .catch(console.log);
      }
    });
  }
});

// Load every command in the commands folder
fs.readdirSync('./lib/commands/').forEach(file => {
  app.addCommand(require("./commands/" + file));
});

// Fired everytime someone sends a message to chat.
bot.on('message', message => {


  if (app.isCliSentence(message.content)) {
    app.parseInput(message.content, {
      message: message,
      author: message.author,
      channel: message.channel
      // Keep adding properties to the context as you need them
    });
  }
});

bot.on('message', message => {
  // if the message is "ping",
  if (message.content === 'Hi Wintermute') {
    // send "pong" to the same channel.
    message.channel.sendMessage('Hello, ' + message.author + '.');
  }
});

bot.login(cfg.token).then(() => {
  console.log('|_Wintermute_Online_|');
});

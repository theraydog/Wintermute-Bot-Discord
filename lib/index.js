'use strict';

const fs = require('fs');
const Clapp = require('./modules/clapp-discord');
const cfg = require('../config.js');
const pkg = require('../package.json');
const Discord = require('discord.js');
const bot = new Discord.Client();

var hiWords = ['hi ', 'hello ', 'hey ', 'howdy ', 'heya ', 'hiya ', 'yo ', 'hi,', 'hello,', 'hey,', 'howdy,', 'heya,', 'hiya,', 'yo,'];
var tyWords = ['thanks,', 'thank,', 'thanks ', 'thank '];


var S = require('string');



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
  var msg = message.content.toString();
  console.log("log |   " + message.createdAt + '   |   ' + message.author.username + "   :   " + msg);

  //Is someone saying Hello ?
  for(var i=0; i < hiWords.length; i++){
    if (S(msg.toLowerCase()).contains(hiWords[i]) && S(msg.toLowerCase()).contains('wintermute')) {
      message.channel.sendMessage('Hello, ' + message.author + '.');
      break;
    }
  }

  //Is someone saying thank you?
  for(var x=0; x < tyWords.length; x++){
    if (S(msg.toLowerCase()).contains(tyWords[x]) && S(msg.toLowerCase()).contains('wintermute')) {
      message.channel.sendMessage("You're welcome, " + message.author + '!');
      break;
    }
  }



  // Is it a console-style command?
  if (app.isCliSentence(message.content)) {
    app.parseInput(message.content, {
      message: message,
      author: message.author,
      channel: message.channel
      // Keep adding properties to the context as you need them
    });
  }
});

bot.login(cfg.token).then(() => {
  console.log("It's all wavy gravy over here baby!");
});

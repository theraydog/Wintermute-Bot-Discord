var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
  name: "coin",
  desc: "Flips a coin.",
  fn: (argv, context) => {
    // This output will be redirected to your app's onReply function
    
    const number = Math.floor(Math.random() * 2) + 1;
    if (number === 1) {


      context.channel.sendFile('./images/heads.jpg');
      return;
      //return 'heads';
    } else {
      //return 'tails';
      context.channel.sendFile('./images/tails.jpg');
      return;
    }

  }
});

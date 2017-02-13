// TODO : Turn this into a command that scrapes the timewave.

var Clapp = require('../modules/clapp-discord');

module.exports = new Clapp.Command({
  name: "timewave",
  desc: "does timewave things",
  fn: (argv, context) => {
    // This output will be redirected to your app's onReply function
    var botResponse = '';
    var timewaveURL = 'http://www.fractal-timewave.com/tw_graph/tw_graph.php?lang=0&kelley=1&watkins=';

    //Append watkins flag
    if (argv.flags.WatkinsObjection) {
      timewaveURL += '1';
    } else {
      timewaveURL += '0';
    }

    //Append the year
    timewaveURL += '&year=' + argv.args.Year;

    //Append the month
    timewaveURL += '&mm=' + argv.args.Month;

    //Append the end date
    timewaveURL += '&zero_date=23';

    botResponse = 'Timewave was executed!' + ' Retrieving wave for: ' + argv.args.Year + ' Month of:' + argv.args.Month +
      (argv.flags.WatkinsObjection ? ' Displaying with the Watkins Objection (line in blue).' : ' Displaying without the Watkins Objection.') + ' View this wave: ' + timewaveURL;

    return botResponse;
  },
  args: [
    {
      name: 'Year',
      desc: 'What year of the timewave to display.',
      type: 'string',
      required: false,
      default: '2017'
    },
    {
      name: 'Month',
      desc: 'What month of the timewave to display. 0 will display the entire year',
      type: 'string',
      required: false,
      default: '0'
    }
  ],
  flags: [
    {
      name: 'WatkinsObjection',
      desc: 'Displays the Watkins objection variant of the timeave on the graph in blue.',
      alias: 'w',
      type: 'boolean',
      default: false
    }
  ]
});

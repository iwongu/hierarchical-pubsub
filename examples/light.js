var pubsub = require('../lib/pubsub');

// data = {event: string, value: {status: boolean}}

pubsub('light/living_room/1').
  on('value', function(data) {
    console.log(data.event + ': ' + data.value.status);
  });

pubsub('light/living_room/2').
  on('value', function(data) {
    console.log(data.event + ': ' + data.value.status);
  });

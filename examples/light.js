var pubsub = require('../lib/pubsub');

// data = {event: string, value: {status: boolean}}

pubsub.get('light/living_room/1').
  on('value', function(data) {
    console.log(data.event + ': ' + data.value.status);
  });

pubsub.get('light/living_room/2').
  on('value', function(data) {
    console.log(data.event + ': ' + data.value.status);
  });

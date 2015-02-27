var pubsub = require('../lib/pubsub');

// data = {event: string, value: {message: string}}

pubsub.get('display/living_room/1').
  on('value', function(data) {
    console.log(data.event + ': ' + data.value.message);
  });

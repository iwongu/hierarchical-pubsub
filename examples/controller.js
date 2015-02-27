var pubsub = require('../lib/pubsub');

var light_status;
var timer_id;
var timer_ms = 5 * 1000; // 5s

var stopTimer = function() {
  if (timer_id) {
    clearTimeout(timer_id);
    timer_id = null;
  }
};

var restartTimer = function(callback) {
  stopTimer();
  timer_id = setTimeout(function() {
    callback();
    timer_id = null;
  }, timer_ms);
};

var living_room_display_1 = pubsub('display/living_room/1');

var living_room_light_all = pubsub('light/living_room').
    on('value', function(data) {
      light_status = data.value.status;
      living_room_display_1.setValue({message: 'light:' + data.value.status});
    });

var living_room_motion_all = pubsub('motion/living_room').
    on('value', function(data) {
      living_room_display_1.setValue({message: 'motion:' + data.value.status});
      if (data.value.status) {
        stopTimer();
        if (!light_status) {
          pubsub('light/living_room').walkDown(function(node) {
            node.setValue({status: true});
          });
        }
      } else {
        if (light_status) {
          restartTimer(function() {
            pubsub('light/living_room').walkDown(function(node) {
              node.setValue({status: false});
            });
          });
        }
      }
    });

'use strict';

var Firebase = require('firebase');
var extend = require('extend');
var uuid = require('node-uuid');

var pubsub = require('./pubsub');

var coordinator_id = uuid.v1();

function Coordinator(path) {
  this.path = path;
  this.fb = new Firebase('https://raspberry-pi.firebaseio.com/' + path);
};

Coordinator.prototype.on = function(event, listener) {
  pubsub(this.path).on(event, function(data) {
    listener(data);
    if (event == 'value') {
      this.fb.set(_extendValue(data.value));
    }
  });
  this.fb.on('value', function(value) {
    if (!value.meta || value.meta.coordinator_id != coordinator_id) {
      pubsub(this.path).setValue(value);
    }
  });
  return this;
};

Coordinator.prototype.setValue = function(value) {
  pubsub(this.path).setValue(value);
  this.fb.set(_extendValue(value));
};

Coordinator.prototype._extendValue = function(value) {
  return extend(true, {}, value, {meta: {coordinator_id: coordinator_id}});
};

Coordinator.prototype.visitAncestors = function(callback) {
  pubsub(this.path).visitAncestors(callback);
};

Coordinator.prototype.visitDescendants = function(callback) {
  pubsub(this.path).visitDescendants(callback);
};

module.exports = function(path) {
  return new Coordinator(path);
};

var pubsub = require('..');

pubsub('foo/bar').
  on('value', function(data) {
    console.log(data.event); // 'foo/bar/zoo'
    console.log(data.value); // 'goo'
  });

pubsub('other/node/1/2/3').
  on('value', function(data) {
    console.log(data.event); // 'other/node/1/2/3'
    console.log(data.value); // 'goo'
  });

pubsub('foo/bar').
  on('value', function(data) {
    pubsub('other/node').visitDescendants(function(node) {
      node.setValue('goo');
    });
  });

pubsub('foo/bar/zoo').setValue('goo');

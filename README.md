# node-pubsub

Simple pub/sub with tree structure in node.js

```js
var pubsub = require('node-pubsub');

pubsub('foo/bar').
  on('value', function(data) {
    console.log(data.event); // 'foo/bar/zoo'
    console.log(data.value); // 'goo'
  });

pubsub('foo/bar/zoo').setValue('goo');
```

```js
pubsub('other/node/1/2/3').
  on('value', function(data) {
  });
  
pubsub('foo/bar').
  on('value', function(data) {
    pubsub('other/node').walkDown(function(node) {
      node.setValue('goo');
    });
  });
```

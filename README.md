# node-pubsub

Simple pub/sub with tree structure in node.js

```js
var pubsub = require('node-pubsub');

pubsub.get('foo/bar').
  on('value', function(data) {
    console.log(data.event); // 'foo/bar/zoo'
    console.log(data.value); // 'goo'
  });

pubsub.get('foo/bar/zoo').setValue('goo');
```

```js
pubsub.get('other/node/1/2/3').
  on('value', function(data) {
  });
  
pubsub.get('foo/bar').
  on('value', function(data) {
    pubsub.get('other/node').walkDown(function(node) {
      node.setValue('goo');
    });
  });
```

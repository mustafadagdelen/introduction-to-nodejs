var express = require('express'),
  config = require('./config/config');



var app = express();
var kafkaConsumer = require('./helper/kafkaConsumer')
kafkaConsumer.consume();

require('./config/express')(app, config);

app.listen(config.port, function () {
  console.log('Express server listening on port ' + config.port);
});


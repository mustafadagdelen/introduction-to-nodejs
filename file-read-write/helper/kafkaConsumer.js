'use strict';

var kafka = require('no-kafka');
var config = require('../config/config.js');

module.exports = {
    consume: function () {
        var consumer = new kafka.SimpleConsumer({
            connectionString : config.kafkaServerUrl
        });

        var dataHandler = function (messageSet, topic, partition) {
            messageSet.forEach(function (m) {
                console.log("Consumer :" + m.message.value.toString('utf8'));
            });
        };

        return consumer.init().then(function () {
            // Subscribe partitons 0 and 1 in a topic: 
            return consumer.subscribe(config.topicName,  dataHandler);
        });
    }
}
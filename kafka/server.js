var connection = new require('./kafka/connection');

var Passport = require('./services/passport');
var Signup = require('./services/signup');
var Login = require('./services/login');
var CustomerProfile = require('./services/customerProfile');
var RestaurantProfile = require('./services/restaurantProfile');
var ImageUpload = require('./services/uploads');
var Restaurants = require('./services/restaurants');
var Reviews = require('./services/reviews');
var Events = require('./services/events');
var Dishes = require('./services/dishes');
var Orders = require('./services/orders');
var FollowConnection = require('./services/followConnection');
var Messages = require('./services/messages');

const { mongoDB } = require('./config/configuration');
const mongoose = require('mongoose');
// const fs = require('fs');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 500,
    bufferMaxEntries: 0
  };

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(`MongoDB Connection Failed`+mongoDB);
    } else {
        console.log(`MongoDB Connected`);
    }
});

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Kafka Server is running ');
    consumer.on('message', function (message) {
        console.log('Message received for ' + topic_name);
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log('DATA', data);
            });
            return;
        });

    });
}

handleTopicRequest("authentication", Passport);
handleTopicRequest("signup", Signup);
handleTopicRequest("login", Login);
handleTopicRequest("custProfile", CustomerProfile);
handleTopicRequest("restProfile", RestaurantProfile);
handleTopicRequest("imageUpload", ImageUpload);
handleTopicRequest("restaurants", Restaurants);
handleTopicRequest("reviews", Reviews);
handleTopicRequest("events", Events);
handleTopicRequest("orders", Orders);
handleTopicRequest("dishes", Dishes);
handleTopicRequest("messages", Messages);
handleTopicRequest("follow", FollowConnection);

/*
q
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic authentication
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic signup
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic login
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic custProfile
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic restProfile
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topic
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic imageUpload
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic restaurants
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic reviews
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic events
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic orders
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic dishes
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic messages
kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic follow

kafka-topics.bat --zookeeper localhost:2181 --delete --topic authentication
kafka-topics.bat --zookeeper localhost:2181 --delete --topic signup
kafka-topics.bat --zookeeper localhost:2181 --delete --topic login
kafka-topics.bat --zookeeper localhost:2181 --delete --topic custProfile
kafka-topics.bat --zookeeper localhost:2181 --delete --topic restProfile
kafka-topics.bat --zookeeper localhost:2181 --delete --topic response_topic
kafka-topics.bat --zookeeper localhost:2181 --delete --topic imageUpload
kafka-topics.bat --zookeeper localhost:2181 --delete --topic restaurants
kafka-topics.bat --zookeeper localhost:2181 --delete --topic reviews
kafka-topics.bat --zookeeper localhost:2181 --delete --topic events
kafka-topics.bat --zookeeper localhost:2181 --delete --topic orders
kafka-topics.bat --zookeeper localhost:2181 --delete --topic dishes
kafka-topics.bat --zookeeper localhost:2181 --delete --topic messages
kafka-topics.bat --zookeeper localhost:2181 --delete --topic follow

*/

const kafka = require('kafka-node');

function ConnectionProvider() {
  this.getConsumer = function (topicName) {
    this.client = new kafka.Client('localhost:2181');
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [{ topic: topicName, partition: 0 }]);
    this.client.on('ready', () => {
      console.log('Client ready');
    });
    return this.kafkaConsumerConnection;
  };

  // Code will be executed when we start Producer
  this.getProducer = function () {
    if (!this.kafkaProducerConnection) {
      this.client = new kafka.Client('localhost:2181');
      const { HighLevelProducer } = kafka;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      console.log('Producer ready');
    }
    return this.kafkaProducerConnection;
  };
}

exports = module.exports = new ConnectionProvider();

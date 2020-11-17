const rpc = new (require('./kafkarpc'))();

// make request to kafkaq
function make_request(queueName, msgPayload, callback) {
  console.log('Inside client.js -> make_request');
  console.log('Kafka Message Payload : ', msgPayload);
  rpc.makeRequest(queueName, msgPayload, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Kafka Response : ', response);
      callback(null, response);
    }
  });
}

exports.make_request = make_request;

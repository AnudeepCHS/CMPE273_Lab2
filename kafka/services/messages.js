// post : for that restaurant, for that user, post a Message
// post : for that customer, for that restaurant, post a Message

// cust get : get all messages from all restaurants for that customer
// rest get : get all messages from that customer for that restaurant

const Message = require('../models/message');

function handle_request(msg, callback) {
  var res = {};
  console.log('Calling in Restaurant.js for path : ', msg.path);

  if (msg.path === 'restaurant_message_put') {
    console.log('Entered restaurant_message_put');
    Message.findOne({ 
        restaurant_id: msg.restaurant_id, 
        customer_id: msg.customer_id, 
      }, (error, message) => {
        if (error) {
          console.error('Error creating message :', error);
          res.status = 500;
          res.message = 'RESTAURANT_MESSAGE_PUT_ERROR';
          callback(null, res);
        } else if (message) {
          console.log("MESSAGE from DB: ", message);
          message.messages.push({
            sender_id: msg.restaurant_id,
            receiver_id: msg.customer_id,
            message_content: msg.message_content,
            message_time: new Date(Date.now()).toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
          })
          message.save((err, saveMessage) => {
            if(err) {
              console.log(err);
              res.status = 500;
              res.message = 'RESTAURANT_MESSAGE_PUT_ERROR';
              callback(null, res);
            } else {
              console.log(err);
              res.status = 200;
              res.message = 'RESTAURANT_MESSAGE_UPDATE_SUCCESS';
              callback(null, res);
            }
          });
        } else {
          const newMessage = new Message({
            restaurant_id: msg.restaurant_id,
            customer_id: msg.customer_id,
            messages: [{
              sender_id: msg.restaurant_id,
              receiver_id: msg.customer_id,
              message_content: msg.message_content,
              message_time: new Date(Date.now()).toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
            }]
          });
          console.log('New Message Object', newMessage);
          newMessage.save((error, message) => {
            if (error) {
              console.error('Error creating message :', error);
              res.status = 500;
              res.message = 'RESTAURANT_MESSAGE_PUT_ERROR';
              callback(null, res);
            } else {
              console.log('Response success : ', message);
              res.status = 200;
              res.message = 'RESTAURANT_MESSAGE_CREATE_SUCCESS';
              callback(null, res);
            }
          });
        }
    });

  } else if (msg.path === 'restaurant_messages_get') {
    console.log('Entered restaurant_messages_get');
    var query = Message.findOne({ restaurant_id: msg.restaurant_id, customer_id: msg.customer_id });
    query.populate('customer_id', 'name');
  
    query.exec((error, message) => {
        if (error) {
          console.error('Error fetching message :', error);
          res.status = 500;
          res.message = 'RESTAURANT_MESSAGE_GET_ERROR';
          callback(null, res);
        } else if (message) {
          res.status = 200;
          res.message = JSON.stringify(message);
          callback(null, res);
        } else {
          res.status = 200;
          res.message = 'NO_MESSAGES';
          callback(null, res);
        }
    });


  } else if (msg.path === 'customer_messages_get') {
    console.log('Entered customer_messages_get');
    var query = Message.find({ customer_id: msg.customer_id });
    query.populate('restaurant_id', 'name');

    query.exec((error, messages) => {
      if (error) {
        console.error('Error fetching messages :', error);
        res.status = 500;
        res.message = 'CUSTOMER_MESSAGE_GET_ERROR';
        callback(null, res);
      } else if (messages) {
        res.status = 200;
        res.message = JSON.stringify(messages);
        callback(null, res);
      } else {
        res.status = 404;
        res.message = 'CUSTOMER_MESSAGE_GET_NOT_FOUND';
        callback(null, res);
      }
    });

  } else if (msg.path === 'customer_message_put') {
    console.log('Entered customer_message_put. Message', msg);
    Message.findOne({ 
        restaurant_id: msg.restaurant_id, 
        customer_id: msg.customer_id, 
      }, (error, message) => {
        if (error) {
          console.error('Error creating message :', error);
          res.status = 500;
          res.message = 'CUSTOMER_MESSAGE_PUT_ERROR';
          callback(null, res);
        } else if (message) {
          console.log("MESSAGE from DB: ", message);
          message.messages.push({
            sender_id: msg.customer_id,
            receiver_id: msg.restaurant_id,
            message_content: msg.message_content,
            message_time: new Date(Date.now()).toLocaleDateString("en-US", {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }),
          })
          message.save((err, saveMessage) => {
            if(err) {
              console.log(err);
              res.status = 500;
              res.message = 'CUSTOMER_MESSAGE_PUT_ERROR';
              callback(null, res);
            } else {
              console.log(err);
              res.status = 200;
              res.message = 'CUSTOMER_MESSAGE_UPDATE_SUCCESS';
              callback(null, res);
            }
          });
        } else {
          console.error('No message found');
          res.status = 404;
          res.message = 'CUSTOMER_MESSAGE_PUT_NOT_FOUND';
          callback(null, res);
        }
    });

  }
};

exports.handle_request = handle_request;
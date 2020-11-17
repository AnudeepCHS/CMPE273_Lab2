const Events = require('../models/event');
const Customer = require('../models/cust_profile');

function handle_request(msg, callback) {
    var res = {};
    console.log('Calling in Events.js for path : ', msg.path);
    if (msg.path === 'event_post') {
        console.log('Entered event_post');

        const newEvent = new Events({
        restaurant_id: msg.restaurant_id,
        name: msg.name,
        description: msg.description,
        time: msg.time,
        date: msg.date,
        location: msg.location,
        hashtags: msg.hashtags,
        });

        console.log('New Event Object', newEvent);

        newEvent.save((error, response) => {
            if (error) {
                console.error('Error creating event');
                res.status = 500;
                res.message = 'EVENT_CREATE_FAILED';
                callback(null, res);
            } else if (response) {
                console.log('Response success : ', response);
                res.status = 200;
                res.message = 'EVENT_CREATE_SUCCESS';
                callback(null, res);
            }
        });
    } else if (msg.path === 'restaurant_event_get') {
        console.log('Entered restaurant_event_get');
        var query = Events.find({ 'restaurant_id': msg.restaurant_id });
        query.populate("participants");
        query.sort( { date : 1, time: 1 } )
        query.exec((err, events) => {
            if (err) {
                console.log(err);
                res.status = 500;
                res.message = 'SYSTEM_ERROR';
            } else {
                res.status = 200;
                if (events.length > 0) {
                    events.map(event => { event.participants
                        .map( participant => {
                            console.log(participant.password);
                            participant.password = undefined;
                            participant.following = undefined;
                            return participant; 
                        });
                    });
                    res.message = JSON.stringify(events);
                } else {
                    res.message = 'NO_EVENTS';
                }
            }
            callback(null, res);
        });
    } else if (msg.path === 'customer_event_get') {
        console.log('Entered customer_event_get');
        var search = msg.search;
        if (!search) {
            search = "";
        }
        var searchresults = [];
        var query = Events.find();
        if(msg.order === 'desc')
            query.sort( { date : -1, time: -1 } )
        else if(msg.order === 'asc')
            query.sort( { date : 1, time: 1 } )
        query.exec((err, events) => {
            if (err) {
                res.status = 500;
                res.message = 'SYSTEM_ERROR';
            } else {
                if (msg.search === "") {
                    console.log('Fetching all restaurants');
                    searchresults = events;
                } else {
                    console.log('Filter upon the restaurants : ', events);
                    events.map(event => {
                        console.log(event.name);
                        if (event.name.toLowerCase().includes(search.toLowerCase()) && !searchresults.includes(event))
                            searchresults.push(event);
                        });
                }
                res.status = 200;
                if (searchresults.length > 0) {
                    let restaurantEvents = [];
                    searchresults.map( event => {
                        const eventDetails = {
                            event_id: event._id,
                            name: event.name,
                            description: event.description,
                            time: event.time,
                            date: event.date,
                            location: event.location,
                            hashtags: event.hashtags,
                        };
                        restaurantEvents.push(eventDetails);
                    });
                    res.message = JSON.stringify(restaurantEvents);
                    console.log('restaurantEvents : ', restaurantEvents);
                }
                else {
                    res.message = 'NO_EVENTS';
                }
            }
            callback(null, res);
        })
    } else if (msg.path === 'customer_event_get_reg') {
        console.log('Entered customer_event_get_reg');
        Events.find((err, events) => {
            if (err) {
                res.status = 500;
                res.message = 'SYSTEM_ERROR';
            } else if(events){
                res.status = 200;
                var registeredEvents = [];
                if (events.length > 0) {
                    events.map(event => {
                        const eventDetails = {
                            event_id: event._id,
                            name: event.name,
                            description: event.description,
                            time: event.time,
                            date: event.date,
                            location: event.location,
                            hashtags: event.hashtags,
                        };
                        console.log('event.participants : ', event.participants);
                        event.participants.map(participant_id => {
                            if(participant_id.equals(msg.customer_id))
                                registeredEvents.push(eventDetails);
                        });
                    });
                    res.message = JSON.stringify(registeredEvents);
                    console.log('Customer Registered Events : ', registeredEvents);
                }
                if ( registeredEvents.length === 0 ){
                    res.message = 'NO_EVENTS_REGISTERED';
                }
            }
            callback(null, res);
        }).sort( { date : 1, time: 1 } );
    } else if (msg.path === 'customer_event_reg') {
        console.log('Entered customer_event_reg');
        Events.findById(msg.event_id, (error, event) => {
            console.log('Entered customer_event_reg for event_id : ', msg.event_id);
            if (error) {
                res.status = 500;
                res.message = 'SYSTEM_ERROR';
                callback(null, res);
            }
            if (event) {
                console.log('Found the event : ',event);
            
                var already_registered_flag = false;
                console.log('length : ', event.participants.length);
                if(event.participants.length>0) {
                    console.log('Found the event participants: ',event.participants);
                    event.participants.map(participant_id => {
                        console.log('participant_id : ', participant_id);
                        console.log('customer_id : ', msg.customer_id);
                        console.log('compare id : ', participant_id.equals(msg.customer_id));
                        if (participant_id.equals(msg.customer_id)) {
                            res.status = 200;
                            res.message = 'ALREADY_REGISTERED';
                            console.log('ALREADY_REGISTERED');
                            already_registered_flag = true;
                            callback(null, res);
                        }
                    });
                } 
                if(!already_registered_flag){
                    console.log('Not ALREADY_REGISTERED');
                    event.participants.push(msg.customer_id);
                    event.save((err, registered) => {
                        console.log('error : ', err, 'results : ', registered);
                        if (err) {
                            res.status = 500;
                            res.message = 'REGISTER_EVENT_ERROR';
                            console.log('REGISTER_EVENT_ERROR for event : ', err)
                        } else if (registered) {
                            res.status = 200;
                            res.message = 'REGISTERED_EVENT';
                            console.log('REGISTERED_EVENT for event')
                        } else {
                            console.log('Nothing happened during this call.')
                        }
                        callback(null, res);
                    });
                }
            } else {
                res.status = 404;
                res.message = 'EVENT_INVALID';
                callback(null, res);
            }
        });
    }
  };
  
  async function getCustomers(participants) {
    return new Promise((resolve, reject) => {
        Customer.find({ '_id' : { '$in': participants}}, (err, customers) => {
        if (err) reject(err)
        resolve(customers);
    });
    });
  }
  exports.handle_request = handle_request;
const app = require('./app');

const signup = require('./routes/signup');
const login = require('./routes/login');
const restProfile = require('./routes/restaurant/restProfile');
const custProfile = require('./routes/customer/custProfile');
const imageGet = require('./routes/images');
const imageUpload = require('./routes/uploads');
const restaurantSearch = require('./routes/customer/restaurantSearch');
const reviews = require('./routes/reviews');
const events = require('./routes/events');
const dishes = require('./routes/dishes');
const orders = require('./routes/orders');
const followConnection = require('./routes/customer/followConnection');
const messages = require('./routes/messages');

app.use('/signup', signup);
app.use('/login', login);
app.use('/profiles/restaurants', restProfile);
app.use('/profiles/customers', custProfile);
app.use('/images', imageGet);
app.use('/uploads', imageUpload);
app.use('/restaurantSearch', restaurantSearch);
app.use('/reviews', reviews);
app.use('/events', events);
app.use('/dishes', dishes);
app.use('/orders', orders);
app.use('/follow', followConnection);
app.use('/messages', messages);

const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;

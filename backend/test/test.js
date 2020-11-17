/* eslint-disable linebreak-style */
const chai = require('chai');
const { request } = require('chai');
chai.use(require('chai-http'));
const app = require('../index');

const { expect } = chai;

// const agent = require('chai').request.agent(app);

const apiHost = 'http://localhost';
const apiPort = '3001';
const apiUrl = `${apiHost}:${apiPort}`;

it('Get Restaurant Profile', (done) => {
  chai
    .request(apiUrl)
    .get('/profiles/restaurants/5f9c460f7bebd655b9118bf9')
    .send()
    .end((err, res) => {
      expect(res.text).to.equal('Unauthorized');
      done();
    });
});

it('Delete a dish', (done) => {
  chai
    .request(apiUrl)
    .delete('/dishes/restaurants/5f98f45286232a79557013c5/5fa3070fb7f18366ddbe6f1b')
    .send()
    .end((err, res) => {
      expect(res.text).to.equal('Unauthorized');
      done();
    });
});

it('Checking for Put - Update order status', (done) => {
  chai
    .request(apiUrl)
    .put('/orders/5fa64b40628c0e8717b440e9')
    .send({ status: 'Cancelled' })
    .end((err, res) => {
      expect(res.text).to.equal('Unauthorized');
      done();
    });
});

it('Post a review', (done) => {
  chai
    .request(apiUrl)
    .post('/reviews/restaurants')
    .send({
      restaurant_id: '5f98f45286232a79557013c5',
      customer_id: '5f90c232c825228030ae27f5',
      review: 'Excellent',
      rating: 5,
    })
    .end((err, res) => {
      expect(res.text).to.equal('Unauthorized');
      done();
    });
});

it('Send a message to customer', (done) => {
  chai
    .request(apiUrl)
    .put('/messages/restaurants/5f98f45286232a79557013c5')
    .send({
      customer_id: '5f90c232c825228030ae27f5',
      message_content: 'First Message',
    })
    .end((err, res) => {
      expect(res.text).to.equal('Unauthorized');
      done();
    });
});
import React, { Component } from 'react';
import yelpImage from '../../images/yelp1.jpg'
// 'fit-content'
class LandingPage extends Component {
    render() {
        return (
            <div>
                <div>
                <center>
                <img src={yelpImage} style={{ height: 500, width: 1000}} alt='Yelp' />
                <b><h1>Welcome to Yelp</h1></b>
                </center>
                </div>
            </div>
        )
    }
}
//export Login Component
export default LandingPage;
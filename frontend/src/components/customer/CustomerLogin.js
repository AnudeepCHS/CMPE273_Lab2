import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import '../../App.css';
import { customerLogin } from "../../redux/action/loginActions";
const jwt_decode = require('jwt-decode');

//Define a Login Component
class CustomerLoginForm extends Component {
    //call the constructor method
    constructor(props) {
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {}
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    //submit Login handler to send a request to the node backend
    customerLoginSubmit = (e) => {
        console.log("customerLogin -> customerLoginSubmit -> Customer Login Entry point ");

        //prevent page from refresh
        e.preventDefault();
        const data = {
            email_id: this.state.email_id,
            password: this.state.password
        }
        // Updating customer login props -> react component
        this.props.setCustomerLogin(data);
        this.setState({
            loginRequested: 1
        });
    }

    render() {
        let error = null;

        console.log('loginRequestedFlag value : ', this.state.loginRequested);
        // Redirect based on successful login.
        if (this.props.customer && this.props.customer.token) {
            console.log("---------- CUSTOMER LOGGED IN ------------")
            var decoded = jwt_decode(this.props.customer.token.split(' ')[1]);
            console.log("Setting customer_id in Local Storage : ", decoded.customer_id)
            localStorage.setItem("token", this.props.customer.token);
            localStorage.setItem("customer_id", decoded.customer_id);
            return <Redirect to="/customer/home" />
        } else if(this.props.customer === "CUST_INVALID" && this.state.loginRequested){
            error = (
                <div>
                    <p style={{ color: "red" }}> Please Signup to proceed. </p>
                </div>
            );
        } else if(this.props.customer === "CUST_INVALID_CRED" && this.state.loginRequested){
            error = (
                <div>
                    <p style={{ color: "red" }}> Incorrect Password </p>
                </div>
            );
        }

        return (
            <div>
                <div class="container">

                    <form class="login-form" onSubmit={this.customerLoginSubmit}>
                        <div class="main-div">
                            <div class="panel">
                                <h2>Sign in to Yelp</h2>
                            </div>

                            <div class="form-group">
                                <input onChange={this.onChange} type="text" class="form-control" name="email_id" placeholder="Email" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required />
                            </div>
                            <div class="form-group">
                                <input onChange={this.onChange} type="password" class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            {error}
                            <button type="submit" class="btn btn-primary"> Sign in </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customer: state.loginState.customer
});

function mapDispatchToProps(dispatch) {
    return {
        setCustomerLogin: data => dispatch(customerLogin(data))
    };
}

const CustomerLogin = connect(mapStateToProps, mapDispatchToProps)(CustomerLoginForm);

//export Login Component
export default CustomerLogin;

import React, {Component} from 'react';
import '../../App.css';
import { connect } from "react-redux";
import {Redirect} from 'react-router';
import { customerSignup } from "../../redux/action/signupActions";
import { Link } from 'react-router-dom';

//Define a Signup Component
class CustomerSignupForm extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customer) {
            var { customer } = nextProps;

            if (customer === "CUST_SIGNUP_SUCCESS" || customer === "CUST_PRESENT") {
                this.setState({
                    signupFlag: 1
                });
            }
            
            if (customer === "CUST_SIGNUP_ERROR") {
                this.setState({
                    signupFailedFlag: 1
                });
            }
        }
    }

    //name change handler to update state variable with the text entered by the user
    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    customerSignupSubmit = (e) => {
        console.log("customerSignup -> customerSignupSubmit -> Customer Signup Entry point ");
        //prevent page from refresh
        e.preventDefault();
        const data = {
            email_id : this.state.email_id,
            password : this.state.password,
            name : this.state.name
        }
        this.props.setCustomerSignup(data);
    }

    render(){
        let error = null;

        if (this.props.customer === "CUST_SIGNUP_SUCCESS" && this.state.signupFlag) {
            alert("You have registered successfully. Please login to continue.");
            return <Redirect to="c_login" />
        }
        else if(this.props.customer === "CUST_PRESENT" && this.state.signupFlag) {
            console.log('Signup Success');
            error = (
                <div>
                    <p style={{ color: "red" }}>Email id is already registered!</p>
                </div>
            );
        } else if(this.props.customer === "CUST_SIGNUP_ERROR" && this.state.signupFailedFlag) {
            error = (
                <div>
                    <p style={{ color: "red" }}>Signup Error! PLease try again in some time.</p>
                </div>
            );
        }

        return(
            <div>
                <div class="container">
                
                    <form class="login-form" onSubmit= {this.customerSignupSubmit}>
                        <div class="main-div">
                            <div class="panel">
                                <h2>Sign up and be awesome</h2>
                            </div>
                            
                            <div class="form-group">
                                <input onChange = {this.onChange} type="text" class="form-control" name="name" placeholder="Name" pattern="^[A-Za-z0-9 ]+$" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="text" class="form-control" name="email_id" placeholder="Email" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="password" class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            {error}
                            <button type="submit" class="btn btn-primary">Sign up</button>
                            <br/>
                            <Link to= "/r_signup">Business Signup?</Link>
                        </div>
                        
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    customer: state.signupState.customer
});

function mapDispatchToProps(dispatch) {
    return {
        setCustomerSignup: data => dispatch(customerSignup(data))
    };
}

const CustomerSignup = connect(mapStateToProps, mapDispatchToProps)(CustomerSignupForm);

//export Signup Component
export default CustomerSignup;
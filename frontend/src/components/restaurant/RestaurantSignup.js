import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router';
import { connect } from "react-redux";
import { restaurantSignup } from "../../redux/action/signupActions";


//Define a Signup Component
class RestaurantSignupForm extends Component{
    //call the constructor method
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.restaurant) {
            var { restaurant } = nextProps;

            if (restaurant === "REST_SIGNUP_SUCCESS" || restaurant === "REST_PRESENT") {
                this.setState({
                    signupFlag: 1
                });
            }
            
            if (restaurant === "REST_SIGNUP_ERROR") {
                this.setState({
                    signupFailedFlag: 1
                });
            }
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    restaurantSignupSubmit = (e) => {
        console.log("restaurantSignup -> restaurantSignupSubmitAction -> Restaurant Signup Entry point ");
        //prevent page from refresh
        e.preventDefault();

        const data = {
            email_id : this.state.email_id,
            password : this.state.password,
            name : this.state.name,
            location : this.state.location
        }

        // Updating restaurant login props -> react component
        this.props.setRestaurantSignup(data);
    }

    render(){
        let error = null;

        if (this.props.restaurant === "REST_SIGNUP_SUCCESS" && this.state.signupFlag) {
            alert("You have registered successfully. Please login to continue.");
            return <Redirect to="c_login" />
        }
        else if(this.props.restaurant === "REST_PRESENT" && this.state.signupFlag) {
            console.log('Signup Success');
            error = (
                <div>
                    <p style={{ color: "red" }}>Email id is already registered!</p>
                </div>
            );
        } else if(this.props.restaurant === "REST_SIGNUP_ERROR" && this.state.signupFailedFlag) {
            error = (
                <div>
                    <p style={{ color: "red" }}>Signup Error! PLease try again in some time.</p>
                </div>
            );
        }

        return(
            <div>
            <div class="container">
                
            <form class="login-form" onSubmit= {this.restaurantSignupSubmit}>
                    <div class="main-div">
                        <div class="panel">
                            <h2>Sign up and get rolling</h2>
                        </div>
                        
                            <div class="form-group">
                                <input onChange = {this.onChange} type="text" class="form-control" name="name" placeholder="Restaurant Name" pattern="^[A-Za-z0-9 ]+$" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="text" class="form-control" name="email_id" placeholder="Restaurant Email" pattern="^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$'%&*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$" title="Please enter valid email address" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="password" class="form-control" name="password" placeholder="Password" required/>
                            </div>
                            <div class="form-group">
                                <input onChange = {this.onChange} type="text" class="form-control" name="location" placeholder="Restaurant Location" pattern="^[A-Za-z ]+$" required/>
                            </div>
                            {error}
                            <button type="submit" class="btn btn-primary">Sign up</button>
                    </div>
                </form>
            </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    restaurant: state.signupState.restaurant
});

function mapDispatchToProps(dispatch) {
    return {
        setRestaurantSignup: data => dispatch(restaurantSignup(data))
    };
}

const RestaurantSignup = connect(mapStateToProps, mapDispatchToProps)(RestaurantSignupForm);

//export Signup Component
export default RestaurantSignup;
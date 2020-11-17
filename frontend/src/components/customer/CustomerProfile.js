import React, {Component} from 'react';
import PropTypes from "prop-types";
import '../../App.css';
import { Card, Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { updateCustomerProfile, getCustomer } from "../../redux/action/customerActions";
import { uploadCustomerImage } from '../../redux/action/imageUploadActions';
import { Redirect } from 'react-router';
import backend from '../common/serverDetails';

class CustomerProfileForm extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            fileName: "Browse Image To Upload",
        };
        this.onChange = this.onChange.bind(this);
        this.onImageChoose = this.onImageChoose.bind(this);
    }

    componentWillMount() {
        this.props.getCustomer(localStorage.getItem("customer_id"));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customer) {
            this.setState({
                id: nextProps.customer.customer_id,
                name: nextProps.customer.name,
                email_id: nextProps.customer.email_id,
                phone: nextProps.customer.phone,
                dob: nextProps.customer.dob,
                city: nextProps.customer.city,
                state: nextProps.customer.state,
                country: nextProps.customer.country,
                nick_name: nextProps.customer.nick_name,
                about: nextProps.customer.about,
                join_date: nextProps.customer.join_date,
                favourite_restaurant: nextProps.customer.favourite_restaurant,
                favourite_hobby: nextProps.customer.favourite_hobby,
                blog_url: nextProps.customer.blog_url,
                profile_picture: nextProps.customer.profile_picture,
            })
        } 

        if (nextProps.profile_pic) {
            var { profile_pic } = nextProps;

            if (typeof profile_pic === "string") {
                this.setState({
                    fileName: "Browse Image To Upload",
                    profile_picture: profile_pic
                });
            }
        }
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onImageChoose = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.files[0].name
        });
    }
    
    onCustomerUpdate = (e) => {
        //prevent page from refresh
        e.preventDefault();
        let data = Object.assign({}, this.state);
        console.log("on update of customer profile : ", data);
        this.props.updateCustomerProfile(data);
    };

    onPictureUpload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", this.state.file);
        const imageConfig = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        this.props.uploadCustomerImage(formData, imageConfig);
    }

    render() {

        let redirectVar = null;
        if (!localStorage.getItem("token") || !localStorage.getItem("customer_id")) {
            redirectVar = <Redirect to="/home" />
        }

        console.log("State: ", this.state);
        let message = null;

        if(this.props.status && this.props.status === 'CUSTOMER_UPDATE_SUCCESSFUL') {
            message = (
                <div>
                    <p style={{ color: "green" }}> Update Successful. </p>
                </div>
            );
        } else if(this.props.status && this.props.status === 'CUSTOMER_UPDATE_FAILED') {
            message = (
                <div>
                    <p style={{ color: "red" }}> Error Updating Customer. Please try again later. </p>
                </div>
            );
        }
        
        var joinDate = null;
        if(this.state.join_date) {
            joinDate = this.state.join_date.slice(0,10);
        }

        let userImage;
        if (this.state) {
            userImage = <img src={`${backend}/images/customers/${localStorage.getItem("customer_id")}/profile/${this.state.profile_picture}`} style = {{width:'30rem', height:'20rem'}}/>
        }
        
        return (
            <div>
            {redirectVar}
                <Container fluid={true}>
                <br/><br/><br/>

                    <Row>
                    <Col xs={6} md={4}>
                        <center>
                            <Card style={{ width: '30rem' }}>
                            {userImage}
                            </Card>
                            <form onSubmit={this.onPictureUpload}><br /><br /><br />
                                <div class="custom-file" style={{width: "80%"}}>
                                    <input type="file" multiple class="custom-file-input" name="image" accept="image/*" onChange={this.onImageChoose} required/>
                                    <label class="custom-file-label" for="image">{this.state.fileName}</label>
                                </div><br/><br/>
                                <Button type="submit" variant="primary">Upload Image</Button>
                            </form>
                        </center>
                    </Col>
                        <Col xs={2} md={1}></Col>
                        <Col style={{ width: '60rem' }}>
                        
                            <h2>Update {this.state.name}'s Profile</h2>
                            <br />
                            <br />
                            <Form onSubmit={this.onCustomerUpdate} >
                                <Form.Row>
                                    <Form.Group as={Row} controlId="name">
                                        <Form.Label style={{ width: '15rem' }} >Customer Name</Form.Label>
                                        <Form.Control name="name"
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.name}
                                            pattern="^[A-Za-z0-9 ]+$"
                                            required={true}
                                            placeholder="Update Customer Name" 
                                            style={{ width: '30rem' }}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="about">
                                        <Form.Label  style={{ width: '15rem' }}>About Me</Form.Label>
                                        <Form.Control name="about"
                                            type="text"
                                            onChange={this.onChange}
                                            value={this.state.about}
                                            pattern="^[A-Za-z0-9 ,.]+$"
                                            required={true}
                                            placeholder="Update About Me" 
                                            style={{ width: '30rem' }}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="city">
                                        <Form.Label  style={{ width: '15rem' }}>City</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="city"
                                            onChange={this.onChange}
                                            value={this.state.city}
                                            pattern="^[A-Za-z0-9 ,.]+$"
                                            required={true}
                                            placeholder="Update City"
                                            style={{ width: '30rem' }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="state">
                                        <Form.Label  style={{ width: '15rem' }}>State</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="state"
                                            onChange={this.onChange}
                                            value={this.state.state}
                                            pattern="^[A-Za-z0-9 ,.]+$"
                                            required={true}
                                            placeholder="Update State"
                                            style={{ width: '30rem' }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="country">
                                        <Form.Label  style={{ width: '15rem' }}>Country</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="country"
                                            onChange={this.onChange}
                                            value={this.state.country}
                                            pattern="^[A-Za-z0-9 ,.]+$"
                                            required={true}
                                            placeholder="Update Country"
                                            style={{ width: '30rem' }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="email_id">
                                        <Form.Label  style={{ width: '15rem' }}>Email</Form.Label>
                                        <Form.Control 
                                            type="email"
                                            name="email_id"
                                            value={this.state.email_id}
                                            readOnly
                                            disabled
                                            style={{ width: '30rem' }}
                                            />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="phone">
                                        <Form.Label  style={{ width: '15rem' }}>Phone Number</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="phone"
                                            onChange={this.onChange}
                                            value={this.state.phone}
                                            required={true}
                                            pattern="^[0-9+()-]+$"
                                            title="Please enter in the form Only Numbers"
                                            placeholder="Update Phone Number"
                                            style={{ width: '30rem' }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="dob">
                                        <Form.Label  style={{ width: '15rem' }}>Date Of Birth</Form.Label>
                                        <Form.Control 
                                            type="date"
                                            name="dob"
                                            value={this.state.dob}
                                            onChange={this.onChange}
                                            required={true}
                                            pattern="^[0-9-]+$"
                                            placeholder="Update Date Of Birth"
                                            style={{ width: '30rem' }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="nick_name">
                                        <Form.Label  style={{ width: '15rem' }}>Preferred Name</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="nick_name"
                                            value={this.state.nick_name}
                                            onChange={this.onChange}
                                            required={true}
                                            pattern="^[a-zA-z ]+$"
                                            placeholder="Update Preferred Name"
                                            style={{ width: '30rem' }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="join_date">
                                        <Form.Label  style={{ width: '15rem' }}>Join Date</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="join_date"
                                            value={joinDate}
                                            disabled 
                                            style={{ width: '30rem' }}/>
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="blog_url">
                                        <Form.Label  style={{ width: '15rem' }}>Blog url</Form.Label>
                                        <Form.Control 
                                            type="url"
                                            name="blog_url"
                                            value={this.state.blog_url}
                                            onChange={this.onChange}
                                            required={true}
                                            placeholder="Update Blog url"
                                            style={{ width: '30rem' }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="favourite_hobby">
                                        <Form.Label  style={{ width: '15rem' }}>Favourite Hobby</Form.Label>
                                        <Form.Control 
                                            type="text"
                                            name="favourite_hobby"
                                            value={this.state.favourite_hobby}
                                            onChange={this.onChange}
                                            required={true}
                                            placeholder="Update Favourite Hobby"
                                            style={{ width: '30rem' }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <Form.Row>
                                    <Form.Group as={Row} controlId="favourite_restaurant">
                                        <Form.Label  style={{ width: '15rem' }}>Favourite Restaurant</Form.Label>
                                        <Form.Control                                             
                                            type="text"
                                            name="favourite_restaurant"
                                            value={this.state.favourite_restaurant}
                                            onChange={this.onChange}
                                            required={true}
                                            placeholder="Update Favourite Restaurant"
                                            style={{ width: '30rem' }}
                                        />
                                    </Form.Group>
                                </Form.Row>
                                <br/>
                                <Button style={{marginLeft:"31rem"}} variant="danger" href="/customer/home">Cancel</Button> &nbsp;
                                <Button type="submit" variant="success">Update Details</Button>
                            </Form>
                        </Col>
                    </Row>
                    {message}
                    <br/><br/>
                </Container>
            </div>
        )
    }
}

CustomerProfileForm.propTypes = {
    updateCustomerProfile: PropTypes.func.isRequired,
    customer: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    customer: state.profileState.customerProfile,
    status: state.profileState.status,
    profile_pic: state.imageState.cust_image,
});

function mapDispatchToProps(dispatch) {
    return {
        getCustomer: customer_id => dispatch(getCustomer(customer_id)),
        updateCustomerProfile: data => dispatch(updateCustomerProfile(data)),
        uploadCustomerImage: (formData, uploadConfig) => dispatch(uploadCustomerImage(formData,uploadConfig)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerProfileForm);

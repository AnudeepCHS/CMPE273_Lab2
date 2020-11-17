// 2. View list of people who registered for the events.
// 3. Click on name and view another’s person profile.

import React, { Component } from 'react';
import { Table, Modal, Alert, Button} from "react-bootstrap";
import backend from '../common/serverDetails';
import { Link } from 'react-router-dom';

class RestaurantEventsDetails extends Component {
    constructor(props) {
        super(props);
        this.setState({
        });
    }

    componentWillMount () {
        let event = this.props.location.state.event;
        this.setState({
            event: event,
        });
    }

    onDetailsClick = (e) => {
        this.setState({
            modalParticipantId: e.target.name,
        });
    }

    participantView = (index, participant) => {
        return <tr>
            <td>{index}</td>
            <td>{participant.name}</td>
            <td><Button name={participant._id} onClick={this.onDetailsClick}>View {participant.name}'s Profile</Button></td>
        </tr>
    }

    handleDetailsModalClose = () => {
        this.setState({
            modalParticipantId: "",
        });
    }

    getLocaleTime = (create_time) => {
        var ts = new Date(create_time);
        console.log("Timestamp:", ts.toLocaleString);
        return ts.toLocaleString();
    }

    sendMessage(e) {
        
    }

    render() {

        let participants = [], participant, message;
        let detailsModal, modalParticipant, modalParticipantImgSrc, modalMessage;
        
        for (var i = 0; i < this.state.event.participants.length; i++) {
            if(this.state.event.participants[i]){    
                participant = this.participantView((i+1), this.state.event.participants[i]);
                participants.push(participant);
            }
        }

        let participantsTable = null;
        if(this.state && this.state.event && this.state.event.participants.length > 0) {
            participantsTable = <Table striped bordered hover>
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Participant Profile</th>
            </tr>
          </thead>
          <tbody>
          {participants}
          </tbody>
            </Table>
        } else if (this.state && this.state.event && this.state.event.participants.length === 0) {
            message = <Alert variant="warning">No registrations yet for the event</Alert>
        }

        if (this.state && this.state.modalParticipantId) {
            modalParticipant = this.state.event.participants.find(p => p._id === this.state.modalParticipantId);
            modalParticipantImgSrc = `${backend}/images/customers/${modalParticipant._id}/profile/${modalParticipant.profile_picture}`;
            detailsModal = <Modal
                                show={true}
                                backdrop="static"
                                onHide={this.handleDetailsModalClose}
                                keyboard={false}
                                centered={true}
                            >
                                <Modal.Header closeButton>
                                <Modal.Title>{modalParticipant.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    
                                    <img src={modalParticipantImgSrc} style = {{width:'29rem', height:'20rem'}} />
                                    
                                    <Table striped bordered hover>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{modalParticipant.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td>{modalParticipant.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Email Id</td>
                                                <td>{modalParticipant.email_id}</td>
                                            </tr>
                                            <tr>
                                                <td>Address</td>
                                                <td>{modalParticipant.address}</td>
                                            </tr>
                                            <tr>
                                                <td>Birth Date</td>
                                                <td>{modalParticipant.dob}</td>
                                            </tr>
                                            <tr>
                                                <td>About</td>
                                                <td>{modalParticipant.about}</td>
                                            </tr>
                                            <tr>
                                                <td>Yelping Since</td>
                                                <td>{this.getLocaleTime(modalParticipant.join_date)}</td>
                                            </tr>
                                            <tr>
                                                <td>Blog</td>
                                                <td>{modalParticipant.blog_url}</td>
                                            </tr>
                                            <tr>
                                                <td>Message</td>
                                                <td><Link to={{pathname: `/restaurant/messages/${modalParticipant._id}`, state: modalParticipant}}> Send Message to {modalParticipant.name} </Link></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleDetailsModalClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
        }

        return (
        <div>
        <center>
            <h2>{this.state.event.name}'s Registrations</h2>
            </center>
            <br/>
            {message}
            {detailsModal}
            <div style={{marginLeft:"15rem", marginRight:"15rem"}}>
            {participantsTable}
            </div>
            <br/>
            <Button style={{marginLeft:"15rem"}} href="/r_events/view">Back to Events</Button>
            <br/><br/>
            
        </div>
        );
    }
}
      
export default RestaurantEventsDetails;
import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { changeBgColor } from '../actions/profileAction';
import icon from '../img/icon.png';

class AppNavbar extends Component {

    //blue = #3fbac2
    //red  = #b3252c
    state = {
        modal: false,
        //form values should always have state in the component, NOT application lvl
        color: '',
        colorCode: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    changeColor = (e) => {
        this.setState({
            [e.target.name]: e.target.id
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        var colorCode = '';
        switch(this.state.color){
            case('blue'):
                colorCode='#3fbac2';
                break;
            case('red'):
                colorCode='#b3252c';
                break;
            default:
                break;
        }
        this.props.changeBgColor(colorCode);

        //Close modal
        this.toggle();
    }
    
    render() {
        return (
        <div style={{backgroundColor: '#4d606e', paddingTop: '4rem'}}>
            <Container>
                <input type="image" src={icon} alt="icon" style={{ height: '12%', width: '12%', backgroundColor: this.props.profile.bgColor}} onClick={this.toggle}/>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Edit Avatar</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup tag="fieldset">
                                <FormGroup check>
                                    <Label check>
                                    <Input type="radio" name="color" id='blue' onClick={this.changeColor} />{' '}
                                    blue
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                    <Input type="radio" name="color" id='red' onClick={this.changeColor}/>{' '}
                                    red
                                    </Label>
                                </FormGroup>
                            </FormGroup>
                            <Button
                                color="dark"
                                style={{marginTop: '2rem'}}
                                block
                            > 
                            Update Avi</Button>
                        </Form>
                    </ModalBody>
                </Modal>

                <h1 style={{color: 'white', textAlign: 'center', paddingBottom: '1rem'}}> StreamLine </h1>
            </Container>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { changeBgColor })(AppNavbar);
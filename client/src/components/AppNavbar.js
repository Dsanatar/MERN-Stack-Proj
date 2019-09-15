import React, { Component } from 'react';
import {
    Button,
    ButtonGroup,
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
import stache from '../img/icon-stache.png';
import wiz from '../img/iconNewWiz.png';


class AppNavbar extends Component {

    //blue = #3fbac2
    //red  = #b3252c
    state = {
        modal: false,
        //form values should always have state in the component, NOT application lvl
        color: '',
        colorCode: '',
        editColor: true

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
                colorCode='#ff5858';
                break;
            default:
                break;
        }
        this.props.changeBgColor(colorCode);

        //Close modal
        this.toggle();
    }

    changeForm = (type) => {
        this.setState({
            editColor: type
        });
    }
    
    //blue gray #4d606e

    render() {
        return (
        <div style={{backgroundColor: '#404040', paddingTop: '4rem', paddingLeft: '2rem'}}>

                <input type="image" src={wiz} alt="icon" 
                    style={{ height: '20%', width: '20%',
                             backgroundColor: this.props.profile.bgColor}} onClick={this.toggle}/>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}>

                    <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
                    <ModalBody>
                        <div style={{textAlign: 'center'}}>
                            <ButtonGroup size="md">
                                <Button onClick={() => this.changeForm(true)}>Background Color</Button>
                                <Button onClick={() => this.changeForm(false)}>Icon</Button>
                            </ButtonGroup>
                        </div>
                        <div>
                            {this.state.editColor ? (
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
                            ) : (
                                <h1>Test</h1>
                            )}
                        </div>
                        
                    </ModalBody>
                </Modal>

                <h1 style={{color: '#f5f5f5', textAlign: 'center', paddingBottom: '1rem'}}> StreamLinne </h1>
            
        </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { changeBgColor })(AppNavbar);
import React, { Component, Fragment } from 'react';
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
    Container,
    Navbar,
    Nav,
    NavItem
} from 'reactstrap';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import Logout from './Logout';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeIcon } from '../actions/profileAction';

import NavbarBrand from 'reactstrap/lib/NavbarBrand';

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
        editColor: true,
        icon: '0'

    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    getIcon = () => {
        switch(this.state.icon){
            case '0':
                return icon;
            case '1':
                return wiz;
            default:
                return icon;
        }
    };


    setIcon = (e) => {
        this.setState({
            icon: e.target.id
        })
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
        //this.props.changeBgColor(colorCode);
        this.props.changeIcon(this.state.icon)

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
        const { isAuth, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <Logout/>            
                </NavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>            
                </NavItem>
                
                <NavItem>
                    <LoginModal/>            
                </NavItem>
            </Fragment>
        );

        return (
        //<div style={{backgroundColor: '#404040', paddingTop: '4rem', paddingLeft: '2rem'}}>
        //<h1 style={{color: '#f5f5f5', textAlign: 'center', paddingBottom: '1rem'}}> StreamLinne </h1>
        <div>
            <Navbar color='dark' dark expand='sm' className='mb-5'>
                <Container>
                    <NavbarBrand>
                            <input type="image" src={this.getIcon(this.state.icon)} alt="icon" 
                                style={{ height: '100%', width: '100%',
                                        backgroundColor: '#3fbac2'}} onClick={this.toggle}/>

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
                                                <Container>
                                                    <Form onSubmit={this.onSubmit}>
                                                        <br/>
                                                        <input type="image" src={icon} alt="default" id="0"
                                                            style={{ height: '30%', width: '30%',
                                                            backgroundColor: '#3fbac2'}} onClick={this.setIcon}/>

                                                        <input type="image" src={wiz} alt="wiz" id="1"
                                                            style={{ height: '30%', width: '30%',
                                                            backgroundColor: '#3fbac2'}} onClick={this.setIcon}/>
                                                    </Form>  
                                                </Container>


                                            )}
                                        </div>
                                    
                                </ModalBody>
                            </Modal>
                        </NavbarBrand>

                    <Nav className='ml-3' navbar>
                        {isAuth ? authLinks : guestLinks}
                    </Nav>
                </Container>
            </Navbar>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { changeIcon })(AppNavbar);
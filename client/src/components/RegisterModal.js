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
    NavLink,
    Alert
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/authAction';
import { clearErrors } from '../actions/errorAction';

class RegisterModal extends Component {
    state = {
        modal: false,
        //form values should always have state in the component, NOT application lvl
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuth: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps){
        const { error, isAuth } = this.props;
        if(error !== prevProps.error) {
            // check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg});
            }
            else{
                this.setState({ msg: null });
            }
        }

        // closes modal when authenticates
        if(this.state.modal){
            if(isAuth){
                this.toggle();
            }
        }
    }

    toggle = () => {
        // clears error before opens
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const { name, email, password } = this.state;

        // init new user
        const newUser = {
            name,
            email,
            password
        };

        // attempts to register new user
        this.props.register(newUser);

    }

    render() {
        return(
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null }
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    type="text"
                                    //name should match state
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Label for="email">Email</Label>
                                <Input
                                    type="email"
                                    //name should match state
                                    name="email"
                                    id="email"
                                    placeholder="Email"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />

                                <Label for="password">Password</Label>
                                <Input
                                    type="password"
                                    //name should match state
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    className="mb-3"
                                    onChange={this.onChange}
                                />
                                <Button
                                    color="dark"
                                    style={{marginTop: '2rem'}}
                                    block
                                > 
                                Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    // from root reducer
    isAuth: state.auth.isAuth,
    error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);
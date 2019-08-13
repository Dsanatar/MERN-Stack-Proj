import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, delItem } from '../actions/itemAction';
import PropTypes from 'prop-types';

class List extends Component {

    componentDidMount() {
        this.props.getItems();
    };

    onDeleteClick = id => {
        this.props.delItem(id);
    };

    render() {
        //destructuring
        const { items } = this.props.item;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="list-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                <Button
                                className="remove-btn"
                                color="danger"
                                size="sm"
                                onClick={this.onDeleteClick.bind(this, _id)}
                                >&times;
                                </Button>
                                {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

List.propTypes = {
    //actions are stored as props
    getItems: PropTypes.func.isRequired,

    delItem: PropTypes.func.isRequired,

    //this is from the mapState
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) =>({
    //this must match whats in the rootReducer
    item: state.item 
})

export default connect(mapStateToProps, { getItems, delItem })(List);
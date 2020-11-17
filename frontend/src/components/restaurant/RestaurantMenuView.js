import React, { Component } from 'react';
import { Container, Alert, Pagination } from "react-bootstrap";
import Dish from "./Dish";
import { getMenu, deleteDish } from "../../redux/action/menuActions";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

class RestaurantMenuView extends Component {
    constructor(props) {
        super(props);
        this.changePage = this.changePage.bind(this);
    }

    componentDidMount() {
        this.props.getMenu();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dishes) {
            var { dishes } = nextProps;
            console.log('RestaurantMenuView -> componentWillReceiveProps -> dishes : ', dishes);
            this.setState({
                dishes: dishes,
                activePage: 1
            });
        }
        if (nextProps.deleteDishStatus && nextProps.deleteDishStatus !== this.props.deleteDishStatus) {
            var { deleteDishStatus } = nextProps;
            this.setState({
                deleteDishStatus: deleteDishStatus
            })
            this.props.getMenu();
        }
    }

    deleteDish = (e) => {
        this.props.deleteDish (e.target.name);
    };

    dishesView = (inputDish) => {
        return <Dish dish={inputDish} deleteDish={this.deleteDish}/>;
    };

    changePage = (e) => {
        let page = this.state.activePage;
        if (e.target.text === ">" && page !== parseInt(e.target.name)) {
            page += 1;
        } else if (e.target.text === "<" && page !== parseInt(e.target.name)) {
            page -= 1;
        } else {
            page = parseInt(e.target.name);
        }
        this.setState({
            activePage: page
        });
    };

    render() {
        let message = null,
            dish,
            menuRender = [],
            pagesBar = null,
            itemsToShow = 5,
            active = 1;

        if (this.state && this.state.activePage) {
            active = this.state.activePage;
        }

        if (this.state && this.state.dishes === 'NO_DISHES') {
            message = <Alert variant="warning">Dishes not added to the menu yet</Alert>;
        }

        if (this.state && this.state.dishes && this.state.dishes !== 'NO_DISHES' && this.state.dishes.length > 0) {

            let dishes = this.state.dishes;
            let cardCount = 0;

            for (let i = (active - 1) * itemsToShow; i < dishes.length; i++) {
                console.log('**************** dishes : ', dishes[i]);
                dish = this.dishesView(this.state.dishes[i]);
                menuRender.push(dish);
                cardCount++;
                if (cardCount === itemsToShow)
                    break;
            }

            let pages = [];
            let pageCount = Math.ceil(dishes.length / itemsToShow);

            for (let i = 1; i <= pageCount; i++) {
                pages.push(
                    <Pagination.Item key={i} active={i === active} name={i} onClick={this.changePage}>
                        {i}
                    </Pagination.Item>
                );
            }
            pagesBar = (
                <div>
                    <br />
                    <Pagination>
                        <Pagination.Prev name="1" onClick={this.changePage} />
                        {pages}
                        <Pagination.Next name={pageCount} onClick={this.changePage} />
                    </Pagination>
                </div>
            );
        }

        if (this.state && this.state.deleteDishStatus) {
            if (this.state.deleteDishStatus === 'DISH_DELETED') {
                message = <Alert variant="success">Dish Deleted Successfully</Alert>;
            } else {
                message = <Alert variant="error">Dish Deletion Failed</Alert>;
            }
        }

        return (
            <Container className="justify-content">
                <br />
                <center><h2>Menu</h2></center>
                {message}

                {menuRender}
                {pagesBar}
            </Container>
        );
    }
}

RestaurantMenuView.propTypes = {
    dishes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    dishes: state.menuState.dishes,
    status: state.menuState.status,
    deleteDishStatus: state.menuState.deleteDishStatus,
});

function mapDispatchToProps(dispatch) {
    return {
        getMenu: () => dispatch(getMenu()),
        deleteDish: (dish_id) => dispatch(deleteDish(dish_id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantMenuView);

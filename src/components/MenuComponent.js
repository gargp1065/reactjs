import React, {Component} from 'react'
import {Media, CardImgOverlay, CardTitle, CardText} from 'reactstrap'
import {Card, CardImg, CardBody} from 'reactstrap'
import DishdetailComponent from './DishDetailComponent'


class Menu extends Component {
    constructor(props) {
        super(props);  
        this.state = {
            dishSelected: null
        }
    }

    // renderDish(dish) {
    //     if(dish != null) {
    //         return (

    //             <Card>
    //                 <CardImg width="100%" src={dish.image} alt={dish.name}  />
    //                 <CardBody>
    //                     <CardTitle>{dish.name}</CardTitle>
    //                     <CardText>{dish.description}</CardText>
    //                 </CardBody>

    //             </Card>

    //         );
    //     }
    //     else {
    //         return (
    //             <div></div>
    //         );
    //     }
    // }

    onDishSelect(dish) {
        this.setState( {dishSelected: dish} );
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src= {dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <DishdetailComponent dishSelected={this.state.dishSelected}/>
            </div>
        );
    }
}

export default Menu;
import React, {Component, Fragment} from 'react'
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    renderDish(dish) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardBody>{dish.description}</CardBody>
                </CardBody>
            </Card>
        );
    }

    renderComments(dish) {
        console.log(dish);
        if(dish.comments == null) { 
            return (
                <div></div>
            );
        }
        else {
            return (
                <div>
                    <h4>Comments</h4>
                    <br/>
                    <ul className="list-unstyled">
                        {
                            dish.comments.map((item) =>{
                                return (
                                    <Fragment key={item.id}>
                                        <li>{item.comment}</li>
                                        <li>-- {item.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date)))}</li><br/>
                                    </Fragment>
                                );
                            })
                        }
                    </ul>
                </div>
            );
        }
    }
    render () {
        const {dish} = this.props;
        if(dish == null) {
            return (
                <div></div>
            );
        }
        else {
            return (
                <div class="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            {this.renderDish(dish)}
                        </div>

                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(dish)}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default DishDetail
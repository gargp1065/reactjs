import React, {Component, Fragment} from 'react'
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap';
class dishDetail extends Component {
    constructor(props) {
        super(props);

    }

    renderDish(dishSelected) {
        return (
            <Card>
                <CardImg width="100%" src={dishSelected.image} alt={dishSelected.name}/>
                <CardBody>
                    <CardTitle>{dishSelected.name}</CardTitle>
                    <CardBody>{dishSelected.description}</CardBody>
                </CardBody>
            </Card>
        );
    }

    renderComments(dishSelected) {
        // console.log(dishSelected);
        if(dishSelected.comments == null) { 
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
                            dishSelected.comments.map((item) =>{
                                return (
                                    <Fragment>
                                        <li>{item.comment}</li>
                                        <li>-- {item.author}, {item.date}</li><br/>
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
        const {dishSelected} = this.props;
        if(dishSelected == null) {
            return (
                <div></div>
            );
        }
        else {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(dishSelected)}
                    </div>

                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(dishSelected)}
                    </div>
                </div>
            )
        }
    }
}

export default dishDetail
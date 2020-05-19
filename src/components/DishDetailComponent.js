import React, {Fragment} from 'react'
import { Card, CardBody, CardImg, CardTitle } from 'reactstrap';


    function RenderDish({dish}) {
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

    function RenderComments({comments}) {
        console.log(comments);
        if(comments == null) { 
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
                            comments.map((item) =>{
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
    const DishDetail = (props) => {
        if(props.dish == null) {
            return (
                <div></div>
            );
        }
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish}/>
                        </div>

                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments = {props.dish.comments}/>
                        </div>
                    </div>
                </div>
            )
        }
    }

export default DishDetail
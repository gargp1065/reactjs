import React, {Fragment} from 'react'
import { Card, CardBody, CardImg, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom'

    function RenderDish({dish}) {
        return (
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardBody>{dish.description}</CardBody>
                    </CardBody>
                </Card>
            </div>
        );
    }

    function RenderComments({comments}) {
        // console.log(comments);
        if(comments == null) { 
            return (
                <div></div>
            );
        }
        else {
            console.log(comments)
            return (
                <div className="col-12 col-md-5 m-1" >
                    <h4>Comments</h4>
                    <br/>
                    <ul className="list-unstyled">
                        {comments.map((comment) =>{
                            return (
                                <li key={comment.id}>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            );
                        })}
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
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments = {props.comments}/>
                    </div>
                </div>
            );
        }
    }

export default DishDetail
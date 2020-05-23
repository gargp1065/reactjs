import React, { Component } from 'react'
import { Card, CardBody, CardImg, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Col , Row, Label } from 'reactstrap';
import {Link} from 'react-router-dom'
import { LocalForm, Control, Errors} from 'react-redux-form';
import { Loading } from "./LoadingComponent";

    function RenderDish({dish}) {
        console.log(dish);
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

    function RenderComments({comments, addComment, dishId}) {
        console.log(comments);
        if(comments == null) { 
            return (
                <div></div>
            );
        }
        else {
            console.log(comments, addComment, dishId)
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
                    <CommentForm comments={comments} dishId={dishId} addComment={addComment}/>
                </div>
            );          
        }
    }

    const DishDetail = (props) => {
        console.log(props.dish);
        if(props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );
        }
        else if(props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(props.dish !== null) {
            return (
                <div className="container">
                    <div className="row">
                        {console.log(props.dish.name)}
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
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
                        <RenderComments comments = {props.comments}
                            addComment={props.addComment} dishId={props.dish.id}  />
                    </div>
                </div>
            );
        }
        else {
            return (<div></div>);
        }
    }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);

    class CommentForm extends Component {
        
        constructor(props) {
            super(props);

            this.state = {
                isModalOpen: false
            }

            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal() {
            this.setState({
                isModalOpen: !this.state.isModalOpen,
            })
        }

        handleSubmit(values) {
            this.props.addComment(this.props.dishId, values.rating, values.name, values.comments);
            this.setState({
                isModalOpen: !this.state.isModalOpen
            })
        }

        render() {
            return (
                <div>
                    <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <LocalForm onSubmit={(values) => this.handleSubmit(values)}> 
                                <Row className="form-group">
                                    <Label htmlFor="rating" md={12}>Rating</Label>
                                    <Col md={12}>
                                        <Control.select model=".rating" className="form-control" name="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>    
                                        </Control.select>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="name" md={12}>Your Name</Label>
                                    <Col md={12}>
                                        <Control.text model=".name" id="name" name="name" placeholder="Your Name" className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                        <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                     />
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Label htmlFor="comments" md={12}>Comment</Label>
                                    <Col md={12}>
                                        <Control.textarea model=".comments" id="comments" name="comments" className="form-control" rows={6}/>
                                    </Col>
                                </Row>

                                <Row className="form-group">
                                    <Col md={{size: 10}}>
                                        <Button type="submit" color="primary">
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>

                            </LocalForm>
                        </ModalBody>
                    </Modal>
                    <Button onClick={this.toggleModal}><i className="fa fa fa-pencil fa-lg"></i>Submit Comment</Button>

                </div>
                
                
            );
        }
    }   

export default DishDetail
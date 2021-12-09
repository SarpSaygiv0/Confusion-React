import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, Label, ModalHeader, ModalBody, Row } from 'reactstrap';
import {Link} from "react-router-dom";
import {Control, LocalForm, Errors} from 'react-redux-form';
import { Loading } from "./LoadingComponent";

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props){
        super(props);

        this.toggleModal = this.toggleModal.bind(this);    
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            isModalOpen: false
        }
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render(){
        return(
            <div>
            <Button type="button" className="btn btn-outline-secondary" outline onClick={this.toggleModal}>
                Submit Comment
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" id="rating" name="rating" 
                        className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select> 
                        <Label htmlFor="author">Your Name</Label>
                        <Control.text model=".author" id="author" name="author" 
                        className="form-control" placeholder="Your Name"
                        validators={{minLength: minLength(3), maxLength: maxLength(15)}}>
                        </Control.text> 
                        <Errors 
                            className="text-danger"
                            model=".author"
                            show="touched"
                            messages={{
                                minLength: 'Must be greater than 3',
                                maxLength: 'Must be 15 char or less'
                            }}
                            />
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" id="comment" name="comment" 
                        className="form-control" rows="6">        
                        </Control.textarea> 
                        <Row className="form-group" />
                        <Button type="submit" color="primary">
                            Submit 
                        </Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </div>
            );
    }
}
    function RenderDish({dish}) {
        if(dish!=null) {
            return (
                <Card>
                    <CardImg width="%100" src = {dish.image} alt = {dish.name}></CardImg>
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>

            );
        }
        else{
            <div></div>
        }
    }

    function RenderComments({comments, addComment, dishId}) {
        if (comments.length != 0) {
                return(
                    <div>
                        <h4>Comments</h4>
                        {comments.map(comment => (
                            <ul className="list-unstyled">
                                <li>
                                    <p>{comment.comment}</p>
                                    <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                            </ul>
                        ))}
                        <CommentForm dishId={dishId} addComment={addComment} />
                    </div>
                )
            };
        }

    const DishDetail = (props) => {

        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );        
        }
        else if(props.errMess) {
            return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
            );
        }

        else if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}
                            addComment={props.addComment} dishId={props.dish.id} />
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return <div></div>
        }

    }


export default DishDetail;
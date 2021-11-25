import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

    renderDish(dish) {
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

    renderComments(comments) {
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
                    </div>
                )
            };
        }

    render() {
        const dish = this.props.dish;
        
        if (dish != null) {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                        {this.renderDish(dish)}
                        </div>
                        <div className="col-12 col-md-5 m-1">
                        {this.renderComments(dish.comments)}
                        </div>
                    </div>
                </div>
                );
        }
        else {
            return <div></div>
        }
    }
}

export default DishDetail;
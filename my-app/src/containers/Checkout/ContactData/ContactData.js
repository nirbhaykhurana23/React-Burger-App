import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button';
import classes from "./ContactData.module.css";

import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component{
    
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault(); //to prevent sending data and reloading page
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Nirbhay',
                address: {
                    street: 'A1',
                    zipcode: '110090',
                    country: 'India'
                },
                email: 'nirbhay.khurana@tothenew.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({
                    loading: false
                });
            });
    }

    render(){

        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
                <input className={classes.Input} type="text" name="email" placeholder="Your Email"/>
                <input className={classes.Input} type="text" name="street" placeholder="Your Street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="Your Postal Code"/>
                
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner/>;
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                
                {form}

            </div>
        )
    }

}

export default ContactData;
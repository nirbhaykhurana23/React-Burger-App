import React, { Component } from "react";
import Aux from '../../hoc/Aux/Aux';

import Burger from '../../components/Burger/Burger'

import BuildControls from '../../components/Burger/BuildControls/BuildControls';

import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";

//global constants
const INGREDIENT_PRICES= {
    salad: 10,
    cheese: 20,
    meat: 15,
    bacon: 30
};

class BurgerBuilder extends Component{

    state= {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchasable: false,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        //ingredients
        const oldCount= this.state.ingredients[type];
        const updatedCount= oldCount + 1;
        const updatedIngredients= {...this.state.ingredients};
        updatedIngredients[type]= updatedCount;

        //price
        const priceAddition= INGREDIENT_PRICES[type];
        const oldPrice= this.state.totalPrice;
        const newPrice= oldPrice + priceAddition;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        //ingredients
        const oldCount= this.state.ingredients[type];
        // if(oldCount <= 0){
        //     return;
        // }
        const updatedCount= oldCount - 1;
        const updatedIngredients= {...this.state.ingredients};
        updatedIngredients[type]= updatedCount;

        //price
        const priceDeduction= INGREDIENT_PRICES[type];
        const oldPrice= this.state.totalPrice;
        const newPrice= oldPrice - priceDeduction;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState(ingredients){
        const sum= Object.keys(ingredients)  //Object.keys() will create array of strings 
                    .map(igKey => {
                        return ingredients[igKey];
                    })
                    .reduce((sum, el) => {
                        return sum + el;
                    },0);
        this.setState({purchasable: sum > 0});
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You continue');
    }

    render(){

        //{salad: true, bacon: false, etc}
        //if true then disabled
        const disabledInfo= {...this.state.ingredients};
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <=0 
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>

                <Burger ingredients={this.state.ingredients}/>

                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
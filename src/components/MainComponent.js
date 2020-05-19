import React, { Component } from 'react';
import Menu from './MenuComponent'
import {DISHES} from '../shared/dishes'
import Header from './HeaderComponent'
import DishDetail from './DishDetailComponent';
import Footer from './FooterComponent';

class Main extends Component { 
  constructor(props) {
    super(props);

    this.state = {
        dishes: DISHES,
        dishSelected: null
    };
  }

  onDishSelect(dishId) {
    this.setState( {dishSelected: dishId} );
    }

  render() {
    return (
      <div>
        <Header/>
        <Menu dishes = {this.state.dishes} onClick={(dishId) => this.onDishSelect(dishId)}/>
        <DishDetail dish = {this.state.dishes.filter((dish) => dish.id === this.state.dishSelected)[0] } />
        <Footer/>
      </div>
    );
  }
}

export default Main;

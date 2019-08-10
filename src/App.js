import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'

import './App.scss';
import RecipeGrid from './components/recipeGrid';
import SingleRecipe from './components/singleRecipe';
import SideBar from './components/sideBar';
import Grocery from './components/grocery';
import Page404 from './components/Page404';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <div className="app-container">
              <SideBar />
              <Switch>
                <Route exact path="/" component={RecipeGrid}></Route>
                <Route path="/grocery-list" component={Grocery}></Route>
                <Route path="/recipe-list" component={RecipeGrid}></Route>
                <Route path="/recipe/:id" component={SingleRecipe}></Route>
                <Route path="*" component={Page404}></Route>
              </Switch>
            </div>

          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;

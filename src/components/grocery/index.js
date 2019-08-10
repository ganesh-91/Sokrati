import React, { Component } from "react";

import { connect } from "react-redux";
import recipeActions from '../../actions/recipeActions';

import utils from '../../utils/appUtils'

import './index.scss';

class SingleGroceryList extends Component {
    render() {
        return (
            <div className="card border-0" >
                <div className="card-header border-0">
                    <span className="m-0 recipe-title">{this.props.data.name}</span>
                    <i class="fa fa-trash-o mr-1 icon" onClick={this.deleteGrocery} aria-hidden="true"></i>
                </div>
                <div className="card-body">
                    {this.props.data.ingredient.map((el) => {
                        const uniqKey = utils.uniqueIdGenerator();
                        return (
                            <div key={uniqKey} className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id={uniqKey} />
                                <label className="form-check-label" htmlFor={uniqKey}>{el}</label>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    deleteGrocery = (() => {
        this.props.deleteGrocery(this.props.data.id);
    })

}

class Grocery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groceryList: [],
            list: []
        };
    }
    render() {
        let groceryListTable =
            this.props.groceryList.map((list) => {
                return (<SingleGroceryList data={list} key={list.id} deleteGrocery={this.deleteGrocery} />);
            });
        let noDataFound = (<div>List is Empty !!</div>);
        return (
            <div className="jumbotron page-container grocery-list w-100">
                <div className="top-sec text-center border-bottom">
                    <h3>Grocery list</h3>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xl-8 col-sm">
                            <div className="card p-3">
                                {this.props.groceryList.length === 0 ? noDataFound : groceryListTable}
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getGroceryList();
    }

    deleteGrocery = ((recipe) => {
        this.props.deleteGrocery(recipe);
    })

    getGroceryList = (() => {
        if (this.props.groceryList.length <= 0) {
            let resp = JSON.parse(window.localStorage.getItem('groceryList'));
            if (resp.length !== 0) {
                this.props.updateGroceryList(resp);
            }
        }
    })


}
const mapDispatchToProps = (dispatch) => {
    return {
        deleteGrocery: (data) => {
            dispatch(recipeActions.deleteGrocery(data));
        },
        updateGroceryList: (data) => {
            dispatch(recipeActions.updateGroceryList(data));
        }
    };
};

const mapStateToProps = (store) => {
    return {
        groceryList: store.groceryReducer.groceryList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Grocery);

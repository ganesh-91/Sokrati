import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import recipeActions from '../../actions/recipeActions';
import utils from '../../utils/appUtils'
import './index.scss';

class SingleRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {
                uri: "",
                label: "",
                image: "",
                source: "",
                url: "",
                shareAs: "",
                dietLabels: [],
                healthLabels: [],
                cautions: [],
                ingredientLines: [],
                calories: 0,
                totalTime: 0,
                id: ""
            }
        };
    }
    render() {
        // console.log('userData', this.props.userData);
        return (
            <div className="page-container jumbotron single-recipe flex-column">
                <div className="top-sec border-bottom">
                    <div className="btn-toolbar justify-content-between" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group" role="group" aria-label="First group">
                            <button className="btn btn-sm btn-link">
                                <i className="fa fa-chevron-left mr-1" aria-hidden="true"></i>
                                <Link to="/recipe-list">Back to list</Link>
                            </button>
                        </div>
                        <div className="btn-group" role="group" aria-label="First group">
                            <button className="btn btn-sm btn-light border" onClick={this.addToGrocery}>Add to Grocery List</button>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4 col-lg-3 ">

                            <div className="bg-white p-3 border border-bottom-0 rounded-sm">
                                <div className="sm-top d-lg-none d-xl-none d-md-none">
                                    <div className="sm-title">
                                        <h3 className="card-title">{this.props.singleRecipe.label}</h3>
                                    </div>
                                    <div className="sm-icon">
                                        <div className="time-int mr-3">
                                            <i className="fa fa-clock-o mr-1" style={{ fontSize: '1rem' }} aria-hidden="true"></i>
                                            {this.props.singleRecipe.totalTime} min
                                        </div>
                                        <div>
                                            <i className="fa fa-list-alt mr-1" style={{ fontSize: '1rem' }} aria-hidden="true"></i>
                                            {this.props.singleRecipe.ingredientLines.length}
                                        </div>
                                    </div>
                                </div>
                                <img src={this.props.singleRecipe.image} className="card-img-top" alt="..." />
                            </div>
                            <div className="p-3 bg-white border border-top-0">
                                <h5>Ingredients</h5>
                                {this.props.singleRecipe.ingredientLines.map((el) => {
                                    return (
                                        <p className="mb-1" key={utils.uniqueIdGenerator()}>
                                            <i className="fa fa-plus mr-1" aria-hidden="true"></i>
                                            <span>
                                                {el}
                                            </span>
                                        </p>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="col-md-8 col-lg-9">
                            <div className="card">
                                <div className="card-body row d-none d-md-block d-lg-block d-xl-block">
                                    <div className="col-9">
                                        <h3 className="card-title">{this.props.singleRecipe.label}</h3>
                                    </div>
                                    <div className="col-3">
                                        <div className="time-int mr-3">
                                            <i className="fa fa-clock-o mr-1" aria-hidden="true"></i>
                                            {this.props.singleRecipe.totalTime} min
                                        </div>
                                        <div>
                                            <i className="fa fa-list-alt mr-1" aria-hidden="true"></i>
                                            {this.props.singleRecipe.ingredientLines.length}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 border-top">
                                    <h5>Instructions</h5>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
                                     has been the industry's standard dummy text ever since the 1500s, when an 
                                     unknown printer took a galley of type and scrambled it to make a type specimen 
                                     book. It has survived not only five centuries, but also the leap into electronic 
                                     typesetting, remaining essentially unchanged. It was popularised in the 1960s with 
                                     the release of Letraset sheets containing Lorem Ipsum passages, and more recently with 
                                     desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getSingleRecipe();
    }
    getSingleRecipe = (() => {
        if (this.props.singleRecipe.id === "") {
            let resp = JSON.parse(window.localStorage.getItem('singleRecipe'));
            if (resp.id !== "") {
                this.props.updateSingleRecipe(resp);
            }
        }
    })

    addToGrocery = (() => {
        const data = {
            name: this.props.singleRecipe.label,
            id: utils.uniqueIdGenerator(),
            ingredient: this.props.singleRecipe.ingredientLines
        }
        this.props.addGroceryList(data);
    })

}

const mapDispatchToProps = (dispatch) => {
    return {
        addGroceryList: (data) => {
            dispatch(recipeActions.addGroceryList(data));
        },
        updateSingleRecipe: (data) => {
            dispatch(recipeActions.updateSingleRecipe(data));
        }
    };
};

const mapStateToProps = (store) => {
    return {
        singleRecipe: store.recipeReducer.singleRecipe
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRecipe);
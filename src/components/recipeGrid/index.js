import React, { Component } from "react";
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import recipeActions from '../../actions/recipeActions';

import API from '../../utils/axiosInterceptor'
import utils from '../../utils/appUtils'

import './index.scss';

class SingleRecipeCard extends Component {
    render() {
        // console.log('this.props',this.props)
        return (
            <div className="card">
                <img src={this.props.data.image} className="card-img-top" alt="..." />
                <div className="card-body border-top">
                    <div>
                        <Link to={`recipe/${this.props.data.id}`} onClick={this.toSingleRecipe}>
                            <h5 className="card-title">{this.props.data.label}</h5>
                        </Link>
                    </div>
                    <div>
                        <small className="text-muted text-left info-sec">
                            <span className="time-int mr-3">
                                <i className="fa fa-clock-o mr-1" aria-hidden="true"></i>
                                {this.props.data.totalTime} min
                            </span>
                            <span>
                                <i className="fa fa-list-alt mr-1" aria-hidden="true"></i>
                                {this.props.data.ingredientLines.length}
                            </span>
                        </small>
                    </div>
                </div>
            </div>
        );
    }

    toSingleRecipe = (() => {
        this.props.toSingleRecipe(this.props.data);
    })

}

class RecipeGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeList: []
        };
    }
    render() {

        let table =
            this.props.recipeList.map((recipe) => {
                return (<SingleRecipeCard data={recipe} key={recipe.id} toSingleRecipe={this.toSingleRecipe} />);
            });
        return (
            <div className="jumbotron page-container recipe-grid">
                <div className="top-sec text-center">
                    <h3>Recipes</h3>
                </div>
                <div className="container-fluid">
                    <div className="row pl-3" >
                        {table}
                    </div>
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.getRecipeList();
    }

    toSingleRecipe = ((recipe) => {
        this.props.updateSingleRecipe(recipe);
        window.localStorage.setItem('singleRecipe', JSON.stringify(recipe));
    })

    _responseParser = (resp) => {
        var newArr = [];
        resp.hits.forEach((el) => {
            const obj = {
                uri: el.recipe.uri,
                label: el.recipe.label,
                image: el.recipe.image,
                source: el.recipe.source,
                url: el.recipe.url,
                shareAs: el.recipe.shareAs,
                dietLabels: el.recipe.dietLabels,
                healthLabels: el.recipe.healthLabels,
                cautions: el.recipe.cautions,
                ingredientLines: el.recipe.ingredientLines,
                calories: el.recipe.calories,
                totalTime: el.recipe.totalTime,
                id: utils.uniqueIdGenerator()
            };
            newArr.push(obj);
        });
        return newArr;
    }

    getRecipeList = () => {
        if (this.props.recipeList.length === 0) {
            let resp = JSON.parse(window.localStorage.getItem('recipeList'));
            if (resp && resp.length > 0) {
                this.props.updateRecipeList(resp);
            } else {
                API.getApi('q=chicken&')
                    .then(res => {
                        console.log(res.data.hits);

                        let newArr = [];
                        newArr = this._responseParser(res.data);
                        this.setState({
                            recipeList: newArr
                        })
                        this.props.updateRecipeList(newArr);
                        window.localStorage.setItem('recipeList', JSON.stringify(newArr));
                    })
            }
        }
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateRecipeList: (data) => {
            dispatch(recipeActions.updateRecipeList(data));
        },
        updateSingleRecipe: (data) => {
            dispatch(recipeActions.updateSingleRecipe(data));
        }
    };
};

const mapStateToProps = (store) => {
    return {
        recipeList: store.recipeReducer.recipeList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeGrid);

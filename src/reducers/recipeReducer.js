import update from "immutability-helper";

const recipeState = {
    singleRecipe: {
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
    },
    recipeList: []
};

const recipeReducer = function (state, action) {
    let newState = state;



    if (typeof state === 'undefined') {
        return recipeState;
    }

    switch (action.type) {

        case 'UPDATE_RECIPE_LIST':
            newState = update(state, {
                recipeList: { $set: action.data }
            });
            break;

        case 'UPDATE_SINGLE_RECIPE':
            newState = update(state, {
                singleRecipe: { $set: action.data }
            });
            break;

        default:
            break;
    }

    // window.localStorage.setItem('newState', JSON.stringify(newState));
    return newState;

}

export default recipeReducer;
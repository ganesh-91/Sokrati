export const updateRecipeList = (data) => {
    return ({
        type: 'UPDATE_RECIPE_LIST',
        data: data
    });
}

export const updateSingleRecipe = (data) => {
    return ({
        type: 'UPDATE_SINGLE_RECIPE',
        data: data
    });
}

export const addGroceryList = (data) => {
    return ({
        type: 'ADD_TO_GROCERY',
        data: data
    });
}

export const deleteGrocery = (id) => {
    return ({
        type: 'REMOVE_FROM_GROCERY',
        data: id
    });
}

export const updateGroceryList = (data) => {
    return ({
        type: 'UPDATE_GROCERY',
        data: data
    });
}

const recipeActions = {
    updateSingleRecipe,
    updateRecipeList,
    addGroceryList,
    deleteGrocery,
    updateGroceryList
};

export default recipeActions;
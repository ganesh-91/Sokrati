import update from "immutability-helper";

const groceryState = {
    groceryList: []
};

const groceryReducer = function (state, action) {
    let newState = state;

    if (typeof state === 'undefined') {
        return groceryState;
    }

    switch (action.type) {

        case 'ADD_TO_GROCERY':
            newState = update(state, {
                groceryList: { $push: [action.data] }
            });
            break;

        case 'REMOVE_FROM_GROCERY':
            newState = update(state, {
                groceryList: {
                    $apply: ((groceryList) => {
                        return groceryList.filter((t) => {
                            return t.id !== action.data
                        })
                    })
                }
            });
            break;

        case 'UPDATE_GROCERY':
            newState = update(state, {
                groceryList: { $set: action.data }
            });
            break;

        default:
            break;
    }

    window.localStorage.setItem('groceryList', JSON.stringify(newState.groceryList));
    return newState;

}

export default groceryReducer;
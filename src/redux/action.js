import { createStore } from "redux";

const ADD_APPLICATION = 'ADD_APPLICATION'

function addApplication() {
    return {
        type: ADD_APPLICATION,
        info: 'First reduc action'
    }
}

const initialState = {
    numOfApplications: 10
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_APPLICATION: return {
            ...state,
            numOfApplications: state.numOfApplications - 1
        }

        default: return state
    }
}

const store = createStore(reducer);
console.log('Inital state', store.getState())
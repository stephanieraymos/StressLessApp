import * as ActionTypes from './ActionTypes';

export const tips = (state = { isLoading: true,
                                     errMess: null,
                                     admins: []}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TIPS:
            return {...state, isLoading: false, errMess: null, tips: action.payload};

        case ActionTypes._LOADING:
            return {...state, isLoading: true, errMess: null, tips: []}

        case ActionTypes._FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};
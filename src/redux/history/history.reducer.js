import {GET_HISTORY_FAIL, GET_HISTORY_START, GET_HISTORY_SUCCESS} from './history.types';

const initialState = {
    history: [],
    loading: true,
    error  : null
};

const history = (state = initialState, action) => {
    switch (action.type) {
        case GET_HISTORY_START:
            return {
                ...state,
                loading: true,
                error  : null
            };
        case GET_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                history: action.history
            };
        case GET_HISTORY_FAIL:
            return {
                ...state,
                loading: false,
                error  : action.error
            };
        default:
            return state;
    }
};
export default history;

import {NEXT_STEP, PREVIOUS_STEP, SET_ACTIVE_STEP} from './step.types';

const stepReducer = (state = -1, action) => {
    switch (action.type) {
        case SET_ACTIVE_STEP:
            return action.index;
        case NEXT_STEP:
            return state === 33 ? 33 : state + 1;
        case PREVIOUS_STEP:
            return state === -1 ? -1 : state - 1;
        default:
            return state;
    }
};
export default stepReducer;

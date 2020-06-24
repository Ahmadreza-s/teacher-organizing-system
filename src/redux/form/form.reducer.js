import {GET_FORM_FAIL, GET_FORM_START, GET_FORM_SUCCESS, UPDATE_FILES, UPDATE_QUESTION} from './form.types';

const initialState = {
    questions: [],
    formId   : null,
    loading  : true,
    error    : null
};

const formReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FORM_START:
            return {
                ...state,
                loading: true,
                error  : null
            };
        case GET_FORM_SUCCESS:
            return {
                ...state,
                questions: action.questions,
                formId   : action.formId,
                loading  : false
            };
        case GET_FORM_FAIL:
            return {
                ...state,
                error  : null,
                loading: false
            };
        case UPDATE_QUESTION:
            return {
                ...state,
                questions: state.questions.map(q =>
                    q.id === action.question.id ? {
                        ...q,
                        ...action.object
                    } : q)
            };
        case UPDATE_FILES:
            return {
                ...state,
                questions: state.questions.map(q =>
                    q.id === action.question.id ? {
                        ...q,
                        javab: {
                            ...q.javab,
                            files: action.files
                        }
                    } : q)
            }
                ;
        default:
            return state;
    }
};
export default formReducer;

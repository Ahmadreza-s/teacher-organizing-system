import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import historyReducer from './history/history.reducer';
import formReducer from './form/form.reducer';
import stepReducer from './step/step.reducer';

const persistConfig = {
    key      : 'root',
    storage,
    whitelist: []
};
const rootReducer = combineReducers({
    user   : userReducer,
    history: historyReducer,
    form   : formReducer,
    step   : stepReducer
});

export default persistReducer(persistConfig, rootReducer);

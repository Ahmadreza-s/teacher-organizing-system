import {applyMiddleware, createStore} from 'redux';
import rootReducer from './root.reducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);

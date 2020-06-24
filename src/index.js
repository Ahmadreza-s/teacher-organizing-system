import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createMuiTheme, StylesProvider} from '@material-ui/core/styles';
import {jssPreset, ThemeProvider} from '@material-ui/styles';
import {create} from 'jss';
import rtl from 'jss-rtl';
import {BrowserRouter as Router} from 'react-router-dom';
import {persistor, store} from './redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const theme = createMuiTheme({
    direction : 'rtl',
    typography: {
        fontFamily: 'Vazir'
    }
});
const jss = create({plugins: [...jssPreset().plugins, rtl()]});


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={<h2>لطفا صبر کنید</h2>} persistor={persistor}>
            <Router>
                <StylesProvider jss={jss}>
                    <ThemeProvider theme={theme}>
                        <App/>
                    </ThemeProvider>
                </StylesProvider>
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './index.css';

import Routes from './router';
import reducer from './reducers';


let store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

const muiTheme = lightBaseTheme;
muiTheme.palette.primary1Color = '#ffcd50';
muiTheme.palette.accent1Color = '#3a465a';
muiTheme.palette.disabledColor = '#4d5d77';
muiTheme.palette.alternateTextColor = '#4d5d77';


ReactDOM.render((
    <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        <Provider store={store}>
            { Routes }
        </Provider>
    </MuiThemeProvider>
), document.getElementById('root'));

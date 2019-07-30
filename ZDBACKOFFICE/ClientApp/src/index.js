import React from 'react';
import { LocaleProvider } from 'antd';
import ReactDOM from 'react-dom';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from './App';
import * as serviceWorker from './serviceWorker';

import moment from 'moment';
import 'moment/locale/zh-cn';

import 'antd/dist/antd.css';
import './index.css';

import 'pace-js'
import 'pace-js/themes/blue/pace-theme-minimal.css'

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// const store = createStore();

const render = () => {
	ReactDOM.render(<LocaleProvider locale={zhCN}><App /></LocaleProvider>, document.getElementById('root'));
};

window.onload = () => {
	render();
};
moment.locale('zh-cn');

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

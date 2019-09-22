import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './services/worker/serviceWorker';

import './index.css';

import Main from './components/main-component/main-component';

ReactDOM.render(<Main />, document.getElementById('root'));
serviceWorker.unregister();

import React from 'react';
import ReactDom from 'react-dom';
import App from './pages/app';
import './index.less';


ReactDom.render(<App />, document.getElementById('root'));

if (module.hot) {
    module.hot.accept();
}

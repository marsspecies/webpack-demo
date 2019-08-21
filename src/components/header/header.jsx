import React from 'react';
import {HashRouter as Router, Link} from 'react-router-dom';
import './header.less';

const routeBtns = [
    {
        key: 'home',
        text: '首页',
        path: '/home'
    },
    {
        key: 'details',
        text: '详情',
        path: '/detail'
    }
];

export default class extends React.Component {
    render() {
        return <div className="header-wrapper">
            <Router>
                {
                    routeBtns.map(item => {
                        return <div className="menu-btn" key={item.key}>
                            <Link to={item.path}>{item.text}</Link>
                        </div>;
                    })
                }
            </Router>
        </div>;
    }
}

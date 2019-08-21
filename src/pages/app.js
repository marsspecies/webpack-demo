import React, {Component, Fragment} from 'react';
import {Route, Switch, HashRouter as Router, Redirect} from 'react-router-dom';
import Header from 'components/header/header';
import routes from 'routes/route';
import './app.less';

class App extends Component {
    async componentDidMount() {
        let data = await this.getData();
        console.log(data);
    }
    getData() {
        return new Promise((resolve, reject) => {
            resolve({msg: 'success'});
        });
    }
    render() {
        return (
            <Fragment>
                <Header></Header>
                <div className="container">
                    <Router>
                        <Switch>
                            {
                                routes.map(item => {
                                    return <Route {...item} />;
                                })
                            }
                        </Switch>
                    </Router>
                </div>
            </Fragment>
        );
    }
}
export default App;

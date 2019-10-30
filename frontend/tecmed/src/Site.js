import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import App from './App'

const Site = () => {
    return(
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact component={App}/>
                </Switch>
            </Router>

        </div>
    );

};


export default Site;
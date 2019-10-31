import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import Home from './components/Home'


const App = () => {
    return(
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/review/:id' exact component={Review}/>
                </Switch>
            </Router>

        </div>
    );

};


export default App;
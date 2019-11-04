import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import Home from './Pages/Home.js'
import Review from './Pages/Review.js'
import Quiz from './Pages/Quiz.js'
import Profile from './Components/profile'
import Landing from './Components/Landing'
import Login from './Components/Login'
import Register from './Components/Register'
import Navbar from './Components/Navbar'

const App = () => {
    return(
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/review/Quiz/' component={Quiz}/>
                    <Route path='/review/VideoId=:id&usr=:usr' exact component={Review}/>
                    <div className="App">
                        <Navbar/>
                        <Route exact path='/teste' component={Landing}/>
                        <div className="container">
                            <Route exact path='/teste/register' component={Register}/>
                            <Route exact path='/teste/login' component={Login}/>
                            <Route exact path='/teste/profile' component={Profile}/>
                        </div>
                    </div>
                    
                </Switch>
            </Router>

        </div>
    );

};


export default App;
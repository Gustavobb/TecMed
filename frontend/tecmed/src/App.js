import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import Home from './Pages/Home.js'

import Review from './Pages/Review.js'  
import QuizUser from './Pages/QuizUser.js'
import Profile from './Components/profile'
import Landing from './Components/Landing'
import Login from './Components/Login'
import RegisterDoctor from './Components/RegisterDoctor'
import RegisterUser from './Components/RegisterUser'
import Navbar from './Components/Navbar'
import History from './Components/History'
import Review2 from './Pages/Review2.js'

const App = () => {
    return(
        <Router history={History}  forceRefresh={true} >
        <div>
                <Navbar/>
                <Switch>
                    <Route path='/review/VideoId=:id&usr=:usr' exact component={Review}/>
                    <Route path='/quiz/id=:id' exact component={QuizUser}/>
                    <Route path='/review2/VideoId=:id&usr=:usr' exact component={Review2}/>
                    <Route exact path='/teste' component={Landing}/>
                    <Route path='/' exact component={Home}/>
                    <Route exact path='/registerDoctor' component={RegisterDoctor}/>
                    <Route exact path='/registerUser' component={RegisterUser}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/profile' component={Profile}/>
                </Switch>
        </div>
        </Router>
    );
};


export default App;
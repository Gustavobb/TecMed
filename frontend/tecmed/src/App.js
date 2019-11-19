import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import Home from './Pages/Home.js'

import Review from './Pages/Review.js'  
import QuizUser from './Pages/QuizUser.js'
import Profile from './Components/profile'
import Landing from './Components/Landing'
import Login from './Components/Login'
import Register from './Components/Register'
import Navbar from './Components/Navbar'
import Review2 from './Pages/Review2.js'
import UploadVideos from './Pages/UploadVideos'

const App = () => {
    return(
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/review/VideoId=:id&usr=:usr' exact component={Review}/>

                    <Route path='/test/:id' exact component={QuizUser}/>

                    <Route path='/review2/VideoId=:id&usr=:usr' exact component={Review2}/>

                    <Route path='/uploadVideos' component={UploadVideos}/>

                    <div className="App">
                        <Navbar/>
                        <Route exact path='/teste' component={Landing}/>
                        <div className="container">
                            <Route exact path='/register' component={Register}/>
                            <Route exact path='/login' component={Login}/>
                            <Route exact path='/profile' component={Profile}/>
                        </div>
                    </div>                                      
                </Switch>
            </Router>
        </div>
    );
};


export default App;
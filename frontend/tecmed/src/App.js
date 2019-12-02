import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import Home from './Pages/Home.js'

import Review from './Pages/Review.js'  
import QuizUser from './Pages/QuizUser.js'
import ProfileUser from './Components/ProfileUser'
import ProfileDoctor from './Components/ProfileDoctor'
import Landing from './Components/Landing'
import Login from './Components/Login'
import RegisterDoctor from './Components/RegisterDoctor'
import RegisterUser from './Components/RegisterUser'
import Navbar from './Components/Navbar'
import History from './Components/History'
import Review2 from './Pages/Review2.js'
import UploadVideos from './Pages/UploadVideos'
import ForgotPsw from './Components/ForgotPsw'
import ResetPsw from './Components/ResetPsw'
import HomeReview from './Pages/HomeReview'


const App = () => {
    return(
        
        <Router history={History}  forceRefresh={true} >
        <div>
                <Navbar/>
                <Switch>
                    <Route path='/quiz/id=:id' exact component={QuizUser}/>
                    <Route exact path='/teste' component={Landing}/>
                    <Route path='/' exact component={Home}/>
                    <Route exact path='/registerDoctor' component={RegisterDoctor}/>
                    <Route exact path='/registerUser' component={RegisterUser}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/forgot' component={ForgotPsw}/>
                    <Route exact path='/profileUser' component={ProfileUser}/>
                    <Route exact path='/profileDoctor' component={ProfileDoctor}/>
                    <Route path='/reset/' component={ResetPsw}/>
                    <Route path='/review/VideoId=:id&usr=:usr' exact component={Review}/>
                    <Route path='/review2/VideoId=:id&usr=:usr' exact component={Review2}/>
                    <Route path='/uploadVideos' component={UploadVideos}/>
                    <Route path='/unrevVids' component={HomeReview}/>

                </Switch>
        </div>
        </Router>
    );
};


export default App;
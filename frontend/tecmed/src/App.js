import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import Home from './Pages/Home.js'
import Review from './Pages/Review.js'

import Quiz from './Pages/Quiz.js'
import QuizUser from './Pages/QuizUser.js'

import Review2 from './Pages/Review2.js'


const App = () => {
    return(
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path='/review/VideoId=:id&usr=:usr' exact component={Review}/>

                    <Route path='/test/:id' exact component={QuizUser}/>

                    <Route path='/review2/VideoId=:id&usr=:usr' exact component={Review2}/>

                </Switch>
            </Router>

        </div>
    );

};


export default App;
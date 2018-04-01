import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import ListPage from './ListPage';
import Messages from './Messages';
import SignUpPage from './SignUpPage';
import LogInPage from './LogInPage';
import TripPage from './TripPage';

const App = (props: any) => {
    return (
        <div>
            <nav>
                <Link to="/signup">SignUp</Link>
                <Link to="/login">LogIn</Link>
            </nav>
            <div>
                <Route path="/signup" component={SignUpPage}/>
                <Route path="/login" component={LogInPage}/>
                <Route path="/search" component={Search}/>
                <Route path="/list" component={ListPage}/>
                <Route path="/messages" component={Messages}/>
                <Route path="/trip/:id" component={TripPage}/>
            </div>
            <nav>
                <Link to="/search">Search</Link>
                <Link to="/list">List</Link>
                <Link to="/messages">Messages</Link>
            </nav>            
        </div>
    )
}

export default App;
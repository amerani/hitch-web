import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import List from './List';
import Messages from './Messages';
import SignUpPage from './SignUpPage';
import LogInPage from './LogInPage';

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
                <Route path="/list" component={List}/>
                <Route path="/messages" component={Messages}/>
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
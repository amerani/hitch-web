import * as React from 'react';
import { Link, Route } from 'react-router-dom';
import Search from './Search';
import List from './List';
import Messages from './Messages';

const App = (props: any) => {
    return (
        <div>
            <nav>
                <Link to="/search">Search</Link>
                <Link to="/list">List</Link>
                <Link to="/messages">Messages</Link>
            </nav>
            <div>
                <Route path="/search" component={Search}/>
                <Route path="/list" component={List}/>
                <Route path="/messages" component={Messages}/>
            </div>
        </div>
    )
}

export default App;
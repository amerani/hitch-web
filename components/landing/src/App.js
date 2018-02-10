import React, { Component } from 'react';
import QuestionCard from './QuestionCard';
import map from './map.svg';
import calendar from './calendar.svg';
import rv from './rv.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="cards">
          <QuestionCard 
            question="Where are you going?"
            image={map}/>
          <QuestionCard 
            question="When are you leaving?"
            image={calendar}/>
          <QuestionCard 
            question="Have room for friends?"
            image={rv}/>            
        </div>
      </div>
    );
  }
}

export default App;

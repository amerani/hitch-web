import React, { Component } from 'react';
import QuestionCard from './QuestionCard';
import LocationCard from './LocationCard';
import LocationInput from './LocationInput';
import map from './map.svg';
import calendar from './calendar.svg';
import rv from './rv.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="main">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
        <div className="cards">
        <QuestionCard 
            question="Where are you going?"
            image={map}/>          
          <LocationInput />
          <LocationCard 
            question="Where are you going?"
            image={map}
            origin="Austin, TX"
            destination="New York, NY"/>
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

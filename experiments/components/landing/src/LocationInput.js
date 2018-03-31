import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import map from './map.svg';
import './LocationInput.css';

class LocationInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="locationInput">
                <img src={map}/>
                <p>Where are you going?</p>
                <div id="origin">
                    <TextField
                        label="Origin City"
                        type="search"
                    />
                </div>
                <div id="destination">
                    <TextField
                        label="Destination City"
                        type="search"
                        margin="normal"
                    />
                </div>
                <button className="mdc-fab material-icons">
                    <span className="mdc-fab__icon">
                        remove
                    </span>
                </button>  
            </div>
        );
    }
}

export default LocationInput;
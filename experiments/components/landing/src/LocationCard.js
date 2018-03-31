import React, {Component} from 'react';
import './LocationCard.css';

class LocationCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="locationCard">
                <img src={this.props.image} />
                <p>{this.props.question}</p>
                <button className="mdc-fab material-icons">
                    <span className="mdc-fab__icon">
                        add
                    </span>
                </button>                
                <div className="origin">
                    <span className="material-icons">
                        place
                    </span>
                    {this.props.origin}
                </div>
                <div className="destination">
                <span className="material-icons">
                        place
                    </span>
                    {this.props.destination}                
                </div>
            </div>
        );
    }
}

export default LocationCard;
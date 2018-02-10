import React, {Component} from 'react';
import './QuestionCard.css';

class QuestionCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="questionCard">
                <img src={this.props.image} />
                <p>{this.props.question}</p>
                <button className="mdc-fab material-icons">
                    <span className="mdc-fab__icon">
                        +
                    </span>
                </button>
            </div>
        );
    }
}

export default QuestionCard;
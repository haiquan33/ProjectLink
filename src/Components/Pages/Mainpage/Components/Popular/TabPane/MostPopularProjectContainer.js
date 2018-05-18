import React from 'react';
import './MostPopularProjectContainer.css';
class MostPopularProjectContainer extends React.Component {
    constructor() {
        super();
        this.state = { someKey: 'someValue' };
    }

    render() {
        return <div className="MostPopularProjectContainer">
            <img className="ProjectImage" src="https://futureoflife.org/wp-content/uploads/2017/12/2018-AI-safety-grants.jpg"   />
            <div class="Title">Bottom Left</div>
        </div>;
    }

    componentDidMount() {
        this.setState({ someKey: 'otherValue' });
    }
}

export default MostPopularProjectContainer;

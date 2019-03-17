import React from 'react';
import './MostPopularProjectContainer.css';
class MostPopularProjectContainer extends React.Component {
    constructor() {
        super();
        this.state = { someKey: 'someValue' };
    }

    render() {
        return <div className="MostPopularProjectContainer">
        
        </div>;
    }

    componentDidMount() {
        this.setState({ someKey: 'otherValue' });
    }
}

export default MostPopularProjectContainer;

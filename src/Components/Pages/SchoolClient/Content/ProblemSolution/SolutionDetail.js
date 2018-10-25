import React from 'react';
import './SolutionDetail.css';

class SolutionDetail extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (<div>
                
        </div>);
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default SolutionDetail;

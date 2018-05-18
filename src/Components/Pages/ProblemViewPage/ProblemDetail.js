import React from 'react';
import './ProblemDetail.css'


class ProblemDetail extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (<div className="problemDetail">
            <div className="problemName"> {this.props.problem.problemName}</div>
            <div className="problemDescription"> {this.props.problem.problemDescription}</div>
    </div>);
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default ProblemDetail;

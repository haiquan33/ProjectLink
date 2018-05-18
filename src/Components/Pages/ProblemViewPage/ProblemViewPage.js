import React from 'react';


import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
//Redux component
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {get_Problem} from '../../../Redux/service';

//other component
import ProblemDetail from './ProblemDetail';
import ProblemSolutionSubmit from './ProblemSolutionSubmit';

class ProblemViewPage extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (<div>
                {this.props.resultProblem?<ProblemDetail problem={this.props.resultProblem} />:null}
                
                <ProblemSolutionSubmit/>
        </div>);
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
    console.log(this.props.match.params.problemid);
    if (this.props.match.params.problemid){
        this.setState({problemid:this.props.match.params.problemid});
        this.props.get_Problem(this.props.match.params.problemid);
    }
 
  }
}

function mapState2Props(state) {
    return {
        resultProblem: state.problemReducer.resultProblem,
        userInfo: state.accountReducer.userInfo,
    };
  }
  
  const mapDispatchToProps = dispatch => {
    return bindActionCreators({
           get_Problem
    }, dispatch)
  
  }


export default withRouter(connect(mapState2Props,mapDispatchToProps)(ProblemViewPage));

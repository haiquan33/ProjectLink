import React from 'react';


import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
//Redux component
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { get_Problem, submit_solution, createNotification } from '../../../Redux/service';

//other component
import ProblemDetail from './ProblemDetail';
import ProblemSolutionSubmit from './ProblemSolutionSubmit';
import appConstant from '../../../Configs/constants.config';

class ProblemViewPage extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
    this.handle_submit_solution = this.handle_submit_solution.bind(this);
  }

  handle_submit_solution(solutionContent) {
    //solution content có tên của thằng gửi


    var solution = { content: solutionContent, ownerName: this.props.userInfo.displayName, ownerUID: this.props.userInfo.uid };

    this.props.submit_solution(this.props.userInfo.uid, this.state.problemid, solution)

    const noti = {
      content: 'Ban đã nhận được một giải pháp mẫu cho vấn đề ' + this.props.resultProblem.problemName
    }
    createNotification(this.props.resultProblem.owner.uid, noti, appConstant.RECEIVED_SOLUTION)

  }

  render() {
    return (<div>
      <ProblemDetail data={this.props.resultProblem} />

      <ProblemSolutionSubmit handle_submit_solution={this.handle_submit_solution} />
    </div>);
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
    console.log(this.props.match.params.problemid);
    if (this.props.match.params.problemid) {
      this.setState({ problemid: this.props.match.params.problemid });
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
    get_Problem,
    submit_solution
  }, dispatch)

}


export default withRouter(connect(mapState2Props, mapDispatchToProps)(ProblemViewPage));

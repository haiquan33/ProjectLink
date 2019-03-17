import React from 'react';

import { Input, Button, notification } from 'antd';
import './ProblemSolutionSubmit.css'

const { TextArea } = Input;




class ProblemSolutionSubmit extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue', solutionContent: "" };
    this.changeSolutionContent = this.changeSolutionContent.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeSolutionContent(e) {

    this.setState({ solutionContent: e.target.value });
  }



  submit() {
    if (this.state.solutionContent.trim().length<=0) return
    console.log(this.state.solutionContent.trim().length)
    const openSubmittedNotification = () => {
      notification.open({
        message: 'Giải pháp đã được gửi',
        description: 'Giải pháp của bạn đã được gửi cho bên yêu cầu đề tài xem xét. Bạn sẽ nhận được thông báo nếu giải pháp của bạn được chấp nhận',
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    };
    const submitSolution = this.state.solutionContent
   this.props.handle_submit_solution(submitSolution);
    this.setState({ solutionContent: ""})
    openSubmittedNotification()
  }
  render() {



    return (<div className="SolutionSubmit" >
      <TextArea placeholder="Miêu tả giải pháp của bạn" value={this.state.solutionContent} onChange={this.changeSolutionContent} rows={4} />
      <Button className="submit-solution-button" onClick={this.submit}>Gửi</Button>
    </div>);
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
} ``

export default ProblemSolutionSubmit;

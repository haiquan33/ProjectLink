import React from 'react';

import {Input,Button} from 'antd';

class ProblemSolutionSubmit extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' , solutionContent:""};
    this.changeSolutionContent=this.changeSolutionContent.bind(this);
    this.submit=this.submit.bind(this);
  }

  changeSolutionContent(e){
     
     this.setState({solutionContent:e.target.value});
  }

  submit(){

      this.props.handle_submit_solution(this.state.solutionContent);
  }
  render() {
    return (<div className="SolutionSubmit">
                <Input placeholder="Miêu tả giải pháp của bạn" value={this.state.solutionContent}  onChange={this.changeSolutionContent} />
                <Button onClick={this.submit}>Gửi</Button>
        </div>);
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}``

export default ProblemSolutionSubmit;

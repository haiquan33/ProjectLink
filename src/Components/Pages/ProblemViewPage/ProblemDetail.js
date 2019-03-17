import React from 'react';
import { Card, Avatar, Tag ,message} from 'antd';
import './ProblemDetail.css'

//Other  Lib
import { Collapse } from 'react-collapse';
import { withRouter } from 'react-router-dom';

let moment = require('moment')

class ProblemDetail extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    // return (<div className="problemDetail">
    //         <div className="problemName"> {this.props.problem.problemName}</div>
    //         <div className="problemDescription"> {this.props.problem.problemDescription}</div>
    // </div>);
    const { data } = this.props
    return (
      <div>
        {data ?
          <Card bordered={true} style={{ width: 300 }} hoverable={true} className="PostItem">
            <div className="PostMeta">
              <Avatar className="PostAva" size="large"
                src={data.owner.photoURL ? data.owner.photoURL : null}
                icon={data.owner.photoURL ? null : "user"} />
              <div className="UserName_Time">
                <p style={{ fontWeight: "bold" }}>{data.owner.displayName}</p>
                <p>{moment(data.timestamp).fromNow()}</p>
              </div>

            </div>
            <div className="PostContent">
              <Collapse isOpened={true} >
                <div className="Problem-Title" >
                  {data.problemName}
                </div>
              </Collapse>
              <Collapse isOpened={true}>
                <div className="Content">
                  {data.problemDescription}
                </div>
                <div className="problem-requirement-title">Yêu cầu</div>
                <div className="problem-requirement-content">{data.problemRequirement}</div>
              </Collapse>
            </div>
         
          </Card>
          :
          <Card bordered={true} style={{ width: 300 }} hoverable={true} className="PostItem" loading={true} />}
      </div>
    )
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default ProblemDetail;

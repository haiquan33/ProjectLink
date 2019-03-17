import React from 'react';
import { Avatar, Layout, List, Card, Tag, Icon, message } from 'antd';

import MostPopularProjectContainer from './MostPopularProjectContainer'
import { Collapse } from 'react-collapse';
import { withRouter, Link } from 'react-router-dom';



//Other  Lib

import './PopularTabPane.css'
import ProblemItem from './ProblemItem'
let moment = require('moment')
const { Sider, Content } = Layout;

class PopularTabPane extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  renderItem = (item) => {
    return (<Card bordered={true} style={{ width: 300 }} hoverable={true} className="PostItem" >
      <div className="PostMeta">
        <Avatar className="PostAva" size="large"
          src={item.owner.photoURL ? item.owner.photoURL : null}
          icon={item.owner.photoURL ? null : "user"} />
        <div className="UserName_Time">
          <p style={{ fontWeight: "bold" }}>{item.owner.displayName}</p>
          <p>{moment(item.timestamp).fromNow()}</p>
        </div>
        <div className="PostTags">

        </div>
      </div>
      <Link className="PostContent" to={"/problem/" + item.id} target="_blank">
        <Collapse isOpened={true} fixedHeight={60}>
          <div className="Title" >
            {item.problemName}
          </div>
        </Collapse>
        <Collapse isOpened={true} fixedHeight={100}>
          <div className="Content">
            {item.problemDescription}
          </div>
        </Collapse>
      </Link>
      <div className="PostInteract">

      </div>
    </Card>)
  }

  render() {
    return (
      <div className="PopularTabPane">
        <MostPopularProjectContainer />
        {this.props.data ? <List
          itemLayout="horizontal"
          dataSource={this.props.data}
          renderItem={item => (
            <ProblemItem data={item} />
          )} /> : null}





      </div>
    );
  }


}

export default PopularTabPane;

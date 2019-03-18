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


  render() {
    return (
      <div className="PopularTabPane">
        <MostPopularProjectContainer />
        {this.props.data ? <List
          itemLayout="horizontal"
          dataSource={this.props.data}
          renderItem={item => (
            <ProblemItem openUserInfoViewModal={this.props.openUserInfoViewModal} data={item} />
          )} /> : null}





      </div>
    );
  }


}

export default PopularTabPane;

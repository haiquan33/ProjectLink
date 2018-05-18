import React from 'react';
import { Avatar, Layout, List } from 'antd';

import MostPopularProjectContainer from './MostPopularProjectContainer'



//Other  Lib
import { Collapse } from 'react-collapse';

import './PopularTabPane.css'
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
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href={"/problem/"+item.id}>{item.problemName}</a>}
                description={<Collapse isOpened={true} fixedHeight={50}>

                  <div>{item.problemDescription}</div>
                </Collapse>}
              />
            </List.Item>
          )} /> : null}





      </div>
    );
  }


}

export default PopularTabPane;

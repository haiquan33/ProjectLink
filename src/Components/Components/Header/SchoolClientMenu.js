import React from 'react';
import { Image } from 'react-bootstrap';
import { Menu, Dropdown, Icon, Avatar, Aff } from 'antd';
import default_avatar from '../../../Assets/default_avatar.png';

export default class SchoolClientMenu extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    let avatar = this.props.userInfo.photoURL ? this.props.userInfo.photoURL : default_avatar;
    let menu = (
      <Menu>
        <Menu.Item key="0">
          <a >Thông tin tài khoản</a>
        </Menu.Item>
        <Menu.Item key="1">
          <a onClick={() => this.props.NavigateTo("schooldashboard")}>Dashboard</a>
        </Menu.Item>
        <Menu.Item key="2">
          <a >Thông báo</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3"> <a onClick={this.props.SignOutGG} >Đăng thoát</a></Menu.Item>
      </Menu>
    );
    return (

      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar className="AvatarMenu" size="large" src={avatar} />
      </Dropdown>
    )
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}










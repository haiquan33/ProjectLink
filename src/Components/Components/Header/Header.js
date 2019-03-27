import { Layout, Menu, Breadcrumb, Icon, Button, Dropdown } from 'antd';

import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import firebase_init, { auth, Authprovider } from '../../../firebase.js';

import './Header.css'


//other component
import SchoolClientMenu from './SchoolClientMenu';
import ProblemOwnerMenu from './ProblemOwnerMenu';

//Service
import { loginGG, checkLogged_and_Login_automatically, SignOutGG } from '../../../Redux/service';

//Redux component
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'

class Header extends Component {

  constructor(props) {
    /* ... */
    super(props);
    this.state = {

      user: null // <-- add this line
    }
    this.login = this.login.bind(this); // <-- add this line
    this.logout = this.logout.bind(this); // <-- add this line
    this.NavigateTo = this.NavigateTo.bind(this);
  }

  logout() {
    this.props.SignOutGG();
  };

  login() {

    this.props.loginGG();
    //back to home page
    //this.props.push('/');
  }
  componentDidMount() {
    this.props.checkLogged_and_Login_automatically();
  }

  // route to this path
  NavigateTo(path) {
    this.props.push('/' + path);
  }

  render() {
    let email = '';
    if (this.props.userInfo) {

      email = this.props.userInfo.email + "";
      console.log(email);
    }

    let notifyList = this.props.notificationList ?
      <Menu>
        {this.props.notificationList.map(noti =>
          <Menu.Item key={noti.id}>
            <a >{noti.notiData.content}</a>
          </Menu.Item>
        )

        }
      </Menu>
      : <Menu>
        <Menu.Item key='notiLoad'>
          <Icon type="loading" />
        </Menu.Item>
      </Menu>

    return (
      <Layout.Header>
        <a href="/"> PROJECTLINK</a>
        <div className="notifi-button">
          <Dropdown overlay={notifyList} trigger={['click']}>
            <Icon type="bell" />
          </Dropdown>
        </div>
        {
          this.props.userInfo ?
            //check whether render menu for school client or problem owner
            email.includes("edu.vn") || email.includes("apcs.vn") ? <SchoolClientMenu className="AvatarMenu" NavigateTo={this.NavigateTo} userInfo={this.props.userInfo} SignOutGG={this.props.SignOutGG} /> : <ProblemOwnerMenu openProblemOwnerNotificationModal={this.props.openProblemOwnerNotificationModal} className="AvatarMenu" NavigateTo={this.NavigateTo} userInfo={this.props.userInfo} SignOutGG={this.props.SignOutGG} />
            :
            <Button onClick={this.login} >SIGN IN</Button>
        }

      </Layout.Header>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    loginGG,
    checkLogged_and_Login_automatically,
    SignOutGG,
    push

  }, dispatch)

}

export default connect(null, mapDispatchToProps)(Header);

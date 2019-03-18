import React, { Component } from 'react';
import logo from './logo.svg';

import Mainpage from './Components/Pages/Mainpage/Mainpage'
import Header from './Components/Components/Header/Header'
import './App.css';

import { Layout, Menu, Breadcrumb, Modal, Button, Spin } from 'antd';


import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { getUserCompanyInfoForViewing } from './Redux/service'

//other components
import DashboardContainer from './Components/Pages/ProblemOwner/Dashboard/DashboardContainer'
import SchoolDashboardContainer from './Components/Pages/SchoolClient/DashboardContainer'
import ProblemViewPage from './Components/Pages/ProblemViewPage/ProblemViewPage';
import NotificationModal from './Components/Pages/ProblemOwner/NotificationModal/NotificationModal'
import { UserInfoViewModal } from './Components/Components/Common/UserInfoViewModal'
//import ContractSignPage from './Components/Pages/ContractSignPage/ContractSignPage'

//Redux component
import { connect } from 'react-redux'







class App extends Component {
  constructor(props) {
    super(props)
    this.state = { ProblemOwnerNotificationModalVisible: false, userInfoViewModalVisible: false, viewingInfo: null, loadingInfo: true }
    this.openProblemOwnerNotificationModal = this.openProblemOwnerNotificationModal.bind(this)
  }

  openProblemOwnerNotificationModal() {
    this.setState({ ProblemOwnerNotificationModalVisible: true })
  }
  handleProblemOwnerModalOk = (e) => {

    this.setState({
      ProblemOwnerNotificationModalVisible: false,
    });
  }

  openUserInfoViewModal = (userId) => {

    this.setState({ loadingInfo: true, userInfoViewModalVisible: true })
    getUserCompanyInfoForViewing(userId, (info) => this.setState({ loadingInfo: false, viewingInfo: info }))
  }

  handleUserInfoViewModalOK = (e) => {
    this.setState({
      userInfoViewModalVisible: false,
      loadingInfo: true
    })
  }

  render() {

    return (
      <div className="App">
        <Modal
          title="Notification"
          visible={this.state.ProblemOwnerNotificationModalVisible}
          footer={<Button onClick={this.handleProblemOwnerModalOk}>OK</Button>}


        >
          <NotificationModal />
        </Modal>
        <Modal
          title="Thông tin"
          visible={this.state.userInfoViewModalVisible}
          footer={<Button onClick={this.handleUserInfoViewModalOK}>OK</Button>}


        >
          {this.state.loadingInfo ? <Spin /> :
            <UserInfoViewModal info={this.state.viewingInfo} />}
        </Modal>

        <Layout>

          <Header userInfo={this.props.userInfo} openProblemOwnerNotificationModal={this.openProblemOwnerNotificationModal} />
          <Layout.Content>

            <Switch>
              <Route exact path='/' render={routeProps => <Mainpage openUserInfoViewModal={this.openUserInfoViewModal} />} />
              <Route path='/dashboard' component={DashboardContainer} />
              <Route path='/schooldashboard' component={SchoolDashboardContainer} />
              <Route path='/problem/:problemid' component={ProblemViewPage} />

              <Redirect to="/404" />
            </Switch>
          </Layout.Content>
        </Layout>
      </div>
    );
  }
}

function mapState2Props(state) {
  return {
    userInfo: state.accountReducer.userInfo,


  };
}

export default withRouter(connect(mapState2Props)(App));
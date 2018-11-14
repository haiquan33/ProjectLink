import React, { Component } from 'react';
import logo from './logo.svg';

import Mainpage from './Components/Pages/Mainpage/Mainpage'
import Header from './Components/Components/Header/Header'
import './App.css';

import { Layout, Menu, Breadcrumb ,Modal,Button} from 'antd';


import { withRouter, Route, Switch, Redirect } from 'react-router-dom';


//other components
import DashboardContainer from './Components/Pages/ProblemOwner/Dashboard/DashboardContainer'
import  SchoolDashboardContainer from './Components/Pages/SchoolClient/DashboardContainer'
import ProblemViewPage from './Components/Pages/ProblemViewPage/ProblemViewPage';
import NotificationModal from './Components/Pages/ProblemOwner/NotificationModal/NotificationModal'
//import ContractSignPage from './Components/Pages/ContractSignPage/ContractSignPage'

//Redux component
import { connect } from 'react-redux'







class App extends Component {
  constructor(props) {
    super(props)
    this.state={ProblemOwnerNotificationModalVisible:false}
    this.openProblemOwnerNotificationModal=this.openProblemOwnerNotificationModal.bind(this)
  }

  openProblemOwnerNotificationModal(){
      this.setState({ProblemOwnerNotificationModalVisible:true})
  }
  handleProblemOwnerModalOk = (e) => {
 
    this.setState({
      ProblemOwnerNotificationModalVisible: false,
    });
  }

  render() {

    return (
      <div className="App">
      <Modal
          title="Notification"
          visible={this.state.ProblemOwnerNotificationModalVisible}
         footer={<Button onClick={this.handleProblemOwnerModalOk}>OK</Button>}
        
         
        >
          <NotificationModal/>
        </Modal>
        <Layout>
          
          <Header userInfo={this.props.userInfo} openProblemOwnerNotificationModal={this.openProblemOwnerNotificationModal}/>
          <Layout.Content>
            
            <Switch>
              <Route exact path='/' component={Mainpage} />
              <Route path='/dashboard' component={DashboardContainer} />
              <Route path='/schooldashboard' component={SchoolDashboardContainer}/>
              <Route path='/problem/:problemid' component={ProblemViewPage}/>

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
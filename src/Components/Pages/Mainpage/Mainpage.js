import React, { Component } from 'react';
import { Divider } from 'antd';

import PopularProject from './Components/Popular/PopularProject';
import NewProjectContainer from './Components/New/NewProjectContainer';


import { withRouter, Route, Switch, Redirect } from 'react-router-dom';

//Redux component
import {get_All_Problem_List,add_new_problem} from '../../../Redux/service';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import './Mainpage.css';



class Mainpage extends Component {
  constructor(props) {
    super(props)


  }

  componentDidMount(){
    this.props.get_All_Problem_List();
    
  }

  render() {
    return (
      <div className="Mainpage">
     
        <PopularProject resultProblemList={this.props.resultProblemList}/>
        
       

      </div>
    );
  }
}



function mapState2Props(state) {
  return {
      resultProblemList: state.problemReducer.resultProblemList,
      userInfo: state.accountReducer.userInfo,
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
          get_All_Problem_List,
          add_new_problem
  }, dispatch)

}


export default withRouter(connect(mapState2Props,mapDispatchToProps)(Mainpage));
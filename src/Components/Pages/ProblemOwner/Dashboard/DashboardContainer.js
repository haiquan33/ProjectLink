import React, { Component } from 'react';
import './DashboardContainer.css'



//Ant
import { Layout, Icon } from 'antd';


import { Route, Link,Switch } from 'react-router-dom'

//Redux component
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import {withRouter} from 'react-router-dom';
//Custom Component
import SideMenu from './SideMenu/SideMenu';
import MyHeader from './Header/MyHeader';
import ProblemListContainer from './Content/Job/ProblemListContainer';




//Assets
//import logo_only from '../../Assets/logo_only.png'
//    <img alt="logo" src={logo_only} className="SideMenuLogo"/>

const { Header, Footer, Sider, Content } = Layout;

class DashboardContainer extends Component {
    constructor(props){
        super(props);
        this.navigateTo=this.navigateTo.bind(this);
        this.toggleSiderCollapsed=this.toggleSiderCollapsed.bind(this);
        this.state={siderFold:false,siderCollapsed:false }
    }

    navigateTo(path){
        this.props.push('/'+path);
    }

    toggleSiderCollapsed(){
        this.setState({siderCollapsed:!this.state.siderCollapsed});
    }

    render() {
       // console.log(this.props.match.path);
        return (


            <Layout style={{ height: '100vh' , width:'100vw'}}>
            
                <Sider  collapsed={this.state.siderCollapsed} width={300}>
                    <div className="SideMenuLogoContainer" onClick={()=>{this.navigateTo("")}}>
                    
                        {this.state.siderCollapsed? '' : <span>ProjectLink</span>}
                    </div>
                    <SideMenu navigateTo={this.navigateTo} {...this.props} className="SideMenu" />
                </Sider>
                <Layout >
                    <Header ><MyHeader siderCollapsed={this.state.siderCollapsed} toggleSiderCollapsed={this.toggleSiderCollapsed} /></Header>
                    <Content> 
                        <Switch> 
                           
                            <Route exact path={`${this.props.match.url}/postedjobs/:postedType`} component={ProblemListContainer} />
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>

                </Layout>
            </Layout>


        )
    }
}


function mapState2Props(state) {
    return {
      
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        push

    }, dispatch)

}


export default  withRouter(connect(mapState2Props, mapDispatchToProps)(DashboardContainer));

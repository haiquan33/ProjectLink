import React, { Component } from 'react';
import './DashboardContainer.css'



//Ant
import { Layout, Icon, Spin } from 'antd';


import { Route, Link, Switch } from 'react-router-dom'

//Redux component
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux'
import { withRouter } from 'react-router-dom';
//Custom Component
import SideMenu from './SideMenu/SideMenu';
import MyHeader from './Header/MyHeader';
import ProblemListContainer from './Content/Job/ProblemListContainer';
import ProblemSolutionContainer from './Content/ProblemSolution/ProblemSolutionContainer';
import { WrappedClientInfoPageForm } from './Content/ClientInfoPage/ClientInfoPage'


//Redux
import { get_solution_list, submit_contract, addWalletAddress, getUserWalletAdress,getUserCompanyInfo,saveUserCompanyInfo } from '../../../../Redux/service';


//Assets
//import logo_only from '../../Assets/logo_only.png'
//    <img alt="logo" src={logo_only} className="SideMenuLogo"/>

const { Header, Footer, Sider, Content } = Layout;

class DashboardContainer extends Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
        this.toggleSiderCollapsed = this.toggleSiderCollapsed.bind(this);
        this.navigateToSolutionList = this.navigateToSolutionList.bind(this);
        this.state = { siderFold: false, siderCollapsed: false }
    }

    navigateTo(path) {
        this.props.push('/' + path);
    }

    navigateToSolutionList(problemID) {
        // console.log(this.props.match.url);
        this.props.push('/' + this.props.match.url + "/" + problemID + "/solutions/")
    }

    toggleSiderCollapsed() {
        this.setState({ siderCollapsed: !this.state.siderCollapsed });
    }

    componentDidMount() {
               
    }
    render() {
        // console.log(this.props.match.path);



        return (


            <Layout style={{ height: '100vh', width: '100vw' }}>

                <Sider collapsed={this.state.siderCollapsed} width={300}>
                    <div className="SideMenuLogoContainer" onClick={() => { this.navigateTo("") }}>

                        {this.state.siderCollapsed ? '' : <span>ProjectLink</span>}
                    </div>
                    <SideMenu navigateTo={this.navigateTo} {...this.props} className="SideMenu" />
                </Sider>
                <Layout >
                    <Header ><MyHeader siderCollapsed={this.state.siderCollapsed} toggleSiderCollapsed={this.toggleSiderCollapsed} /></Header>
                    <Content>
                        {this.props.userInfo ?
                            <Switch>

                                <Route exact path={`${this.props.match.url}/postedjobs/:postedType`} render={routeProps => <ProblemListContainer {...routeProps} />} />
                                <Route exact path={`${this.props.match.url}/postedjobs/all/:problemID/solutions/`} render={routeProps => <ProblemSolutionContainer userInfo={this.props.userInfo} submit_contract={this.props.submit_contract} resultSolutionList={this.props.resultSolutionList} get_solution_list={this.props.get_solution_list} {...routeProps} />} />
                                <Route exact path={`${this.props.match.url}/cv`} render={routeProps => <WrappedClientInfoPageForm saveUserCompanyInfo={this.props.saveUserCompanyInfo} userCompanyInfo={this.props.userCompanyInfo} userInfo={this.props.userInfo} {...routeProps} />} />

                            </Switch> : <Spin />}

                    </Content>
                    <Footer>Footer</Footer>

                </Layout>
            </Layout>


        )
    }
}


function mapState2Props(state) {
    return {
        userInfo: state.accountReducer.userInfo,
        userCompanyInfo:state.accountReducer.userCompanyInfo,
        resultSolutionList: state.solutionReducer.resultSolutionList
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        push,
        get_solution_list,
        submit_contract,
        addWalletAddress,
        getUserWalletAdress,
        getUserCompanyInfo,
        saveUserCompanyInfo

    }, dispatch)

}


export default withRouter(connect(mapState2Props, mapDispatchToProps)(DashboardContainer));

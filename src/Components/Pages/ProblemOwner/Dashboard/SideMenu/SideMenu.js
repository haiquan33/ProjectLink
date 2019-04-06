import React, { Component } from 'react';
//Ant
import { Menu, Icon } from 'antd';


import { Route, Link } from 'react-router-dom'


import './SideMenu.css'

const SubMenu = Menu.SubMenu;


export default class SideMenu extends Component {
    
    render() {
        
        return (
            <Menu mode="inline" defaultSelectedKeys={['postedJob']} >
                <SubMenu  key="postedJob" title={<Link to={`${this.props.match.url}/postedjobs/all`}><Icon type="form" /><span className="nav-text">Các vấn đề đã đăng</span></Link>}>
                    <Menu.Item key="recruitingJob" >
                        <span className="nav-text"><Link to={`${this.props.match.url}/postedjobs/pending`}>Các vấn đề đang chờ</Link></span>
                    </Menu.Item>
                    <Menu.Item key="finishRecruitedJob">
                        <span className="nav-text"><Link to={`${this.props.match.url}/postedjobs/completed`}>Công việc đã xong</Link></span>

                    </Menu.Item>
                </SubMenu>
               
                {/* <Menu.Item key="employeeProfile">
                    <Icon type="idcard" />
                    <span className="nav-text"><Link  action="replace" to={`${this.props.match.url}/cv`}>Hồ sơ nhà tuyển dụng</Link></span>
                </Menu.Item> */}
                <Menu.Item key="companyProfile">
                    <Icon type="home" />
                    <span className="nav-text"><Link to={`${this.props.match.url}/cv`}>Thông tin công ty</Link></span>
                </Menu.Item>

            </Menu>
        )
    }
}
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
                <SubMenu  key="postedJob" title={<Link to={`${this.props.match.url}/receivedcontracts/all`}><Icon type="form" /><span className="nav-text">Các hợp đồng khả dụng</span></Link>}>
                    <Menu.Item key="recruitingJob" >
                        <span className="nav-text"><Link to={`${this.props.match.url}/receivedcontracts/waiting`}>Các hợp đồng đang đợi</Link></span>
                    </Menu.Item>
                    <Menu.Item key="finishRecruitedJob">
                        <span className="nav-text"><Link to={`${this.props.match.url}/receivedcontracts/accepted`}>Hợp đồng đang thực thi</Link></span>

                    </Menu.Item>
                </SubMenu>
               
                {/* <Menu.Item key="employeeProfile">
                    <Icon type="idcard" />
                    <span className="nav-text"><Link  action="replace" to={`${this.props.match.url}/cv`}>Hồ sơ cán bộ</Link></span>
                </Menu.Item> */}
                <Menu.Item key="companyProfile">
                    <Icon type="home" />
                    <span className="nav-text"><Link to={`${this.props.match.url}/cv`}>Thông tin trường/cơ quan</Link></span>
                </Menu.Item>

            </Menu>
        )
    }
}
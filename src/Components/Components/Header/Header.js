import { Layout, Menu, Breadcrumb, Icon,Button } from 'antd';

import React, { Component } from 'react';

import './Header.css'


class Header extends Component {
 
  
    render() {
      return (
        <Layout.Header>
                    PROJECTLINK
                    <Icon type="search" />
                    <Button>SIGN IN</Button>
        </Layout.Header>
      );
    }
  }
  
export default Header;
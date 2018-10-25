import React, { Component } from 'react';
import './MyHeader.css';

import {Button,Icon} from 'antd';


export default class MyHeader extends Component {
    render() {
        return (
            <div className="MyHeader">
                <Button type="primary" onClick={this.props.toggleSiderCollapsed} style={{ marginBottom: 16 }}>
                    <Icon type={this.props.siderCollapsed ? 'menu-unfold' : 'menu-fold'} />
                </Button>
            </div>
        )
    }
}
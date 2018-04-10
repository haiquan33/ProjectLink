import React, { Component } from 'react';
import { Tabs } from 'antd';


import './PopularProject.css';
const TabPane = Tabs.TabPane;

class PopularProject extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        return (
            <div >
                <Tabs defaultActiveKey="ALL" >
                    <TabPane tab="ALL" key="ALL">Content of Tab Pane 1</TabPane>
                    <TabPane tab="IT" key="IT">Content of Tab Pane 2</TabPane>
                    <TabPane tab="PHYSICS" key="PHYSICS">Content of Tab Pane 3</TabPane>
                    <TabPane tab="MATH" key="MATH">Content of Tab Pane 4</TabPane>
                    <TabPane tab="BIOLOGY" key="BIOLOGY">Content of Tab Pane 4</TabPane>
                    <TabPane tab="ENVIROMENT" key="ENVIROMENT">Content of Tab Pane 5</TabPane>
                    <TabPane tab="OTHERS" key="OTHERS">Content of Tab Pane 5</TabPane>
                </Tabs>
            </div>
        );
    }
}

export default PopularProject;
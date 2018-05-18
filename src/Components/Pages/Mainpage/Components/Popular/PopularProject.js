import React, { Component } from 'react';
import { Tabs } from 'antd';

import PopularTabPane from './TabPane/PopularTabPane'

import './PopularProject.css';
const TabPane = Tabs.TabPane;

class PopularProject extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        const data = [
            {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            },
            {
                title: 'Ant Design Title 4',
            },
        ];

        return (
            <div >
                <Tabs defaultActiveKey="ALL" >
                    <TabPane tab="ALL" key="ALL"><PopularTabPane faculty="ALL"  data={this.props.resultProblemList} /> </TabPane>
                    <TabPane tab="IT" key="IT"><PopularTabPane faculty="IT" data={this.props.resultProblemList} /></TabPane>
                    <TabPane tab="PHYSICS" key="PHYSICS"><PopularTabPane faculty="PHYSICS" data={this.props.resultProblemList} /></TabPane>
                    <TabPane tab="MATH" key="MATH"><PopularTabPane faculty="MATH" data={this.props.resultProblemList} /></TabPane>
                    <TabPane tab="BIOLOGY" key="BIOLOGY"><PopularTabPane faculty="BIOLOGY" data={this.props.resultProblemList}/></TabPane>
                    <TabPane tab="ENVIROMENT" key="ENVIROMENT"><PopularTabPane faculty="ENVIROMENT" data={this.props.resultProblemList} /></TabPane>
                    <TabPane tab="OTHERS" key="OTHERS"><PopularTabPane faculty="OTHERS" data={this.props.resultProblemList} /></TabPane>
                </Tabs>
            </div>
        );
    }
}

export default PopularProject;
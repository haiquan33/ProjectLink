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
        const categoryData = {}
        if (this.props.resultProblemList)
            this.props.resultProblemList.map(item => {
                if (categoryData[item.subject])
                    categoryData[item.subject].push(item)
                else {
                    categoryData[item.subject] = new Array()
                    categoryData[item.subject].push(item)
                }
            })
        console.log(categoryData)
        return (

            < div >
                <Tabs defaultActiveKey="ALL" >
                    <TabPane tab="ALL" key="ALL"><PopularTabPane openUserInfoViewModal={this.props.openUserInfoViewModal} faculty="ALL" data={this.props.resultProblemList} /> </TabPane>
                    <TabPane tab="IT" key="IT"><PopularTabPane openUserInfoViewModal={this.props.openUserInfoViewModal} faculty="IT" data={categoryData['IT']} /></TabPane>
                    <TabPane tab="PHYSICS" key="PHYSICS"><PopularTabPane openUserInfoViewModal={this.props.openUserInfoViewModal} faculty="PHYSICS" data={categoryData['PHYSICS']} /></TabPane>
                    <TabPane tab="MATH" key="MATH"><PopularTabPane openUserInfoViewModal={this.props.openUserInfoViewModal} faculty="MATH" data={categoryData['MATH']} /></TabPane>
                    <TabPane tab="BIOLOGY" key="BIOLOGY"><PopularTabPane openUserInfoViewModal={this.props.openUserInfoViewModal} faculty="BIOLOGY" data={categoryData['BIOLOGY']} /></TabPane>
                    <TabPane tab="ENVIROMENT" key="ENVIROMENT"><PopularTabPane openUserInfoViewModal={this.props.openUserInfoViewModal} faculty="ENVIROMENT" data={categoryData['ENVIROMENT']} /></TabPane>
                    <TabPane tab="OTHERS" key="OTHERS"><PopularTabPane openUserInfoViewModal={this.props.openUserInfoViewModal} faculty="OTHERS" data={categoryData['OTHERS']} /></TabPane>
                </Tabs>
            </div >
        );
    }
}

export default PopularProject;
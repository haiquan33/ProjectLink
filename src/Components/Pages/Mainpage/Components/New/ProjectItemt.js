import React, { Component } from 'react';
import { Tabs,Card } from 'antd';


import './ProjectItem.css'


class ProjectItem extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        return (
            <div >
                <Card
                    style={{width:100,margin:'10px' }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                   
                >
                    <Card.Meta
                      
                        title="Card title"
                        description="This is the description"
                    />
                </Card>
                
            </div>
        );
    }
}

export default ProjectItem;
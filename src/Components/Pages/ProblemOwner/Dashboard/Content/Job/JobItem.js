import React, { Component } from 'react';
import './JobItem.css'



//Ant
import { Card, Icon, Row, Menu, Dropdown } from 'antd';

//Other  Lib
import { Collapse } from 'react-collapse';
import { Col } from 'antd/lib/grid';
import moment from 'moment';
const { Meta } = Card;

export default class JobItem extends Component {
    render() {
        const menu = (
            <Menu >
                
                <Menu.Item key="2"><Icon type="solution" /> Các giải pháp đã nhận cho vị trí này</Menu.Item>
                <Menu.Item key="3"><Icon type="delete" /> Xoá</Menu.Item>
            </Menu>
        );
        return (
            <Card hoverable
                title={<span>{this.props.data.problemName}</span>}
                bordered={false}

                actions={[<Icon className="to-top-button" type="to-top" />,
                <Icon type="edit" />,
                <Dropdown overlay={menu}
                    trigger={['click']}
                >

                    <Icon type="ellipsis" />

                </Dropdown>]}
            >
                
                <Row>
                    <Meta


                        description={<Collapse isOpened={true} fixedHeight={80}>

                            <div>{this.props.data.problemDescription}</div>
                        </Collapse>}
                    />
                </Row>
            </Card>
        )
    }

}


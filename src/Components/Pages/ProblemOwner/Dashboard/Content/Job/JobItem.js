import React, { Component } from 'react';
import './JobItem.css'



//Ant
import { Card, Icon, Row, Menu, Dropdown } from 'antd';

//Other  Lib
import { Collapse } from 'react-collapse';
import { Col } from 'antd/lib/grid';
import moment from 'moment';
import { Route, Link } from 'react-router-dom'
const { Meta } = Card;




export default class JobItem extends Component {

    constructor(props){
        super(props);
        this.openProblemLink=this.openProblemLink.bind(this);
        this.handleMenuItemClick=this.handleMenuItemClick.bind(this);
    }

    openProblemLink(){
            window.open("http://localhost:3000/problem/"+this.props.data.id)
    }

    handleMenuItemClick(e){
    
    }

    render() {
        const menu = (
            <Menu   onClick={this.handleMenuItemClick}>
                
                <Menu.Item key="solution"><Icon type="solution" /> <Link to={`${this.props.match.url}/`+this.props.data.id+'/solutions'}>Các giải pháp đã nhận cho vị trí này</Link> </Menu.Item>
                <Menu.Item key="delete"><Icon type="delete" /> Xoá</Menu.Item>
            </Menu>
        );
        return (
            <Card hoverable
                title={<span onClick={this.openProblemLink} >{this.props.data.problemName}</span>}
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


import React, { Component } from 'react';
import './ContractItem.css'

import ContractConfirmModal from './ContractConfirmModal/ContractConfirmModal'

//Ant
import { Card, Icon, Row, Menu, Dropdown ,Modal} from 'antd';

//Other  Lib
import { Collapse } from 'react-collapse';
import { Col } from 'antd/lib/grid';
import moment from 'moment';
import { Route, Link } from 'react-router-dom'
const { Meta } = Card;




export default class ContractItem extends Component {

    constructor(props) {
        super(props);
        this.state={showContractConfirmModal:false}
        this.openProblemLink = this.openProblemLink.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.closeContractConfirmModal=this.closeContractConfirmModal.bind(this)
    }

    openProblemLink() {
        window.open("http://localhost:3000/problem/" + this.props.data.id)
    }

    handleMenuItemClick(e) {
        if (e.key === "viewContract") {
            this.setState({ showContractConfirmModal: true })
        }
    }
    closeContractConfirmModal(){
        this.setState({showContractConfirmModal:false})
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuItemClick}>

                <Menu.Item key="viewContract"><Icon type="solution" /> Xem hợp đồng</Menu.Item>
                <Menu.Item key="delete"><Icon type="delete" /> Xoá</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Modal
                    visible={this.state.showContractConfirmModal}
                    title="Gừi hợp đồng"
                    footer={null}
                >
                    <ContractConfirmModal submit_contract_confirmation={this.props.submit_contract_confirmation} data={this.props.data} closeContractConfirmModal={this.closeContractConfirmModal}/>
                </Modal>
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
            </div>
        )
    }

}


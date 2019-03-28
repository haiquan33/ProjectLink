import React, { Component } from 'react';
import './ContractItem.css'

import ContractConfirmModal from './ContractConfirmModal/ContractConfirmModal'

//Ant
import { Card, Icon, Row, Menu, Dropdown, Modal, Spin, Alert } from 'antd';

//Other  Lib
import { Collapse } from 'react-collapse';
import { Col } from 'antd/lib/grid';
import moment from 'moment';
import { Route, Link } from 'react-router-dom'
import { getContractByProblemID } from '../../../../../Redux/service';
const { Meta } = Card;




export default class ContractItem extends Component {

    constructor(props) {
        super(props);
        this.state = { showContractConfirmModal: false, showLoadingContract: true, contractData: null }
        this.openProblemLink = this.openProblemLink.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.closeContractConfirmModal = this.closeContractConfirmModal.bind(this)
    }

    openProblemLink() {
        window.open("http://localhost:3000/problem/" + this.props.data.id)
    }

    handleMenuItemClick(e) {
        if (e.key === "viewContract") {
            this.setState({ showContractConfirmModal: true, showLoadingContract: true })
            const afterAction = {
                onSuccess: (data) => { this.setState({ showLoadingContract: false, contractData: data }) },
                onFail: () => console.log('fail')
            }
            getContractByProblemID(this.props.data.id, afterAction)
        }
    }
    closeContractConfirmModal() {
        this.setState({ showContractConfirmModal: false })
    }

    render() {
        console.log(this.props.data)
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
                    width='60vw'
                >
                    {this.state.showLoadingContract ? <Spin tip="Loading...">
                       
                    </Spin>
                        : <ContractConfirmModal submit_contract_confirmation={this.props.submit_contract_confirmation} data={this.state.contractData} closeContractConfirmModal={this.closeContractConfirmModal} />}

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


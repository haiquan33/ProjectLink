import React, { Component } from 'react';
import './SolutionItem.css'



//Ant
import { Card, Icon, Row, Menu, Dropdown, Modal } from 'antd';

//Other  Lib
import { Collapse } from 'react-collapse';
import ContracSubmitModal from "./ContractSubmitModal/ContracSubmitModal"
import { Col } from 'antd/lib/grid';
import moment from 'moment';
import { Route, Link } from 'react-router-dom'
const { Meta } = Card;




export default class SolutionItem extends Component {

    constructor(props) {
        super(props);
        this.openProblemLink = this.openProblemLink.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
        this.showSolutionDetailModal = this.showSolutionDetailModal.bind(this);
        this.closeContractSubmitModal=this.closeContractSubmitModal.bind(this)
        this.state = { showContractSubmitModal: false }
    }

    openProblemLink() {
        window.open("http://localhost:3000/problem/" + this.props.data.id)
    }

    handleMenuItemClick(e) {
        if (e.key === "solutionAccepted") {
            this.setState({ showContractSubmitModal: true })
        }
    }

    showSolutionDetailModal() {
        this.props.showSolutionDetailModal(this.props.data.solution.ownerName, this.props.data.solution.content);
    }

    closeContractSubmitModal(){
        this.setState({showContractSubmitModal:false})
    }

    render() {
        const menu = (
            <Menu onClick={this.handleMenuItemClick}>

                <Menu.Item key="solutionAccepted"><Icon type="solution" /> Chấp nhận giải pháp này </Menu.Item>
                <Menu.Item key="delete"><Icon type="delete" /> Xoá</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Modal
                    visible={this.state.showContractSubmitModal}
                    title="Gừi hợp đồng"
                  
                    onCancel={this.closeContractSubmitModal}>
                        <ContracSubmitModal/>
                    </Modal>
                <Card hoverable
                    title={<span onClick={this.showSolutionDetailModal} >{this.props.data.solution.ownerName}</span>}
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

                            <div>{this.props.data.solution.content}</div>
                        </Collapse>}
                    />
                </Row>
                </Card>
            </div >
        )
    }

}


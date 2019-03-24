import React, { Component } from 'react';
import './JobItem.css'



//Ant
import { Card, Icon, Row, Menu, Dropdown, Button, DatePicker, Select, Modal, notification } from 'antd';

//Other  Lib
import { Collapse } from 'react-collapse';
import { Col } from 'antd/lib/grid';
import moment from 'moment';
import { Route, Link } from 'react-router-dom'
import { getContractByProblemID, payContract } from '../../../../../../Redux/service';
import web3 from '../../../../../../BlockChainAPI/web3';
import { tokenAPI } from '../../../../../../BlockChainAPI/tokenAPI';
const { Meta } = Card;
const Option = Select.Option;



export default class JobItem extends Component {

    constructor(props) {
        super(props);
        this.state = { showContractDetailModal: false }

        this.openProblemLink = this.openProblemLink.bind(this);
        this.handleMenuItemClick = this.handleMenuItemClick.bind(this);

    }

    openProblemLink() {
        window.open("http://localhost:3000/problem/" + this.props.data.id)
    }

    handleMenuItemClick(e) {
        if (e.key === "viewContract") {


            const afterAction = {
                onSuccess: (data) => this.setState({ showContractDetailModal: true, contractData: data }),
                onFail: () => console.log('contract not found')
            }

            getContractByProblemID(this.props.data.id, afterAction)
        }
    }

    componentDidMount() {

        let accountList = web3.eth.accounts;
        this.setState({ walletList: accountList, defaultWallet: accountList[0] });

    }

    handleWalletChange = (value) => {
        this.setState({ defaultWallet: value }, () => {
            web3.eth.defaultAccount = this.state.defaultWallet
        })
    }
    closeContractViewModal = () => {
        this.setState({ showContractDetailModal: false })
    }


    openNotification = (content) => {
        notification.open({
            message: 'Thông báo',
            description: content,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    }

    activePayContract = (problemID, order) => {
        const afterAction = {
            onSuccess: () => this.openNotification('Đã thanh toán thành công'),
            onFail: (errLog) => this.openNotification(errLog)

        }
        payContract(problemID, order, afterAction)
    }


    activeDeadline = (problemID, order, token) => {
        let balance = parseInt(tokenAPI.myBalance());


        if (balance < token) {

            this.openNotification("Không đủ số dư thực hiện!  Số dư hiện tại: " + balance)
            return;
        }
        tokenAPI.lockBalance(this.state.firstPaidToken, { gas: 3000000 }, (err, success) => {
            if (!err) {
                this.openNotification('Đã gửi yêu cầu bắt đầu giai đoạn ', order)
                
            }
            else {
                this.openNotification('Có lỗi đã xảy ra, vui lòng thử lại', err)
            }

        })

    }

    renderContractDetailModal = () => {
        const { contractData } = this.state
        if (!contractData) return null
        let walletSelect = [];
        if (this.state.walletList) {
            for (var wallet in this.state.walletList) {
                walletSelect.push(<Option value={this.state.walletList[wallet]}>{this.state.walletList[wallet]}</Option>)
            }
        }
        return (<div className="ContractSubmitModal">


            {this.state.walletList ?
                <Select defaultValue={this.state.defaultWallet} onChange={this.handleWalletChange}>
                    {walletSelect}
                </Select>
                : null}

            <div>Hạn thanh toán đợt 1</div>
            <div className="contract-deadline-show">
                <DatePicker disabled defaultValue={moment(contractData.deadline_1, 'YYYY-MM-DD')} />
                {contractData.paid_1_status === 'pending' &&
                    <Button className="request-pay-button" type="primary" onClick={() => this.activeDeadline(contractData.id, 1, contractData.firstPaidToken)} >Tiến hành</Button>}
                {contractData.paid_1_status === 'requesting' &&
                    <Button className="request-pay-button" type="primary" onClick={() => this.activePayContract(contractData.id, 1)} >Thanh toán</Button>}
                {contractData.paid_1_status === 'paid' &&
                    <Button className="request-pay-button" type="primary"  >Đã thanh toán</Button>}
            </div>

            <div>Hạn thanh toán đợt 2</div>
            <div className="contract-deadline-show">
                <DatePicker disabled defaultValue={moment(contractData.deadline_2, 'YYYY-MM-DD')} />
                {contractData.paid_1_status === 'paid' && contractData.paid_2_status === 'pending' &&
                    <Button className="request-pay-button" type="primary" onClick={() => this.activeDeadline(contractData.id, 2, contractData.secondPaidToken)} >Tiến hành</Button>}
                {contractData.paid_2_status === 'requesting' &&
                    <Button className="request-pay-button" type="primary" onClick={() => this.activePayContract(contractData.id, 2)} >Thanh toán</Button>}
                {contractData.paid_2_status === 'paid' &&
                    <Button className="request-pay-button" type="primary"  >Đã thanh toán</Button>}
            </div>

            <div>Hạn thanh toán đợt 3</div>
            <div className="contract-deadline-show">
                <DatePicker disabled defaultValue={moment(contractData.deadline_3, 'YYYY-MM-DD')} />
                {contractData.paid_2_status === 'paid' && contractData.paid_3_status === 'pending' &&
                    <Button className="request-pay-button" type="primary" onClick={() => this.activeDeadline(contractData.id, 2, contractData.secondPaidToken)} >Tiến hành</Button>}
                {contractData.paid_3_status === 'requesting' &&
                    <Button className="request-pay-button" type="primary" onClick={() => this.activePayContract(contractData.id, 3)} >Thanh toán</Button>}
                {contractData.paid_3_status === 'paid' &&
                    <Button className="request-pay-button" type="primary"  >Đã thanh toán</Button>}
            </div>

            <div>File hợp đồng</div>


            <div className="ContractModalFooter">
                <Button type="default" onClick={this.closeContractViewModal}>Close</Button>

            </div>
        </div>)
    }



    render() {
        const menu = (
            <Menu onClick={this.handleMenuItemClick}>
                {this.props.data.status === 'pending' &&
                    <Menu.Item key="solution"><Icon type="solution" /> <Link to={`${this.props.match.url}/` + this.props.data.id + '/solutions'}>Các giải pháp đã nhận cho vị trí này</Link> </Menu.Item>}
                {this.props.data.status === 'doing' &&
                    <Menu.Item key="viewContract"><Icon type="solution" />Xem lại hợp đồng</Menu.Item>}
                {this.props.data.status === 'accepted' &&
                    <Menu.Item key="viewContract"><Icon type="solution" />Xem lại hợp đồng</Menu.Item>}
                <Menu.Item key="delete"><Icon type="delete" /> Xoá</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Modal
                    visible={this.state.showContractDetailModal}
                    title="Chi tiết hợp đồng"
                    footer={null}
                >
                    {this.renderContractDetailModal()}
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


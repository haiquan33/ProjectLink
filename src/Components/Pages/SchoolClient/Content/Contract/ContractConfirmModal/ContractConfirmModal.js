import React, { Component } from 'react';
import moment from 'moment';

import { Button, Select, Steps, Icon } from 'antd'
import SignatureCanvas from 'react-signature-canvas';

import { DatePicker, Alert, notification } from 'antd';

import './ContractConfirmModal.css'
import { __makeTemplateObject } from 'tslib';

import web3 from '../../../../../../BlockChainAPI/web3'
import { tokenAPI } from '../../../../../../BlockChainAPI/tokenAPI';
import { requestPay, createNotification, submit_contract_rejection, accept_request_cancel_contract, reject_request_cancel_contract } from '../../../../../../Redux/service';
import appConstant from '../../../../../../Configs/constants.config';




const Option = Select.Option;
const Step = Steps.Step
class ContractConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertError: "",
      alert: false,
      IPFSHash: null
    };
    this.submit = this.submit.bind(this);
    this.set_deadline1 = this.set_deadline1.bind(this);
    this.set_deadline2 = this.set_deadline2.bind(this);
    this.set_deadline3 = this.set_deadline3.bind(this);
    this.handleWalletChange = this.handleWalletChange.bind(this);
  }


  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  // handleUploadSuccess = filename => {
  //   this.setState({ ContractFilename: filename, url: filename, progress: 100, isUploading: false });
  //   firebase_init
  //     .storage()
  //     .ref("contracts")
  //     .child(filename)
  //     .getDownloadURL()
  //     .then(url => this.setState({ fileurl: url }));
  // };



  set_deadline1(date, dateString) {
    this.setState({ deadline_1: dateString })
  }
  set_deadline2(date, dateString) {
    this.setState({ deadline_2: dateString })
  }
  set_deadline3(date, dateString) {
    this.setState({ deadline_3: dateString })
  }



  submit() {
    let solutionOwnerSign = this.solutionOwnerSignCanvas.toData();

    let temp_data = {
      problemID: this.props.data.id,
      SolutionOwnerSign: JSON.stringify(solutionOwnerSign),
      SolutionOwnerWallet: this.state.defaultWallet
    }

    //set contract data on blockchain
    const { data } = this.props
    console.log(data, this.state.defaultWallet)
    tokenAPI.setContractDetail(data.ProblemOwnerWallet,
      this.state.defaultWallet,
      data.id,
      data.deadline_1,
      data.firstPaidToken,
      data.deadline_2,
      data.secondPaidToken,
      data.deadline_3,
      data.thirdPaidToken,
      data.IPFSHash, { gas: 3000000 })
    this.props.submit_contract_confirmation(temp_data);
    this.props.closeContractConfirmModal();

    const notiData = {
      content: 'Hợp đồng của bạn đã được chấp nhận, xin vui lòng thực hiện tiến hành để bắt đầu dự án giai đoạn 1',
      problemID: data.id
    }
    createNotification(data.ProblemOwnerID, notiData, appConstant.RECEIVED_CONTRACT_ACCEPT)

  }

  reject = () => {
    const { data } = this.props
    submit_contract_rejection(data.id)
    this.props.closeContractConfirmModal();
    const notiData = {
      content: 'Hợp đồng của bạn đã bị từ chối,bạn có thể chỉnh sửa lại hợp đồng',
      problemID: data.id
    }
    createNotification(data.ProblemOwnerID, notiData, appConstant.RECEIVED_CONTRACT_REJECT)
  }

  handleWalletChange(value) {
    this.setState({ defaultWallet: value })
  }

  componentDidMount() {
    let ProblemOwnerSignature = JSON.parse(this.props.data.ProblemOwnerSign);
    this.problemOwnerSignCanvas.fromData(ProblemOwnerSignature);


    if (this.props.data.SolutionOwnerSign) {
      let SolutionOwnerSign = JSON.parse(this.props.data.SolutionOwnerSign)
      this.solutionOwnerSignCanvas.fromData(SolutionOwnerSign)
    }


    if (this.props.data.status === 'accepted') {
      this.problemOwnerSignCanvas.off()
      this.solutionOwnerSignCanvas.off()

    }

    let accountList = web3.eth.accounts;

    this.setState({ walletList: accountList, defaultWallet: accountList[0] });


    //get ipfshash from blockchain
    tokenAPI.getIPFSHash(this.props.data.id, (err, hash) => {
      if (!err) {
        this.setState({ IPFSHash: hash })
      }
    })
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


  sendPayRequest = (order) => {
    const afterAction = {
      onSuccess: () => this.openNotification('Yêu cầu thanh toán của bạn đã được gửi đi'),
      onFail: () => this.openNotification('Hiện chưa tới deadline của hợp đồng, vui lòng thử lại sau')
    }
    requestPay(this.props.data.id, order, afterAction)
    const notiData = {
      content: 'Một yêu cầu thanh toán đã được gửi đến bạn, hãy kiểm tra dashboard để kiểm tra kết quả công việc và thanh toán',
      problemID: this.props.data.id
    }
    createNotification(this.props.data.ProblemOwnerID, notiData, appConstant.RECEIVED_REQUEST_PAY)


  }

  acceptRequestCancel=()=>{
    accept_request_cancel_contract(this.props.data.id)
    this.props.closeContractConfirmModal()
  }
  rejectRequestCancel=()=>{
    reject_request_cancel_contract(this.props.data.id)
    this.props.closeContractConfirmModal()
  }

  render() {
    console.log(this.props.data)
    let walletSelect = [];
    let contractEditable = this.props.data.status === 'accepted' ? false : true
    if (this.props.data.status === 'request_cancel') contractEditable = false
    if (this.state.walletList) {
      for (var wallet in this.state.walletList) {
        walletSelect.push(<Option value={this.state.walletList[wallet]}>{this.state.walletList[wallet]}</Option>)
      }
    }
    const contractData = this.props.data
    const contractProgress = (
      <div style={{ margin: '10px' }}>
        <Steps size="small">
          <Step
            status="finish"
            title="Kí hợp đồng"
            icon={<Icon type="solution" />}
          />

          {/*----deadline 1-----*/}
          {!contractData.paid_2_status ||
            contractData.paid_1_status === "pending" ? (
              <Step
                status="wait"
                title="Giai đoạn 1"
                icon={<Icon type="credit-card" />}
              />
            ) : null}
          {contractData.paid_1_status === "requesting" ? (
            <Step
              status="process"
              title="Giai đoạn 1"
              description="Chờ thanh toán đợt 1"
              icon={<Icon type="loading" />}
            />
          ) : null}
          {contractData.paid_1_status === "paid" ? (
            <Step
              status="finish"
              title="Giai đoạn 1"
              icon={<Icon type="check-circle" />}
            />
          ) : null}

          {/*----deadline 2-----*/}
          {!contractData.paid_2_status ||
            contractData.paid_2_status === "pending" ? (
              <Step
                status="wait"
                title="Giai đoạn 2"
                icon={<Icon type="credit-card" />}
              />
            ) : null}
          {contractData.paid_2_status === "requesting" ? (
            <Step
              status="process"
              title="Giai đoạn 2"
              description="Chờ thanh toán đợt 2"
              icon={<Icon type="loading" />}
            />
          ) : null}
          {contractData.paid_2_status === "paid" ? (
            <Step
              status="finish"
              title="Giai đoạn 2"
              icon={<Icon type="check-circle" />}
            />
          ) : null}

          {/*----deadline 3-----*/}
          {!contractData.paid_3_status ||
            contractData.paid_3_status === "pending" ? (
              <Step
                status="wait"
                title="Giai đoạn 3"
                icon={<Icon type="credit-card" />}
              />
            ) : null}
          {contractData.paid_3_status === "requesting" ? (
            <Step
              status="process"
              title="Giai đoạn 3"
              description="Chờ thanh toán đợt 3"
              icon={<Icon type="loading" />}
            />
          ) : null}
          {contractData.paid_3_status === "paid" ? (
            <Step
              status="finish"
              title="Giai đoạn 3"
              icon={<Icon type="check-circle" />}
            />
          ) : null}
          {contractData.paid_3_status === "paid" ? (
            <Step
              status="finish"
              title="Hoàn tất"
              icon={<Icon type="flag" />}
            />
          ) : (
              <Step
                status="wait"
                title="Hoàn tất"
                icon={<Icon type="flag" />}
              />
            )}
        </Steps>
      </div>
    );
    return (
      <div className="ContractSubmitModal">
        {this.state.alert ? <Alert
          message={this.state.alertError}
          type="error"


        />
          : null}
        {contractProgress}
        {this.state.walletList ?
          <Select disabled={!contractEditable} defaultValue={this.props.data.SolutionOwnerWallet ? this.props.data.SolutionOwnerWallet : this.state.walletList[0]} onChange={this.handleWalletChange}>
            {walletSelect}
          </Select>
          : null}

        <div>Hạn thanh toán đợt 1</div>
        <div className="contract-deadline-show">
          <DatePicker disabled={!contractEditable} defaultValue={moment(this.props.data.deadline_1, 'YYYY-MM-DD')} onChange={this.set_deadline1} />
          {this.props.data.status === 'accepted' && this.props.data.paid_1_status === 'activated' &&
            <Button className="request-pay-button" type="primary" onClick={() => this.sendPayRequest(1)} >Yêu cầu thanh toán</Button>}
          {this.props.data.paid_1_status === 'paid' &&
            <Button className="request-pay-button" type="primary" >Đã thanh toán</Button>}
        </div>

        <div>Hạn thanh toán đợt 2</div>
        <div className="contract-deadline-show">
          <DatePicker disabled={!contractEditable} defaultValue={moment(this.props.data.deadline_2, 'YYYY-MM-DD')} onChange={this.set_deadline2} />
          {this.props.data.status === 'accepted' && this.props.data.paid_2_status === 'activated' &&
            <Button className="request-pay-button" type="primary" onClick={() => this.sendPayRequest(2)} >Yêu cầu thanh toán</Button>}
          {this.props.data.paid_2_status === 'paid' &&
            <Button className="request-pay-button" type="primary" >Đã thanh toán</Button>}
        </div>

        <div>Hạn thanh toán đợt 3</div>
        <div className="contract-deadline-show">
          <DatePicker disabled={!contractEditable} defaultValue={moment(this.props.data.deadline_3, 'YYYY-MM-DD')} onChange={this.set_deadline3} />
          {this.props.data.status === 'accepted' && this.props.data.paid_3_status === 'activated' &&
            <Button className="request-pay-button" type="primary" onClick={() => this.sendPayRequest(3)} >Yêu cầu thanh toán</Button>}
          {this.props.data.paid_3_status === 'paid' &&
            <Button className="request-pay-button" type="primary" >Đã thanh toán</Button>}
        </div>

        <div>File hợp đồng</div>
        {this.props.data.IPFSHash && this.props.data.status !== 'accepted' &&
          < a onClick={() => window.open('http://localhost:8080/ipfs/' + this.props.data.IPFSHash, '_blank')}><Alert message={'File hash: ' + this.props.data.IPFSHash} type="info" /></a>}

        {this.props.data.IPFSHash && this.props.data.status === 'accepted' && this.state.IPFSHash &&
          < a onClick={() => window.open('http://localhost:8080/ipfs/' + this.state.IPFSHash, '_blank')}> <Alert message={'File hash: ' + this.state.IPFSHash} type="info" /></a >}

        <div>Chữ kí bên thuê</div>
        <div style={{ border: '1px solid black' }}>
          <SignatureCanvas penColor='green'
            ref={(ref) => { this.problemOwnerSignCanvas = ref }}
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas', }}
          />

        </div>
        <div>Chữ kí bên thực hiện</div>
        <div style={{ border: '1px solid black' }}>
          <SignatureCanvas penColor='green'
            ref={(ref) => { this.solutionOwnerSignCanvas = ref }}
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas', }}
          />

        </div>
        <div className="ContractModalFooter">
          {this.props.data.status === 'request_cancel' &&
            <Button type="primary" onClick={this.acceptRequestCancel}>Chấp nhận yêu cầu hủy hợp đồng</Button>
          }
          {this.props.data.status === 'request_cancel' &&
            <Button type="primary" onClick={this.rejectRequestCancel}>Từ chối yêu cầu hủy hợp đồng</Button>
          }
          <Button type="default" onClick={this.props.closeContractConfirmModal}>Close</Button>
          {contractEditable ? <Button type="primary" onClick={this.reject}>Từ chối</Button> : null
          }
          {contractEditable ? <Button type="primary" onClick={this.submit}>Xác nhận</Button> : null
          }

        </div>
      </div >
    );
  }
}

export default ContractConfirmModal;

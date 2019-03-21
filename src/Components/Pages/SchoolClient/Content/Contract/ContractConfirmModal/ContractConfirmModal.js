import React, { Component } from 'react';
import moment from 'moment';

import { Button, Select } from 'antd'
import SignatureCanvas from 'react-signature-canvas';

import { DatePicker, Alert, notification } from 'antd';

import './ContractConfirmModal.css'
import { __makeTemplateObject } from 'tslib';

import web3 from '../../../../../../BlockChainAPI/web3'
import { tokenAPI } from '../../../../../../BlockChainAPI/tokenAPI';
import { requestPay } from '../../../../../../Redux/service';




const Option = Select.Option;
class ContractConfirmModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertError: "",
      alert: false
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
      'xxx', { gas: 3000000 })
    this.props.submit_contract_confirmation(temp_data);
    this.props.closeContractConfirmModal();


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
        const afterAction={
          onSuccess:()=>this.openNotification('Yêu cầu thanh toán của bạn đã được gửi đi'),
          onFail:()=>this.openNotification('Hiện chưa tới deadline của hợp đồng, vui lòng thử lại sau')
        }
        requestPay(this.props.data.id,order,afterAction)
  }

  render() {
    let walletSelect = [];
    let contractEditable = this.props.data.status === 'accepted' ? false : true
    if (this.state.walletList) {
      for (var wallet in this.state.walletList) {
        walletSelect.push(<Option value={this.state.walletList[wallet]}>{this.state.walletList[wallet]}</Option>)
      }
    }
    console.log(contractEditable)
    return (
      <div className="ContractSubmitModal">
        {this.state.alert ? <Alert
          message={this.state.alertError}
          type="error"


        />
          : null}

        {this.state.walletList ?
          <Select disabled={!contractEditable} defaultValue={this.props.data.SolutionOwnerWallet ? this.props.data.SolutionOwnerWallet : this.state.walletList[0]} onChange={this.handleWalletChange}>
            {walletSelect}
          </Select>
          : null}

        <div>Hạn thanh toán đợt 1</div>
        <div className="contract-deadline-show">
          <DatePicker disabled={!contractEditable} defaultValue={moment(this.props.data.deadline_1, 'DD-MM-YYYY')} onChange={this.set_deadline1} />
          <Button className="request-pay-button" type="primary" onClick={()=>this.sendPayRequest(1)} >Yêu cầu thanh toán</Button>
        </div>

        <div>Hạn thanh toán đợt 2</div>
        <div className="contract-deadline-show">
          <DatePicker disabled={!contractEditable} defaultValue={moment(this.props.data.deadline_2, 'DD-MM-YYYY')} onChange={this.set_deadline2} />
          <Button className="request-pay-button" type="primary" onClick={()=>this.sendPayRequest(2)} > Yêu cầu thanh toán</Button>
        </div>

        <div>Hạn thanh toán đợt 3</div>
        <div className="contract-deadline-show">
          <DatePicker disabled={!contractEditable} defaultValue={moment(this.props.data.deadline_3, 'DD-MM-YYYY')} onChange={this.set_deadline3} />
          <Button className="request-pay-button" type="primary" onClick={()=>this.sendPayRequest(3)} > Yêu cầu thanh toán</Button>
        </div>

        <div>File hợp đồng</div>

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
          <Button type="default" onClick={this.props.closeContractConfirmModal}>Close</Button>
          {contractEditable ? <Button type="primary" onClick={this.submit}>Gửi</Button> : null
          }
        </div>
      </div>
    );
  }
}

export default ContractConfirmModal;

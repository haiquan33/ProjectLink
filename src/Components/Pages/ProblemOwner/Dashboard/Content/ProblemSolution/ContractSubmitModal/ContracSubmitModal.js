import React, { Component } from 'react';
import { Upload, Button } from 'antd'
import SignatureCanvas from 'react-signature-canvas';
import firebase_init from '../../../../../../../firebase'
import FileUploader from "react-firebase-file-uploader";
import { DatePicker, Alert, Select } from 'antd';
import NumericInputDemo from '../../../../../../Components/Common/NumericInput'

import './ContractSubmitModal.css'
import { __makeTemplateObject } from 'tslib';

import { tokenAPI } from '../../../../../../../BlockChainAPI/tokenAPI'
import web3 from '../../../../../../../BlockChainAPI/web3'
import { tempConst } from '../../../../../../../TempConst';
import { userInfo } from 'os';



const Option = Select.Option;
class ContractSubmitModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alertError: "",
      alert: false,
      firstPaidToken: null,
      secondPaidToken: null,
      thirdPaidToken: null,
    };
    this.submit = this.submit.bind(this);
    this.set_deadline1 = this.set_deadline1.bind(this);
    this.set_deadline2 = this.set_deadline2.bind(this);
    this.set_deadline3 = this.set_deadline3.bind(this);

    this.onFirstPaidTokenChange = this.onFirstPaidTokenChange.bind(this);
    this.onSecondPaidTokenChange = this.onSecondPaidTokenChange.bind(this);
    this.onThirdPaidTokenChange = this.onThirdPaidTokenChange.bind(this);
    this.checkContractData = this.checkContractData.bind(this);
    this.handleWalletChange = this.handleWalletChange.bind(this);

  }
  checkContractData() {
    if (!this.state.fileurl) return false;
    if (!this.state.firstPaidToken) return false;
    if (!this.state.secondPaidToken) return false;
    if (!this.state.thirdPaidToken) return false;
    return true;
  }

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });
  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({ ContractFilename: filename, url: filename, progress: 100, isUploading: false });
    firebase_init
      .storage()
      .ref("contracts")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ fileurl: url }));
  };



  set_deadline1(date, dateString) {
    this.setState({ deadline_1: dateString })
  }
  set_deadline2(date, dateString) {
    this.setState({ deadline_2: dateString })
  }
  set_deadline3(date, dateString) {
    this.setState({ deadline_3: dateString })

  }

  onFirstPaidTokenChange = (value) => {
    this.setState({ firstPaidToken: value });
  }
  onSecondPaidTokenChange = (value) => {
    this.setState({ secondPaidToken: value });
  }
  onThirdPaidTokenChange = (value) => {
    this.setState({ thirdPaidToken: value });
  }


  submit() {
    let ProblemOwnerSign = this.sigCanvas.toData();
    let temp_data = {
      problemID: this.props.problemID,
      ContractFilename: this.state.ContractFilename,
      ProblemOwnerID: this.props.ProblemOwnerID,
      ProblemOwnerSign: JSON.stringify(ProblemOwnerSign),

      SolutionOwnerID: this.props.SolutionOwnerID,
      SolutionOwnerSign: null,

      deadline_1: this.state.deadline_1,
      deadline_2: this.state.deadline_2,
      deadline_3: this.state.deadline_3,
      firstPaidToken: this.state.firstPaidToken,
      secondPaidToken: this.state.secondPaidToken,
      thirdPaidToken: this.state.thirdPaidToken,
      ProblemOwnerWallet: this.state.defaultWallet

    }


    //console.log("my Balance",);
    // let balance = parseInt(tokenAPI.myBalance());


    // if (balance < this.state.firstPaidToken) {

    //   this.setState({ alertError: "Không đủ số dư thực hiện!  Số dư hiện tại: " + balance, alert: true });
    //   return;
    // }

    if (this.checkContractData()) {
      this.props.submit_contract(temp_data);
      this.props.closeContractSubmitModal();

      //lock token 
     // tokenAPI.lockBalance(this.state.firstPaidToken)

    }
    else {
      this.setState({ alertError: "Chưa upload file hợp đồng", alert: true })
    }
  }


  handleWalletChange(value) {
    this.setState({ defaultWallet: value }, () => {
      web3.eth.defaultAccount = this.state.defaultWallet
     let balance = parseInt(tokenAPI.myBalance().toNumber());
      console.log(balance)
      this.setState({ walletBalance: balance })
    })



  }
  componentDidMount() {
    let accountList = web3.eth.accounts;

    this.setState({ walletList: accountList, defaultWallet: accountList[0] });
    let balance = parseInt(tokenAPI.myBalance().toNumber());
    this.setState({ walletBalance: balance })
  }

  render() {
    let walletSelect = [];
    if (this.state.walletList) {
      for (var wallet in this.state.walletList) {
        walletSelect.push(<Option value={this.state.walletList[wallet]}>{this.state.walletList[wallet]}</Option>)
      }
    }
    return (
      <div className="ContractSubmitModal">
        {this.state.alert ? <Alert
          message={this.state.alertError}
          type="error"


        />
          : null}

        {this.state.walletList ?
          <Select defaultValue={this.state.walletList[0]} onChange={this.handleWalletChange}>
            {walletSelect}
          </Select>
          : null}
        {this.state.walletBalance &&
          <Alert message={'Số dư hiện tại ' + this.state.walletBalance} type="info" />}

        <div>Hạn thanh toán đợt 1</div>
        <DatePicker onChange={this.set_deadline1} />
        <NumericInputDemo value={this.state.firstPaidToken} onChange={this.onFirstPaidTokenChange} placeholder="Nhập số tiền thanh toán đợt này" />
        <div>Hạn thanh toán đợt 2</div>
        <DatePicker onChange={this.set_deadline2} />
        <NumericInputDemo value={this.state.secondPaidToken} onChange={this.onSecondPaidTokenChange} placeholder="Nhập số tiền thanh toán đợt này" />
        <div>Hạn thanh toán đợt 3</div>
        <DatePicker onChange={this.set_deadline3} />
        <NumericInputDemo value={this.state.thirdPaidToken} onChange={this.onThirdPaidTokenChange} placeholder="Nhập số tiền thanh toán đợt này" />
        <div>File hợp đồng</div>
        <FileUploader
          accept="image/*"
          name="avatar"
          randomizeFilename
          storageRef={firebase_init.storage().ref("contracts")}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
        <div>Chữ kí bên thuê</div>
        <div style={{ border: '1px solid black' }}>
          <SignatureCanvas penColor='green'
            ref={(ref) => { this.sigCanvas = ref }}
            canvasProps={{ width: 500, height: 200, className: 'sigCanvas', }} />
        </div>
        <div className="ContractModalFooter">
          <Button type="default" onClick={this.props.closeContractSubmitModal}>Close</Button>
          <Button type="primary" onClick={this.submit}>Gửi</Button>
        </div>
      </div>
    );
  }
}

export default ContractSubmitModal;

import React, { Component } from 'react';
import moment from 'moment';

import { Button } from 'antd'
import SignatureCanvas from 'react-signature-canvas';

import { DatePicker, Alert } from 'antd';

import './ContractConfirmModal.css'
import { __makeTemplateObject } from 'tslib';

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
      problemID:this.props.data.id, 
      SolutionOwnerSign: JSON.stringify(solutionOwnerSign)

    }
  
    this.props.submit_contract_confirmation(temp_data);
    this.props.closeContractConfirmModal();
    
   
  }

  componentDidMount(){
    let ProblemOwnerSignature=JSON.parse(this.props.data.ProblemOwnerSign);
    this.problemOwnerSignCanvas.fromData(ProblemOwnerSignature)
  }

  render() {
   
    return (
      <div className="ContractSubmitModal">
        {this.state.alert ? <Alert
          message={this.state.alertError}
          type="error"


        />
          : null}

        <div>Hạn thanh toán đợt 1</div>
        <DatePicker defaultValue={moment(this.props.data.deadline_1, 'DD-MM-YYYY')} onChange={this.set_deadline1} />
        <div>Hạn thanh toán đợt 2</div>
        <DatePicker defaultValue={moment(this.props.data.deadline_2, 'DD-MM-YYYY')} onChange={this.set_deadline2} />
        <div>Hạn thanh toán đợt 3</div>
        <DatePicker defaultValue={moment(this.props.data.deadline_3, 'DD-MM-YYYY')} onChange={this.set_deadline3} />
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
          <Button type="primary" onClick={this.submit}>Gửi</Button>
        </div>
      </div>
    );
  }
}

export default ContractConfirmModal;
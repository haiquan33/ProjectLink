import React, { Component } from 'react';
import { Upload } from 'antd'
import SignatureCanvas from 'react-signature-canvas';
import firebase_init from '../../../../../../../firebase'
import FileUploader from "react-firebase-file-uploader";
import { DatePicker } from 'antd';

import './ContractSubmitModal.css'

class ContractSubmitModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase_init
      .storage()
      .ref("contracts")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ avatarURL: url }));
  };
  render() {
    return (
      <div className="ContractSubmitModal">
        <div>Hạn thanh toán đợt 1</div>
         <DatePicker />
      <div>Hạn thanh toán đợt 2</div>
         <DatePicker />
      <div>Hạn thanh toán đợt 3</div>
         <DatePicker />  
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
        <div   style={{border: '1px solid black'}}>
        <SignatureCanvas penColor='green'
          canvasProps={{ width: 500, height: 200, className: 'sigCanvas', }} />
        </div>
      </div>
    );
  }
}

export default ContractSubmitModal;

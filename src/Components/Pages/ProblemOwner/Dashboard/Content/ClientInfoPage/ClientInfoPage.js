import React, { Component } from 'react'
import {Input,Button} from 'antd'
export default class ClientInfoPage extends Component {
    constructor(props){
        super(props);
        this.state={walletAddress:''}
        this.SubmitWalletAddress=this.SubmitWalletAddress.bind(this);
    }
 onChangeWalletAdress=(e)=>{
    this.setState({walletAddress:e.target.value})
 }
 SubmitWalletAddress(){
        this.props.addWalletAddress(this.state.walletAddress,this.props.userInfo);
 }
  render() {
    return (
      <div>
             <Input placeholder="Địa chỉ ví ảo của bạn"  value={this.state.walletAddress} onChange={this.onChangeWalletAdress}/>
             <Button onClick={this.SubmitWalletAddress}>Submit</Button>
      </div>
    )
  }
}

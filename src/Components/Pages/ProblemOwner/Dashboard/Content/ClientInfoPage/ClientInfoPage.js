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
            
      </div>
    )
  }
}

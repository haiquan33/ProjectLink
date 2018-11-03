import React, { Component } from 'react';
//import logo from ‘./logo.svg’;

import web3 from './web3';
import ipfs from './ipfs';
import { storehash } from './storehash';
import { Table, Grid, Form, Button as BsButton } from 'react-bootstrap';
import { Button, Input } from 'antd'
import './ContractSignPage.css'

class ContractSignPage extends Component {

    state = {
        ipfsHash: null,
        buffer: '',
        ethAddress: '',
        blockNumber: '',
        transactionHash: '',
        gasUsed: '',
        txReceipt: ''
    };
    captureFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
    };
    convertToBuffer = async (reader) => {
        //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result);
        //set this buffer -using es6 syntax
        this.setState({ buffer });
    };
    onClick = async () => {
        try {
            this.setState({ blockNumber: "waiting.." });
            this.setState({ gasUsed: "waiting..." });
            //get Transaction Receipt in console on click
            //See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
            // await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt) => {
            //     console.log(err, txReceipt);
            //     this.setState({ txReceipt });
            // }); //await for getTransactionReceipt
            // await this.setState({ blockNumber: this.state.txReceipt.blockNumber });
            // await this.setState({ gasUsed: this.state.txReceipt.gasUsed });
        } //try
        catch (error) {
            console.log(error);
        } //catch
    } //onClick
    onSubmit = async (event) => {
        event.preventDefault();
        //bring in user's metamask account address

        //obtain contract address from storehash.js

        // this.setState({ ethAddress });
        //save document to IPFS,return its hash#, and set hash# to state
        //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(err, ipfsHash);
            //setState by setting ipfsHash to ipfsHash[0].hash 
      
                this.setState({ ipfsHash: ipfsHash[0].hash });
                // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
                //return the transaction hash from the ethereum contract
                //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
                console.log(ipfsHash[0].hash );
                storehash.sendHash(ipfsHash[0].hash );
                let txReceipt = storehash.getHash();
                this.setState({ txReceipt });
            
            //.send({
            //     from: accounts[0]
            // }, (error, transactionHash) => {
            //     console.log(transactionHash);
            //     this.setState({ transactionHash });
            // }); //storehash 
        }) //await ipfs.add 
    }; //onSubmit
    render() {




        return (
            <div className="App">



                <Grid>
                    <h3> Chọn file hợp đồng để gửi lên IPFS </h3>
                    <Form onSubmit={this.onSubmit}>
                        <input
                            type="file"
                            onChange={this.captureFile}
                        />
                        <BsButton
                            className="btnSubmit"
                            bsStyle="primary"
                            type="submit">
                            Send it
                        </BsButton>
                    </Form>
                    <div className="PassandSubmit">
                        <div className="PasswordContainer">
                            <Input addonBefore="Mật khẩu bên A" defaultValue="mật khẩu" />
                            <Input addonBefore="Mật khẩu bên B" defaultValue="mật khẩu" />
                        </div>

                    </div>
                    <hr />
                    <Button onClick={this.onClick}> Get Transaction Receipt </Button>
                    <Table className="DetailTable" bordered responsive >
                        <thead>
                            <tr>
                                <th>Tx Receipt Category</th>
                                <th>Values</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>IPFS Hash # stored on Eth Contract</td>
                                <td>{this.state.ipfsHash}</td>
                            </tr>
                            <tr>
                                <td>Ethereum Contract Address</td>
                                <td>{this.state.ethAddress}</td>
                            </tr>
                            <tr>
                                <td>Tx Hash # </td>
                                <td>{this.state.txReceipt}</td>
                            </tr>
                            <tr>
                                <td>Block Number # </td>
                                <td>{this.state.blockNumber}</td>
                            </tr>
                            <tr>
                                <td>Gas Used</td>
                                <td>{this.state.gasUsed}</td>
                            </tr>

                        </tbody>
                    </Table>
                </Grid>
            </div>
        );
    } //render
} //App
export default ContractSignPage;
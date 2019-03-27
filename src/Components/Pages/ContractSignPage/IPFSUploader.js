import React, { Component } from 'react'
import { Table, Grid, Form, Button as BsButton } from 'react-bootstrap';
import ipfs from './ipfs';
import { storehash } from './storehash';
export default class IPFSUploader extends Component {
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
    handleUploadProcess = (byte, totalSize) => {
        this.props.onProgress(byte, totalSize)
    }
    onSubmit = async (event) => {
        event.preventDefault();
        this.props.onStart()
        //bring in user's metamask account address

        //obtain contract address from storehash.js

        // this.setState({ ethAddress });
        //save document to IPFS,return its hash#, and set hash# to state
        //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add 
        await ipfs.add(this.state.buffer, { progress: (byte) => this.handleUploadProcess(byte, this.state.buffer.byteLength) }, (err, ipfsHash) => {
            this.props.onFinish(ipfsHash)
            console.log(err, ipfsHash);
            //setState by setting ipfsHash to ipfsHash[0].hash 

            this.setState({ ipfsHash: ipfsHash[0].hash });
            // call Ethereum contract method "sendHash" and .send IPFS hash to etheruem contract 
            //return the transaction hash from the ethereum contract
            //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
            console.log(ipfsHash[0].hash);
            storehash.sendHash(ipfsHash[0].hash);
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
            <div>
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
            </div>
        )
    }
}

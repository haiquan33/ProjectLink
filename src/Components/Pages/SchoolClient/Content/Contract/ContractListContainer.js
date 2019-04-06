import React, { Component } from 'react';
import './ContractListContainer.css';

//Custom Component 
import ContractList from './ContractList';

//Ant
import { Affix,Button,Modal } from 'antd';



//Redux component
import {get_contract_list_of_solution_owner} from '../../../../../Redux/service'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';






class ContractListContainer extends Component {

    constructor(props){
        super(props);
        this.state = { showCreateProblemModal: false};
        this.openCreateProblemModal=this.openCreateProblemModal.bind(this);
        this.handleCloseCreateProblemModal=this.handleCloseCreateProblemModal.bind(this);

    }
    componentDidMount() {
        //nếu user yêu cầu list tất cả các công viêc đã đăng thì thực hiện lấy các công việc
        
        // if (this.props.match.params.postedType == 'all') {
            
                this.props.get_contract_list_of_solution_owner(this.props.userInfo.uid);
               
        //}
    }

    openCreateProblemModal(){
        this.setState({showCreateProblemModal:true});
    }

      //sau khi create job modal đóng
      afterCreateProblemModalClose() {
       
    }


    handleCloseCreateProblemModal() {
        this.setState({ showCreateProblemModal: false });
    }


    render() {
        console.log(this.props.resultContractList)
        return (
            <div>
                <ContractList submit_contract_confirmation={this.props.submit_contract_confirmation} data={this.props.resultContractList} match={this.props.match} />        
            
                <Modal
                    visible={this.state.showCreateProblemModal}
                    footer={null}
                    onCancel={() => { this.handleCloseCreateProblemModal() }}
                    bodyStyle={{ width: "100%" }}
                    closable={false}
                    afterClose={()=>this.afterCreateProblemModalClose()}
                >
                 
                </Modal>
              
            </div>
        )
    }



}



function mapState2Props(state) {
    return {
        resultProblemList: state.problemReducer.resultProblemList,
        userInfo: state.accountReducer.userInfo,
        resultContractList:state.contractReducer.resultContractList
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
            get_contract_list_of_solution_owner
    }, dispatch)

}


export default connect(mapState2Props, mapDispatchToProps)(ContractListContainer);

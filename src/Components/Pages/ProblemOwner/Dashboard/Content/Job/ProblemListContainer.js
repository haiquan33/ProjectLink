import React, { Component } from 'react';
import './ProblemListContainer.css';

//Custom Component 
import JobList from './JobList';
import WrappedCreateJobForm from './Form/CreateJobForm';
//Ant
import { Affix,Button,Modal } from 'antd';



//Redux component
import {get_All_Problem_List_from_this_account,add_new_problem} from '../../../../../../Redux/service'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';






class ProblemListContainer extends Component {

    constructor(props){
        super(props);
        this.state = { showCreateProblemModal: false};
        this.openCreateProblemModal=this.openCreateProblemModal.bind(this);
        this.handleCloseCreateProblemModal=this.handleCloseCreateProblemModal.bind(this);

    }
    componentDidMount() {
        //nếu user yêu cầu list tất cả các công viêc đã đăng thì thực hiện lấy các công việc
        if (this.props.match.params.postedType == 'all') {
                this.props.get_All_Problem_List_from_this_account(this.props.userInfo.uid);
                console.log("get problem list");
        }
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

        return (
            <div>
                <JobList data={this.props.resultProblemList} />        
                <Button onClick={this.openCreateProblemModal} type="primary" shape="circle" icon="plus" size={"large"} />
                <Modal
                    visible={this.state.showCreateProblemModal}
                    footer={null}
                    onCancel={() => { this.handleCloseCreateProblemModal() }}
                    bodyStyle={{ width: "100%" }}
                    closable={false}
                    afterClose={()=>this.afterCreateProblemModalClose()}
                >
                    <WrappedCreateJobForm userInfo={this.props.userInfo} add_new_problem={this.props.add_new_problem} handleCloseCreateProblemModal={this.handleCloseCreateProblemModal}   />
                </Modal>
            </div>
        )
    }



}



function mapState2Props(state) {
    return {
        resultProblemList: state.problemReducer.resultProblemList,
        userInfo: state.accountReducer.userInfo,
    };
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
            get_All_Problem_List_from_this_account,
            add_new_problem
    }, dispatch)

}


export default connect(mapState2Props, mapDispatchToProps)(ProblemListContainer);

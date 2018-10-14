import React from 'react';
import SolutionList from './SolutionList';
import {Modal} from 'antd';

class ProblemSolutionContainer extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue',showSolutionDetail:false, ModalSolutionOwnerNamer:'',ModalSolutionContent:'' };
    this.showSolutionDetailModal= this.showSolutionDetailModal.bind(this);
    this.handlecloseSolutionDetailModal=this.handlecloseSolutionDetailModal.bind(this);
  }

  componentDidMount(){
    if (this.props.match.params.problemID)
    {
      console.log("lay data");
      this.props.get_solution_list(this.props.match.params.problemID);
    }
    
  }

  showSolutionDetailModal(ModalSolutionOwnerNamer,ModalSolutionContent){
    this.setState({showSolutionDetail:true,ModalSolutionContent,ModalSolutionOwnerNamer});
}




handlecloseSolutionDetailModal() {
    this.setState({showSolutionDetail: false });
}

  render() {
    return (<div>
             {this.props.resultSolutionList?<SolutionList ProblemOwnerID={this.props.userInfo.uid} submit_contract={this.props.submit_contract} data={this.props.resultSolutionList} match={this.props.match} showSolutionDetailModal={this.showSolutionDetailModal}/>:null} 
             <Modal
                    visible={this.state.showSolutionDetail}
                    footer={null}
                    title={this.state.ModalSolutionOwnerNamer}
                    onCancel={() => { this.handlecloseSolutionDetailModal() }}
                    bodyStyle={{ width: "100%" }}
                    closable={false}
                 
                >
                  <p>{this.state.ModalSolutionContent}</p>
                </Modal>
                
    </div>);
  }


}

export default ProblemSolutionContainer;

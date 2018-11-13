import React, { Component } from 'react';
import './SolutionList.css'
import SolutionItem from './SolutionItem'

//Ant
import { Row, Col, Pagination, List, Affix } from 'antd';

export default class SolutionList extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            pagination: {
                pageSize: 10,
                currentPage: 1
            }

        }
        this.getSolutionItems = this.getSolutionItems.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(page, pageSize) {
        this.setState({ pagination: { ...this.state.pagination, currentPage: page } });
    }

    getSolutionItems() {
        
        let count = 0;
        if (this.props.data) count=this.props.data.length;
        const children = [];
        let currentPage = this.state.pagination.currentPage;
        let pageSize = this.state.pagination.pageSize;
        console.log(count, currentPage, pageSize);
        for (let i = 0; i < count; i++) {
            if ((i < currentPage * pageSize) && (i >= (currentPage - 1) * pageSize)) {

                children.push(
                    <Col span={6}>
                        <SolutionItem userInfo={this.props.userInfo} ProblemOwnerID={this.props.ProblemOwnerID} problemID={this.props.match.params.problemID} submit_contract={this.props.submit_contract} showSolutionDetailModal={this.props.showSolutionDetailModal} data={this.props.data[i]} match={this.props.match} />

                    </Col>

                );
            }
        }
        return children;
    }


    render() {



        return (

            <div className="SolutionList">
                <Row gutter={20}>
                    {this.getSolutionItems()}
                </Row>

                    {this.props.data?
                    <Pagination pageSize={this.state.pagination.pageSize} total={this.props.data.length} current={this.state.pagination.currentPage} onChange={this.onPageChange} />:null
                    }
            </div>
        )

    }

}



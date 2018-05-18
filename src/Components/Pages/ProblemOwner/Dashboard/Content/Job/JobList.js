import React, { Component } from 'react';
import './JobList.css'
import JobItem from './JobItem'

//Ant
import { Row, Col, Pagination, List, Affix } from 'antd';

export default class JobList extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            pagination: {
                pageSize: 10,
                currentPage: 1
            }

        }
        this.getJobItems = this.getJobItems.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(page, pageSize) {
        this.setState({ pagination: { ...this.state.pagination, currentPage: page } });
    }

    getJobItems() {
        
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
                        <JobItem data={this.props.data[i]} />

                    </Col>

                );
            }
        }
        return children;
    }


    render() {



        return (

            <div className="JobList">
                <Row gutter={20}>
                    {this.getJobItems()}
                </Row>

                    {this.props.data?
                    <Pagination pageSize={this.state.pagination.pageSize} total={this.props.data.length} current={this.state.pagination.currentPage} onChange={this.onPageChange} />:null
                    }
            </div>
        )

    }

}



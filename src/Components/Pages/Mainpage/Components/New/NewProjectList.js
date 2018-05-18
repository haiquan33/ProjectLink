import React, { Component } from 'react';

import ProjectItem from './ProjectItemt'

//Ant
import { Row, Col, Pagination, List, Affix } from 'antd';

export default class NewProjectList extends Component {

    constructor(props) {
        super(props);
        this.state = {
           
            pagination: {
                pageSize: 10,
                currentPage: 1
            }

        }
        this.getProjectItems = this.getProjectItems.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    onPageChange(page, pageSize) {
        this.setState({ pagination: { ...this.state.pagination, currentPage: page } });
    }

    getProjectItems() {
        
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
                        <ProjectItem data={this.props.data[i]} />

                    </Col>

                );
            }
        }
        return children;
    }


    render() {



        return (

            <div className="ProjectList">
                <Row gutter={20}>
                    {this.getProjectItems()}
                </Row>

                    {this.props.data?
                    <Pagination pageSize={this.state.pagination.pageSize} total={this.props.data.length} current={this.state.pagination.currentPage} onChange={this.onPageChange} />:null
                    }
            </div>
        )

    }

}



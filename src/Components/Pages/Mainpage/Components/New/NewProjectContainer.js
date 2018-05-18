import React, { Component } from 'react';
import { Tabs } from 'antd';

import NewProjectList from './NewProjectList'

import './NewProjectContainer.css'

class NewProjectContainer extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        const data = [
            {
              title: 'Title 1',
            },
            {
              title: 'Title 2',
            },
            {
              title: 'Title 3',
            },
            {
              title: 'Title 4',
            },
            {
              title: 'Title 5',
            },
            {
              title: 'Title 6',
            },
          ];
          
        return (
            <div className="NewProjectContainer" >
                <NewProjectList data={data}/>
            </div>
        );
    }
}

export default NewProjectContainer;
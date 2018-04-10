import React, { Component } from 'react';
import {Divider} from 'antd';

import PopularProject from './Components/Popular/PopularProject';
import './Mainpage.css';


class Mainpage extends Component {
  constructor(props){
    super(props)
  
 
  }

  render() {
    return (
      <div className="Mainpage">
                  <PopularProject/>
                  <Divider/>
      </div>
    );
  }
}

export default Mainpage;
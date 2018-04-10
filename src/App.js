import React, { Component } from 'react';
import logo from './logo.svg';

import Mainpage from './Components/Pages/Mainpage/Mainpage'
import Header from './Components/Components/Header/Header'
import './App.css';

import { Layout, Menu, Breadcrumb } from 'antd';

//Test Contract
// import { ratingContract } from "./setup.js";
// import {ShowMovies } from "./ShowMovies";

class App extends Component {
  constructor(props){
    super(props)
  
 
  }

 //Test Contract 
// componentWillMount(){
//   let movie=this.state.movies.map((el)=>{
//       let votes=ratingContract.totalVotesFor(el.name).toNumber()
//       return Object.assign({},el,{rating:votes})

//     })
 
//   this.setState({movies:movie});
// }  

//Test Contract
// handleVoting(movie){
//     ratingContract.voteForMovie(movie)
//     let votes=ratingContract.totalVotesFor(movie).toNumber()
//     this.setState({movies:this.state.movies.map(
//       (el)=>el.name===movie? Object.assign({},el,{rating:votes}):el
    
//     )});
//   }
  render() {
    return (
      <div className="App">
            <Layout>
                <Header/>
                <Layout.Content>
                <Mainpage/>
                </Layout.Content>
            </Layout>
      </div>
    );
  }
}

export default App;
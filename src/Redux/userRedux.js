import { createStore,combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'



//ACtions Import
import {LOGIN_GG_SUCCESS,
    START_CHECKING_LOGIN_INFO,
    FINISH_CHECKING_LOGIN_INFO,
    FINISH_CHECKING_LOGIN_FAILED,
    LOGIN_REMEMBER,
    LOGIN_STATUS_RESET,
    START_GETTING_USER_INFO_AFTER_LOGIN,
    SET_USER_INFO_AFTER_LOGIN,
    START_CHECKING_SIGNUP_INFO,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILED,

    SIGN_UP_STATUS_RESET,
    
    SIGNOUT,
    SET_RESULT_PROBLEM_LIST,
    SET_RESULT_PROBLEM,
    SET_RESULT_SOLUTION_LIST,

    SET_RESULT_CONTRACT_LIST,
    SET_USER_WALLET_ADDRESS
    } from './Actions/actions' ;





export const DefaultAccountState = {
    isCheckingLoginInfo:false,
    isCheckingSignUpInfo:false, 
    isCompleteSignUpSuccessfully:false,

    isGettingUserInfo:false,
    num: 1,
    userInfo:null
   
   
}



export const DefaultProblemState = {
    resultProblemList:null,
    resultProblem:null
   
}

export const DefaultSolutionState={
    resultSolutionList:null
}

export const DefaultContractState={
    resultContractList:null
}


export const accountReducer = (state = DefaultAccountState , action) => {
    let count_temp=0;
    switch (action.type) {
        case SET_USER_INFO_AFTER_LOGIN: return {...state, userInfo:action.userInfo}
        case SIGNOUT:return{...state,userInfo:null};
        case SET_USER_WALLET_ADDRESS:return{...state,userInfo:{...state.userInfo,walletAddress:action.walletAdress}}
        default: return state;
    }
}


export const problemReducer = (state = DefaultProblemState,action)=>{
    switch (action.type) {
        case SET_RESULT_PROBLEM_LIST: return {...state,resultProblemList:action.resultProblemList}
        case SET_RESULT_PROBLEM:return{...state,resultProblem:action.resultProblem}
        default: return state;
    }
}

export const solutionReducer=(state=DefaultSolutionState,action)=>{
    switch(action.type){
        case SET_RESULT_SOLUTION_LIST:return{...state,resultSolutionList:action.resultSolutionList}
        default:return state;   
    }
}

export const contractReducer=(state=DefaultContractState,action)=>{
    switch(action.type){
        case SET_RESULT_CONTRACT_LIST:return{...state,resultContractList:action.resultContractList}
        default:return state;   
    }
}


export const rootReducer = combineReducers({
    accountReducer,
    problemReducer,
    solutionReducer,
    contractReducer,
    router: routerReducer
})


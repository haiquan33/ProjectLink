export const LOGIN_GG_SUCCESS="LOGIN_GG_SUCCESS"
export const START_CHECKING_LOGIN_INFO="START_CHECKING_LOGIN_INFO";
export const FINISH_CHECKING_LOGIN_INFO="FINISH_CHECKING_LOGIN_INFO";
export const FINISH_CHECKING_LOGIN_FAILED="FINISH_CHECKING_LOGIN_INFO_FAILED";
export const  LOGIN_REMEMBER="LOGIN_REMEMBER";
export const LOGIN_STATUS_RESET="LOGIN_STATUS_RESET";


export const START_CHECKING_SIGNUP_INFO="START_CHECKING_SIGNUP_INFO";
export const SIGN_UP_SUCCESS="SIGN_UP_SUCCESS";
export const SIGN_UP_FAILED="SIGN_UP_FAILED";

export const SIGN_UP_STATUS_RESET="SIGN_UP_STATUS_RESET";

export const SIGNOUT="SIGNOUT";


export const START_GETTING_USER_INFO_AFTER_LOGIN="START_GETTING_USER_INFO_AFTER_LOGIN";
export const SET_USER_INFO_AFTER_LOGIN="SET_USER_INFO_AFTER_LOGIN";



////////////////////////////////////////

export const SET_RESULT_PROBLEM_LIST="SET_RESULT_PROBLEM_LIST";
export const SET_RESULT_PROBLEM="SET_RESULT_PROBLEM";

//////////////////////////////////////

export const SET_RESULT_SOLUTION_LIST="SET_RESULT_SOLUTION_LIST";




////////////// LOGIN SIGNUP action //////////////////////

//LOGIN

//bắt đầu kiểm tra xem thông tin login đúng ko
export function startCheckingLoginInfo() {
    return {
        type: START_CHECKING_LOGIN_INFO,
    };
} 


//kết thúc  kiểm tra xem thông tin login và login thành công, tham số truyển vào là xAuthToken 
export function finishCheckingLoginInfo(xAuthToken) {
    return {
        type: FINISH_CHECKING_LOGIN_INFO,
        xAuthToken
    };
} 

//kết thúc kiểm tra xem thông tin login vầ thât bại, tham so truyen vao la error
export function finishCheckingLoginInfo_failed(loginError) {
    return {
        type: FINISH_CHECKING_LOGIN_FAILED,
        loginError
    };
} 




// xóa hết các Status của việc login(error,..), KHÔNG PHẢI LÀ log out
export function resetLoginStatus(){
    return {
        type: LOGIN_STATUS_RESET,
        
    };
}




//SIGNUP

//bắt đầu kiểm tra xem thông tin signup hợp lệ không
export function startCheckingSignUpInfo() {
    return {
        type: START_CHECKING_SIGNUP_INFO,
    };
} 


//sign up thanh cong, tham số truyển vào là token của user nếu thành công
export function successSignUp(xAuthToken) {
    return {
        type: SIGN_UP_SUCCESS,
        xAuthToken
    };
}  

//sign up failed, tham số truyển vào là error
export function failedSignUp(signupError) {
    return {
        type: SIGN_UP_FAILED,
        signupError
    };
}  

// xóa hết các Status của signup
export function resetSignUpStatus(){
    return {
        type: SIGN_UP_STATUS_RESET,
        
    };
}


//SIGNOUT

export function signout(){
    return {
        type:SIGNOUT
    }
}

// export function loginGGsuccess(userInfo) {
//     return {
//         type: SET_USER_INFO_AFTER_LOGIN,
//         userInfo
//     };
// } 

    


/////////////// Account Action///////////////


//announce to tart getting user info
export function startGettingUserInfoAfterLogin() {
    return {
        type: START_GETTING_USER_INFO_AFTER_LOGIN
      
    };
} 

// if success then set userinfo to store
export function setUserInfoAfterLogin(userInfo) {
    return {
        type: SET_USER_INFO_AFTER_LOGIN,
        userInfo
    };
} 




///////other action///////


export function set_result_problem_list(list){
    return {
        type: SET_RESULT_PROBLEM_LIST,
        resultProblemList:list
    }
}

export function set_result_problem(problem){
    return {
        type: SET_RESULT_PROBLEM,
        resultProblem:problem
    }
}



//Solutio action

export function set_result_solution_list(solution){
    return{
            type: SET_RESULT_SOLUTION_LIST,
            resultSolutionList:solution
    }
}
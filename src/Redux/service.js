//các API liên quan tới signIn, signUP đều để ở đây, cái tên loginAPI để đó làm màu thôi

import firebase_init, { auth, Authprovider, firestore } from '../firebase.js';



import {

    setUserInfoAfterLogin,
    set_result_problem_list,
    signout,
    set_result_problem
} from './Actions/actions';




const Problem_Table = "Problems";
const AccountData_Table = "AccountData";


export function loginGG() {
    return (dispatch) => {
        auth.signInWithPopup(Authprovider)
            .then((result) => {
                const user = result.user;
                dispatch(setUserInfoAfterLogin(user));

            });

    }
}

export function checkLogged_and_Login_automatically() {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                dispatch(setUserInfoAfterLogin(user))
            }
        });
    }
}


export function get_Problem(id){
    return (dispatch)=>{
        firestore.collection(Problem_Table).doc(id).get().then((doc)=>{
            if (doc.exists){
                    dispatch(set_result_problem(doc.data()));
            }
        })
    }
}

export function get_All_Problem_List(){
    return(dispatch)=>{
        firestore.collection(Problem_Table).get().then((snapshot)=>{
            let list =[];
            snapshot.forEach((doc)=>{
                console.log(doc.id, " => ", doc.data());
                var item={...doc.data(),id:doc.id};
                list.push(item);
            })
            dispatch(set_result_problem_list(list));
        });
      
        
    }
}

export function get_All_Problem_List_from_this_account(accountUID) {
    return (dispatch) => {
        firestore.collection(Problem_Table).where("uid", "==", accountUID).get().then(function (snapshot) {

            let list = [];
            snapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                
                list.push(doc.data());

            });

            dispatch(set_result_problem_list(list));
            console.log("st" + list);
        })
    }
}




export function add_new_problem(accountUID, problem) {
    return (dispatch) => {
        //  firebase_init.database().ref(Problem_Table+accountUID).push().set({problem});

        //Add to problem table
        firestore.collection(Problem_Table).add(problem).then(() => {
            //sau khi thêm dữ liệu problem thì load lại các problem đã tạo
            firestore.collection(Problem_Table).where("uid", "==", accountUID).get().then(function (snapshot) {

                let list = [];
                snapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    list.push(doc.data());

                });

                dispatch(set_result_problem_list(list));
                console.log("st" + list);
            })
        })

    }
}


//đăng nhập bình thường, không thông qua GG hay FB
// export function SignIn_manually(userInfo) {

//     return (dispatch) => {

//         dispatch(startCheckingLoginInfo());

//         fetch(SIGNIN_MANUALLY_API, {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(userInfo)
//         })
//             .then((response) =>
//                 response.json()
//             )
//             .then((response) => {

//                 if (response.token != null)
//                     dispatch(finishCheckingLoginInfo(response.token));
//                 else dispatch(finishCheckingLoginInfo_failed(response.message));

//             })
//             .catch((error) => {
//                 console.log("error", error.json());
//             })
//     }
// }







//sau khi đăng nhập thì lấy user info chung về
// export function get_userInfoAterLogin(xAuthToken) {

//     return (dispatch) => {

//         dispatch(startGettingUserInfoAfterLogin());

//         fetch(GET_USERINFO_AFTER_LOGIN_API, {
//             method: 'get',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-auth-token': xAuthToken
//             },

//         })
//             .then((response) =>
//                 response.json()
//             )
//             .then((response) => {
//                 if (response.data != null) {
//                     console.log(response)
//                     dispatch(setUserInfoAfterLogin(response.data, xAuthToken));
//                 }

//             })
//             .catch((error) => {
//                 console.log("error", error);
//             })
//     }
// }







// reset lại login error
// export function Login_Status_Reset() {

//     return (dispatch) => {
//         dispatch(resetLoginStatus())

//     }
// }


//ssignout user
export function SignOutGG() {

    return (dispatch) => {

        auth.signOut()
            .then(() => {
                dispatch(signout());
            });


    }
}




//đăng kí bình thường, không thông qua GG hay FB
// export function SignUp_manually(userInfo) {


//     return (dispatch) => {
//         dispatch(startCheckingSignUpInfo())
//         fetch(SIGNUP_MANUALLY_API, {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(userInfo)
//         })
//             .then((response) =>
//                 response.json()
//             )
//             .then((response) => {

//                 //if sign up success => data tra về khác null
//                 if (response.data != null) {
//                     console.log(response);
//                     dispatch(successSignUp(response.token));
//                 }
//                 else {

//                     dispatch(failedSignUp(response.message))
//                 }

//             })
//             .catch((error) => {
//                 console.log(error);
//             })
//     }
// }


// // reset lại signup error
// export function SignUp_Status_Reset() {

//     return (dispatch) => {
//         console.log("reset signup");
//         dispatch(resetSignUpStatus())

//     }
// }
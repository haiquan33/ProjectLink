//các API liên quan tới signIn, signUP đều để ở đây, cái tên loginAPI để đó làm màu thôi

import firebase_init, { auth, Authprovider, firestore } from '../firebase.js';

import firebase from 'firebase'
import moment from 'moment'
import {

    setUserInfoAfterLogin,
    set_result_problem_list,
    signout,
    set_result_problem,
    set_result_solution_list,
    set_result_contract_list,
    set_user_wallet_address,
    set_user_company_info,
    set_notification_list
} from './Actions/actions';
import { tokenAPI } from '../BlockChainAPI/tokenAPI.js';
import web3 from '../BlockChainAPI/web3.js';





const Problem_Table = "Problems";
const AccountData_Table = "AccountData";
const Problem_Solution_Table = "ProblemSolution";
const Problem_Contract_Table = "ProblemContract";
const Notify_Table = "NotifyTable"
const NotifcationsCol='notifications'
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
                dispatch(getUserCompanyInfo(user.uid))
                dispatch(getUserNotificationList(user.uid))
            }
        });
    }
}


export function get_Problem(id) {
    return (dispatch) => {
        firestore.collection(Problem_Table).doc(id).get().then((doc) => {
            if (doc.exists) {
                dispatch(set_result_problem(doc.data()));
            }
        })
    }
}

export function get_All_Problem_List() {
    return (dispatch) => {
        firestore.collection(Problem_Table).orderBy('timestamp','desc').get().then((snapshot) => {
            let list = [];
            snapshot.forEach((doc) => {

                var item = { ...doc.data(), id: doc.id };
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

                var item = doc.data();
                item = { ...item, id: doc.id }
                list.push(item);

            });

            dispatch(set_result_problem_list(list));

        })
    }
}




export function add_new_problem(userInfo, problem) {
    return (dispatch) => {
        //  firebase_init.database().ref(Problem_Table+accountUID).push().set({problem});
        const data = {
            ...problem,
            owner: {
                uid: userInfo.uid,
                displayName: userInfo.displayName,
                photoURL: userInfo.photoURL
            },
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'waiting'

        }
        //Add to problem table
        firestore.collection(Problem_Table).add(data).then(() => {
            //sau khi thêm dữ liệu problem thì load lại các problem đã tạo
            firestore.collection(Problem_Table).where("uid", "==", userInfo.uid).get().then(function (snapshot) {

                let list = [];
                snapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots

                    var item = doc.data();
                    item = { ...item, id: doc.id }
                    list.push(item);

                });

                dispatch(set_result_problem_list(list));

            })
        })

    }
}




///////////////// SOLUTION ////////////////////


export function submit_solution(accountUID, problemID, solution) {
    return (dispatch) => {

        firestore.collection(Problem_Solution_Table).doc(problemID).collection("Solutions").doc(accountUID).set({ solution });
    }
}

export function get_solution_list(problemID) {
    return (dispatch) => {
        firestore.collection(Problem_Solution_Table).doc(problemID).collection("Solutions").get().then((querySnapshot) => {
            // if co du lieu thi lay ve
            let list = [];
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                var item = doc.data();
                item = { ...item, id: doc.id }
                list.push(item);
                console.log('list', item)
            });

            if (list.length >= 1)
                dispatch(set_result_solution_list(list))
            else dispatch(set_result_solution_list(null))
        })
    }
}


//----------------------CONTRACT---------------------
export function submit_contract(data) {
    return (dispatch) => {

        firestore.collection(Problem_Contract_Table).doc(data.problemID).set({
            ProblemOwnerID: data.ProblemOwnerID,
            ProblemOwnerSign: data.ProblemOwnerSign,

            SolutionOwnerID: data.SolutionOwnerID,
            SolutionOwnerSign: null,

            deadline_1: data.deadline_1,
            deadline_2: data.deadline_2,
            deadline_3: data.deadline_3,
            firstPaidToken: data.firstPaidToken,
            secondPaidToken: data.secondPaidToken,
            thirdPaidToken: data.thirdPaidToken,
            ProblemOwnerWallet: data.ProblemOwnerWallet,
            IPFSHash: data.IPFSHash,
            status: "pending"


        })
    }
}
// school client submit signature
export function submit_contract_confirmation(data) {
    return (dispatch) => {

        firestore.collection(Problem_Contract_Table).doc(data.problemID).update({
            SolutionOwnerWallet: data.SolutionOwnerWallet,
            SolutionOwnerSign: data.SolutionOwnerSign,
            status: "accepted",
            paid_1_status: 'pending',
            paid_2_status: 'pending',
            paid_3_status: 'pending',



        })

        firestore.collection(Problem_Table).doc(data.problemID).update({

            status: "accepted",



        })
    }
}




export function get_contract_list_of_solution_owner(userID) {
    return (dispatch) => {
        firestore.collection(Problem_Contract_Table).where("SolutionOwnerID", "==", userID).get().then((querySnapshot) => {
            // if co du lieu thi lay ve
            let list = [];
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                var item = doc.data();
                item = { ...item, id: doc.id }
                list.push(item);

            });

            if (list.length >= 1)
                dispatch(set_result_contract_list(list))
            else dispatch(set_result_contract_list(null))
        })
    }
}


export function getContractByProblemID(problemID, afterAction) {
    firestore.collection(Problem_Contract_Table).doc(problemID).onSnapshot((doc) => {
        if (doc.exists) {
            console.log(doc.data())
            afterAction.onSuccess({ ...doc.data(), id: doc.id })
        }
        else {
            afterAction.onFail()
        }
    })

}


export function confirmPaid_1(problemID) {
    firestore.collection(Problem_Contract_Table).doc(problemID).update({

        paid_1_status: 'paid',

    })
}

export function confirmPaid_2(problemID) {
    firestore.collection(Problem_Contract_Table).doc(problemID).update({

        paid_2_status: 'paid',



    })

}
export function confirmPaid_3(problemID) {
    firestore.collection(Problem_Contract_Table).doc(problemID).update({

        paid_3_status: 'paid',



    })

}


export function activeDeadline(problemID, order, afterAction) {
    if (order === 1) {
        tokenAPI.getPaid_1(problemID, (err, amount) => {
            if (!err) {
                const money = amount.toNumber()

                //check if default wallet is the problem owner wallet
                tokenAPI.getProblemOwnerWallet(problemID, (err, address) => {

                    if (String(address).valueOf() === String(web3.eth.defaultAccount).valueOf()) {

                        tokenAPI.lockBalance(money, (err, success) => {
                            if (!err) {

                                afterAction.onSuccess('Đã kích hoạt Deadline thành công, dự án đang ở giai đoạn ' + order)
                                firestore.collection(Problem_Contract_Table).doc(problemID).update({

                                    paid_1_status: 'activated',

                                })
                            }
                            else

                                afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại',err)

                        })
                    }
                    else afterAction.onFail('Đây không phải tài khoản giao dịch của hợp đồng này, xin thử lại với tài khoản có địa chỉ' + String(address).valueOf())
                })

            }
            else afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')

        })
    }
    if (order === 2) {
        tokenAPI.getPaid_2(problemID, (err, amount) => {
            if (!err) {
                const money = amount.toNumber()

                //check if default wallet is the problem owner wallet
                tokenAPI.getProblemOwnerWallet(problemID, (err, address) => {

                    if (String(address).valueOf() === String(web3.eth.defaultAccount).valueOf()) {

                        tokenAPI.lockBalance(money, (err, success) => {
                            if (!err) {

                                afterAction.onSuccess('Đã kích hoạt Deadline thành công, dự án đang ở giai đoạn ' + order)
                                firestore.collection(Problem_Contract_Table).doc(problemID).update({

                                    paid_2_status: 'activated',

                                })
                            }
                            else

                                afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')

                        })
                    }
                    else afterAction.onFail('Đây không phải tài khoản giao dịch của hợp đồng này, xin thử lại với tài khoản có địa chỉ' + String(address).valueOf())
                })

            }
            else afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')

        })
    }
    if (order === 3) {
        tokenAPI.getPaid_3(problemID, (err, amount) => {
            if (!err) {
                const money = amount.toNumber()

                //check if default wallet is the problem owner wallet
                tokenAPI.getProblemOwnerWallet(problemID, (err, address) => {

                    if (String(address).valueOf() === String(web3.eth.defaultAccount).valueOf()) {

                        tokenAPI.lockBalance(money, (err, success) => {
                            if (!err) {

                                afterAction.onSuccess('Đã kích hoạt Deadline thành công, dự án đang ở giai đoạn ' + order)
                                firestore.collection(Problem_Contract_Table).doc(problemID).update({

                                    paid_3_status: 'activated',

                                })
                            }
                            else

                                afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')

                        })
                    }
                    else afterAction.onFail('Đây không phải tài khoản giao dịch của hợp đồng này, xin thử lại với tài khoản có địa chỉ' + String(address).valueOf())
                })

            }
            else afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')

        })
    }


}


export function payContract(problemID, order, afterAction) {
    if (order === 1) {
        tokenAPI.getPaid_1(problemID, (err, amount) => {
            if (!err) {
                const money = amount.toNumber()

                //check if default wallet is the problem owner wallet
                tokenAPI.getProblemOwnerWallet(problemID, (err, address) => {

                    if (String(address).valueOf() === String(web3.eth.defaultAccount).valueOf()) {

                        tokenAPI.getSolutionOwnerWallet(problemID, (err, receiver) => {
                            if (!err) {
                                tokenAPI.pay(receiver, money, { gas: 3000000 }, (err, success) => {
                                    if (success) {
                                        afterAction.onSuccess()
                                        confirmPaid_1(problemID)
                                    }
                                    else {
                                        afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')
                                    }
                                })
                            }
                        })

                    }
                    else afterAction.onFail('Đây không phải tài khoản giao dịch của hợp đồng này, xin thử lại với tài khoản có địa chỉ' + String(address).valueOf())
                })
            }
            else afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')
        })
    }
    if (order === 2) {
        tokenAPI.getPaid_2(problemID, (err, amount) => {
            if (!err) {
                const money = amount.toNumber()

                //check if default wallet is the problem owner wallet
                tokenAPI.getProblemOwnerWallet(problemID, (err, address) => {

                    if (String(address).valueOf() === String(web3.eth.defaultAccount).valueOf()) {

                        tokenAPI.getSolutionOwnerWallet(problemID, (err, receiver) => {
                            if (!err) {
                                tokenAPI.pay(receiver, money, { gas: 3000000 }, (err, success) => {
                                    if (success) {
                                        afterAction.onSuccess()
                                        confirmPaid_2(problemID)
                                    }
                                    else {
                                        afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')
                                    }
                                })
                            }
                        })

                    }
                    else afterAction.onFail('Đây không phải tài khoản giao dịch của hợp đồng này, xin thử lại với tài khoản có địa chỉ' + String(address).valueOf())
                })
            }
            else afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')
        })
    }
    if (order === 3) {
        tokenAPI.getPaid_3(problemID, (err, amount) => {
            if (!err) {
                const money = amount.toNumber()

                //check if default wallet is the problem owner wallet
                tokenAPI.getProblemOwnerWallet(problemID, (err, address) => {

                    if (String(address).valueOf() === String(web3.eth.defaultAccount).valueOf()) {

                        tokenAPI.getSolutionOwnerWallet(problemID, (err, receiver) => {
                            if (!err) {
                                tokenAPI.pay(receiver, money, { gas: 3000000 }, (err, success) => {
                                    if (success) {
                                        afterAction.onSuccess()
                                        confirmPaid_3(problemID)
                                    }
                                    else {
                                        afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')
                                    }
                                })
                            }
                        })

                    }
                    else afterAction.onFail('Đây không phải tài khoản giao dịch của hợp đồng này, xin thử lại với tài khoản có địa chỉ' + String(address).valueOf())
                })
            }
            else afterAction.onFail('Có lỗi xảy ra, vui lòng thử lại')
        })
    }
}

export function createNotification(userID, notiData, type) {
    firestore.collection(Notify_Table).doc(userID).collection('notifications').add({
        notiData,
        type,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
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

///------------- ACCOUNT----------------------
export function addWalletAddress(item, userInfo) {
    return (dispatch) => {

        firestore.collection(AccountData_Table).doc(userInfo.uid).set({
            walletAddress: item
        })
    }
}

export function getUserWalletAdress(userID) {
    return (dispatch) => {

        firestore.collection(AccountData_Table).doc(userID).get().then((doc) => {
            if (doc.exists) {
                let address = doc.data().walletAddress;
                dispatch(set_user_wallet_address(address));
            }
        })
    }
}

export function saveUserCompanyInfo(data, userId) {
    return (dispatch) => {
        firestore.collection(AccountData_Table).doc(userId).set({
            companyInfo: data
        })
    }
}

export function getUserCompanyInfo(userId) {
    return (dispatch) => {
        firestore.collection(AccountData_Table).doc(userId).get().then((doc) => {
            if (doc.exists) {
                let companyInfo = doc.data().companyInfo;
                dispatch(set_user_company_info(companyInfo))
            }
        })
    }
}

export function getUserNotificationList(userId) {
    return (dispatch) => {
        firestore.collection(Notify_Table).doc(userId).collection(NotifcationsCol).orderBy('timestamp','desc').onSnapshot((snapshot) => {
            let list = [];
            snapshot.forEach((doc) => {

                var item = { ...doc.data(), id: doc.id };
                list.push(item);
            })
            dispatch(set_notification_list(list));
        });

    }
}


export function getUserCompanyInfoForViewing(userId, callback) {
    console.log(userId)
    firestore.collection(AccountData_Table).doc(userId).get().then((doc) => {
        if (doc.exists) {
            let companyInfo = doc.data().companyInfo;
            callback(companyInfo)
        }
    })

}

export function requestPay(problemID, order, afterAction) {
    let deadline
    if (order === 1) {
        tokenAPI.getDeadline_1(problemID, (err, res) => {
            if (!err) {

                //if the current date was pass the deadline day
                if (moment(moment().format()).isAfter(res)) {

                    firestore.collection(Problem_Contract_Table).doc(problemID).update({

                        paid_1_status: 'requesting',

                    })
                    afterAction.onSuccess()
                }
                else {
                    afterAction.onFail()
                }
            }
        })
    }
    if (order === 2) {
        tokenAPI.getDeadline_2(problemID, (err, res) => {
            if (!err) {

                //if the current date was pass the deadline day
                if (moment(moment().format()).isAfter(res)) {

                    firestore.collection(Problem_Contract_Table).doc(problemID).update({

                        paid_2_status: 'requesting',

                    })
                    afterAction.onSuccess()
                }
                else {
                    afterAction.onFail()
                }
            }
        })
    }
    if (order === 3) {
        tokenAPI.getDeadline_3(problemID, (err, res) => {
            if (!err) {

                //if the current date was pass the deadline day
                if (moment(moment().format()).isAfter(res)) {

                    firestore.collection(Problem_Contract_Table).doc(problemID).update({

                        paid_3_status: 'requesting',

                    })
                    afterAction.onSuccess()
                }
                else {
                    afterAction.onFail()
                }
            }
        })
    }

}


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
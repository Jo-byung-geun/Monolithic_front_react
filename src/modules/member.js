import axios from 'axios';
import { logout } from "../services/MemberService";

const LOGIN_MEMBER='member/LOGIN_MEMBER';
const LOGOUT_MEMBER='member/LOGOUT_MEMBER';


//액션 생성 함수
// export function setMember(data){
export function loginMember(){
    console.log('[loginMember] name',localStorage.getItem('name'));
    return{
        type: LOGIN_MEMBER,
        payload:{
            name:localStorage.getItem('name'),
            memberId:localStorage.getItem('memberId'),
            accessToken:localStorage.getItem('accessToken'),
            refreshToken:localStorage.getItem('refreshToken'),
            email:localStorage.getItem('email')
        }
    }
}

export function logoutMember(){
    console.log('header.js - logout');
    initialize();
    return{
        type:LOGOUT_MEMBER,
        //payload
    }
}

// clear localStorage
export function initialize(){
    localStorage.setItem('accessToken',null);
    localStorage.setItem('refreshToken',null);
    localStorage.setItem('memberId',0);
    localStorage.setItem('email',null);
    localStorage.setItem('name',null);
    //alert('LOGOUT');

}

// reset accessToken by refreshToken
export function renew_accessToken(accessToken){
    console.log('renew accessToken',accessToken);
    localStorage.setItem('accessToken',accessToken);
}

//모듈 초기 상태
const initialState={
    name:'guest',
    accessToken:'none',
    refreshToken:'none',
    memberId:0,
    email:'none'
    // member:null
};

// 리듀서
export default function member(state=initialState,action){
    switch(action.type){
        case LOGIN_MEMBER:
            console.log('LOGIN');
            return{
                name:action.payload.name,
                memberId:action.payload.memberId,
                accessToken:action.payload.accessToken,
                refreshToken:action.payload.refreshToken,
                email:action.payload.email
                // member: action.payload
            };
        case LOGOUT_MEMBER:
            //alert('LOGOUT');
            return{
                name:'guest',
                accessToken:'none',
                memberId:0,
                member:null
            };
        default:
            return state;
    }
}
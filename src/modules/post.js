import axios from 'axios';

const GET_POSTS='post/GET_POSTS';

// 액션 생성 함수
export async function getPosts(){
    const response=await axios.get(`http://localhost:8080/community`);
    console.log('community response - ',response);

    return{
        type:GET_POSTS,
        payload:{
            posts:response.data.result
        }
    }
}

// 모듈 초기 상태
const initialState={

}
// 리듀서
export default function post(state={},action){
    switch(action.type){
        case GET_POSTS:
            return{
                posts:action.payload
            };
        default:
            return state;
    }
}
import React, { useState,useEffect } from "react";
import { useNavigate, useParams,useLocation } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { useSelector } from 'react-redux';
import { getPostInfo,addBookmark,deleteBookmark,deleteMyPost } from "../../../services/PostService";
import { makeSurveyFromPost, postSurveyThumbnail } from "../../../services/SurveyService";


function ViewPostPage(props){
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const location = useLocation();
    const [post,setPost]=useState({});
    const [bookmark,setBookmark]=useState([]);
    const [unBookmark,setUnBookmark]=useState([]);
    const [member,setMember]=useState([]); // 회원==true, 비회원==false
    const [myPost,setMyPost]=useState([]); // 자신이 쓴 글==true, 다른 사람이 쓴 글==false
    const [noLoop, setNoLoop] = useState(false);
    const postId=location.state.postId;
    const [successCreatingSurvey,setSuccessCreatingSurvey]=useState(false); // 마음에 드는 설문지 내보내기 하면 저장되었다는 alert -> 띄우기==true / 닫기==false
    var thumbnail;
    useEffect(()=>{
        setSuccessCreatingSurvey(false);
        getPostInfo(postId).then((response)=>{
            console.log('view post page response',response);
            
            // 회원, 비회원 구분
            if(response.member_case===true){
                setMember(true);
            }
            else if(response.member_case===false){
                setMember(false);
            }
            // 즐겨찾기 여부
            if(response.isBookmarked===false){
                setBookmark(true); // 즐겨찾기 하기 버튼
                setUnBookmark(false);
            }
            else if(response.isBookmarked===true){
                setBookmark(false); // 즐겨찾기 취소 버튼
                setUnBookmark(true);
            }
            // 자신이 쓴 글, 다른 사람이 쓴 글 구분
            console.log('localStorage: ',typeof(localStorage.getItem('memberId')));
            console.log('response id',response.authorId);
            if(response.authorId===Number(localStorage.getItem('memberId'))){
                setMyPost(true);
                setBookmark(false);
                setUnBookmark(false);
            }
            else if(response.authorId!==Number(localStorage.getItem('memberId'))){
                setMyPost(false);
            }

            setPost(response);
            
        })
    },[]);
    thumbnail='/images/'+post.thumbnail+'.jpg';
    // post.thumbnail=(post.thumbnail).substring(1,(post.thumbnail).length);
    console.log('thumbnail: ',post.thumbnail);
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {successCreatingSurvey&&<div class="text-center pt-4 lg:px-4">
                        <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                            <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
                            <span class="font-semibold mr-2 text-left flex-auto">해당 설문지가 임시저장되었습니다! 설문 관리 페이지에서 확인해보세요!</span>
                            <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                        </div>
            </div>}

            <div class='flex flex-row h-screen items-center md:w-full justify-center'>
                    <div class='flex flex-row justify-center md:w-full md:h-screen mt-40'>
                        <div class='flex flex-col' onClick={()=>{
                        // 피설문자가 보는 화면으로 연결 -> 그 약간 설문지 미리보기 느낌~
                        }}>
                            <img class="md:w-full md:h-4/6 md:rounded-xl" src={thumbnail}/>
                            <div class='font-bold md:h-1/6 text-center text-2xl mt-5 text-sky-500 dark:text-sky-400'>
                                {post.surveyTitle}
                            </div>                            
                        </div>
                        <div class='flex flex-col ml-28 w-1/2 '>
                            <div>
                                <div class='border border-gray-500 rounded-md p-5'>
                                    <div class='flex flex-row'>
                                        <div class='font-bold text-start text-2xl flex-2 md:w-10/12 text-slate-700'>
                                            {post.title}
                                        </div>
                                        {member&&<div class='flex flex-row justify-items-stretch'>
                                            {bookmark&&<img class="h-7 w-7 mb-5 justify-self-end mr-5" src="/images/emptystar.png" onClick={()=>{
                                                // 클릭 시 북마크 추가
                                                addBookmark(post.postId).then((response)=>{
                                                    setBookmark(false); // 북마크 된 글 -> 북마크 취소하기 버튼 -> 채워진 별
                                                    setUnBookmark(true);
                                                })
                                            }}/>}
                                            {unBookmark&&<img class="h-7 w-7 mb-5 justify-self-end mr-5" src="/images/star.png" onClick={()=>{
                                                // 클릭 시 북마크 취소
                                                deleteBookmark(post.postId).then((response)=>{
                                                    setBookmark(true);  // 북마크 안된 글 -> 북마크 하기 버튼 -> 빈 별
                                                    setUnBookmark(false);
                                                })
                                            }}/>}
                                            {!myPost&&<img class='h-7 w-7 mb-5 justify-self-end' src="/images/share.png" onClick={()=>{
                                                // 클릭 시 해당 게시물의 설문지 임시저장
                                                makeSurveyFromPost(post.surveyId).then((response)=>{
                                                    if(response.data.code===1000){
                                                        // setSuccessCreatingSurvey(true);
                                                        setSuccessCreatingSurvey(true);
                                                        console.log('successCreatingSurvey',successCreatingSurvey);
                                                        console.log(response)
                                                        postSurveyThumbnail(response.data.result.surveyId);
                                                        setTimeout(function() {
                                                            setSuccessCreatingSurvey(false);
                                                        }, 3000);
                                                    }
                                                })
                                            }}/>}
                                            {myPost&&<img class="h-7 w-7 mb-5 justify-self-end" src="/images/trash.png" onClick={()=>{
                                                // 클릭 시 게시글 삭제
                                                deleteMyPost(post.postId).then((response)=>{
                                                    navigate('/myPage');
                                                })
                                            }}/>}
                                    </div>}
                                </div>
                                <div class='font-medium text-start text-slate-500 mb-5'>
                                    작성자: {post.authorName}
                                </div>
                                <div class='font-medium text-start text-slate-500 mb-5'>
                                    작성일자: {post.uploadDate}
                                </div> 
                                <div class='font-medium text-start text-slate-500'>
                                    피설문자 만족도: {post.averageSatisfaction}
                                </div> 

                            </div>
            
                            <div class='font-medium text-start text-slate-500 mt-5 ml-5 mr-5'>
                                {post.contents}
                            </div>                                                   
                        </div>  
                    </div>
                </div>
            </div>
      </div>
    );

}
export default ViewPostPage;
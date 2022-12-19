import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {addBookmark, deleteBookmark, deleteMyPost} from '../../services/PostService';
import { useCallback } from "react";
import { deleteSurvey, updateSurveyStatus } from "../../services/SurveyService";
import member,{ logoutMember } from "../../modules/member";

function ListItem(props) {
    const {key,item,case_,type,survey_type, onClick,deletePostItem,deleteBookmarkItem,deleteSurveyItem,goFinishedSurveyItem,checkSatisfactionAlert}=props;
    const navigate=useNavigate();
    const Dispatch = useDispatch();
    // buttonShown: 회원인지/비회원인지, bookmark_button: 북마크하기 버튼, unbookmark_button: 북마크 취소 버튼, 
    // post_case: 내가 작성한 글인지/남이 작성한 글인지, item_case: 게시글인지/설문지인지, 
    const [buttonShown,setButtonShown]=useState([]);
    const [bookmarkButton,setBookmarkButton]=useState([]);
    const [unbookmarkButton,setUnbookmarkButton]=useState([]);
    const [post,setPost]=useState([]);
    const [myPost,setMyPost]=useState([]);
    const [itemCase,setItemCase]=useState([]);
    const [notFinished,setNotFinished]=useState([]);
    const [surveying,setSurveying]=useState([]);
    const [finished,setFinished]=useState([]);
    const [selectSurvey,setSelectSurvey]=useState([]);

    const member=useSelector(state=>state.member);


    useEffect(()=>{
        setSelectSurvey(false);
    
        if(item.member_case===false) setButtonShown(false); // 비회원의 커뮤니티 접근
        else if(localStorage.getItem('memberId')==='0') setButtonShown(false);
        else setButtonShown(true); //회원의 커뮤니티 접근
    
        if(item.isBookmarked==false) {  // 북마크 안된 글 -> 북마크 하기 버튼 -> 빈 별
            setBookmarkButton(true);
            setUnbookmarkButton(false);
        }
        else{   // 북마크 된 글 -> 북마크 취소하기 버튼 -> 채워진 별
            setBookmarkButton(false);
            setUnbookmarkButton(true);
        } 

        // // mypage
        // if(case_===1) setPostCase(true); // 북마크
        // else if(case_===2) {
        //     console.log('case_: mypostList임');
        //     setPostCase(false); // 내가 작성한 글 -> 쓰레기통
        // }

        // community, mypage
        if(item.authorId===Number(localStorage.getItem('memberId'))){
            setBookmarkButton(false);
            setUnbookmarkButton(false);
            setSelectSurvey(false);
            setMyPost(true);
        } 
        else {
            setPost(true); // 북마크
            setSelectSurvey(false);
            setMyPost(false);
        }

        if(type==='post') {
            setItemCase(true); // 게시글
            setSelectSurvey(false);
        }
        else if(type==='select_survey') { // 설문지 작성 시 select survey
            setSelectSurvey(true);
            setBookmarkButton(false);
            setUnbookmarkButton(false);
           
        }
        else {
            setItemCase(false); // 설문지
            setSelectSurvey(false);
        }


        if(survey_type==='notfinished'){ // 임시 저장된 설문지
            setNotFinished(true);
            setSurveying(false);
            setFinished(false);

            setBookmarkButton(false);
            setUnbookmarkButton(false);
        }
        else if(survey_type==='surveying'){ // 설문 중인 설문지
            setNotFinished(false);
            setSurveying(true);
            setFinished(false);

            setBookmarkButton(false);
            setUnbookmarkButton(false);
        }
        else if(survey_type==='finished'){ // 설문 완료된 설문지
            setNotFinished(false);
            setSurveying(false);
            setFinished(true);
           
            setBookmarkButton(false);
            setUnbookmarkButton(false);
        }
    },[localStorage.getItem('memberId')]);
    
    // item.thumbnail='./'+item.thumbnail;
    // useCallback(()=>{
    //     if(buttonShown===false) setButtonShown(true);
    //     else setButtonShown(false);
    // },[buttonShown]);

    // useCallback(()=>{
    //     if(bookmarkButton===false) setBookmarkButton(true);
    //     else setBookmarkButton(false);
    // },[bookmarkButton]);

    // useCallback(()=>{
    //     if(unbookmarkButton===false) setUnbookmarkButton(true);
    //     else setUnbookmarkButton(false);
    // },[unbookmarkButton]);
    var thumbnail='/images/'+item.thumbnail+'.jpg';
    return (
        <div class="rounded-xl">
            <div class="relative md:w-full md:h-1/2">
                <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none ">
                    <img class="md:w-full md:h-1/2 md:rounded-xl mx-auto" src={thumbnail}/>
                </div>
                {/* hover images */}
                {/* 커뮤니티 게시글 */}
                {buttonShown&&<div class="absolute bottom-0 opacity-0 hover:opacity-100 md:w-full md:h-full flex justify-center items-end">
                    {bookmarkButton&&<img class="h-7 w-7 mb-5" src="images/emptystar.png" onClick={()=>{
                        // 클릭 시 북마크 추가
                        addBookmark(item.postId).then((response)=>{
                            if(response===100) Dispatch(logoutMember());
                            else{
                                setBookmarkButton(false); // 북마크 된 글 -> 북마크 취소하기 버튼 -> 채워진 별
                                setUnbookmarkButton(true);
                            }
                            
                        })
                    }}/>}
                    {unbookmarkButton&&<img class="h-7 w-7 mb-5" src="images/star.png" onClick={()=>{
                        // 클릭 시 북마크 취소
                        deleteBookmark(item.postId).then((response)=>{
                            if(response===100) Dispatch(logoutMember());
                            else{
                                setBookmarkButton(true);  // 북마크 안된 글 -> 북마크 하기 버튼 -> 빈 별
                                setUnbookmarkButton(false);
                                if(case_===2)deleteBookmarkItem(item.postId);
                            }
                            
                        })
                    }}/>}
                    {myPost&&<img class="h-7 w-7 mb-5" src="images/trash.png" onClick={()=>{
                        // 클릭 시 게시글 삭제
                        deleteMyPost(item.postId).then((response)=>{
                            deletePostItem(response.postId);
                        })
                    }}/>}

                    {/* 설문지 선택 */}
                    {selectSurvey&&<button class='rounded border-gray-900 border-2 mb-5 px-1' onClick={()=>{
                        // 클릭 시 설문지 선택
                        navigate(`/post/createPost/${item.surveyId}`,{state:{postId:item.surveyId}});
                    }}>SELECT</button>}

                    {/* 설문 관리 - 설문지 상태 관리 */}
                    {/* {!itemCase&&notFinished&&<button class='rounded border-2 mr-5 mb-5 px-1' onClick={()=>{
                        // 클릭 시 설문지 제작으로 이동
                        console.log('설문지 관련 버튼');
                    }}>VIEW</button>}
                    {!itemCase&&notFinished&&<button class='rounded border-2 mb-5 px-1' onClick={()=>{
                        // 클릭 시 설문지 삭제
                        deleteSurvey(item.surveyId).then((response)=>{
                            console.log('ListItem deleteSurvey',response);
                            deleteSurveyItem(response.surveyId);
                        })
                    }}>DELETE</button>}
                    {!itemCase&&surveying&&<button class='rounded border-2 mb-5 px-1' onClick={()=>{
                        // 클릭 시 설문중인 설문지 상태 설문 완료로 변경
                        updateSurveyStatus(item.surveyId).then((response)=>{
                        console.log('updateSurveyStatus');
                        goFinishedSurveyItem(response.surveyId);
                        })
                    }}>Finish</button>}
                    {!itemCase&&finished&&<button class='rounded border-2 mb-5 px-1' onClick={()=>{
                        // 클릭 시 설문 완료된 설문지의 결과 페이지로 이동
                    }}>Result</button>} */}
                
                </div>}
                
            </div>
            <div class="pt-6 md:pb-0 space-y-4 text-left md:h-1/2 flex flex-col" onClick={()=>{
                if(itemCase===true){
                    // 게시글
                    navigate(`/post/${item.postId}`,{state:{postId:item.postId}});
                }
                }}>
                <div>
                    <div className="flex flex-col">
                        <div className='flex flex-row items-center justify-between'>
                            <h3 className="mt-4 text-2xl pl-3 text-gray-900 md:w-full md:mt-10">
                                {item.title}
                            </h3>
                            {/* {selectSurvey&&<h4 className="mt-7 text-light opacity-0 hover:opacity-100 text-rose-900 md:w-8/12">
                                피설문자 만족도: {item.satisfaction}</h4>} */}
                        </div>
                        {itemCase&&!selectSurvey&&<p className="mt-1 text-sm pl-3 text-gray-700">작성자: {item.authorName}</p>}
                    </div>
                    {itemCase&&!selectSurvey&&<p className="text-sm font-medium pl-3 text-gray-500">작성일자: {item.uploadDate}</p>}
                </div>
                    
                    {/* <div class="justify-items-center text-center font-bold pb-2 text-2xl text-sky-500 dark:text-sky-400">
                        {item.title}
                    </div>
                    {itemCase&&<div class='justify-items-start'>
                        <div class="font-light text-center text-slate-700 dark:text-slate-500">
                            작성자: {item.authorName}
                        </div>
                        <div class="font-light text-center text-slate-700 dark:text-slate-500">
                            작성일자: {item.uploadDate}
                        </div>
                    </div>} */}
            </div>
            
        </div>

    );
    
}

export default ListItem;
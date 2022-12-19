import React, { useState,useEffect } from "react";
import { useParams } from "react-router";
import { useNavigate,useLocation} from "react-router-dom";
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import {getSurveyInfo} from '../../../services/SurveyService';
import { createPost } from "../../../services/PostService";
import { logout } from "../../../services/MemberService";


function CreatePostPage(props) {
    const navigate = useNavigate();
    const Dispatch=useDispatch();
    const [surveyInfo,setSurveyInfo]=useState([]);
    const [title,setTitle]=useState([]);
    const [content,setContent]=useState([]);
    const [alert,setAlert]=useState([]);
    const location=useLocation();
    const surveyId=location.state.postId;
    console.log("survey: ",surveyId);

    var thumbnailPath;
    useEffect(() => {
        getSurveyInfo(surveyId).then((response)=>{
            if(response===100) {
                logout();
                navigate('/');
            }
            console.log('response: ',response);
            setSurveyInfo(response);
            console.log('surveyInfo',surveyInfo);
            console.log('type of thumbnailPath: ',typeof(thumbnailPath));

            //console.log('surveyInfo.thumbnail',surveyInfo.thumbnail);
            // console.log('thumbNum',surveyInfo.thumbnail);
            setAlert(false);
        })
    }, [])
    var thumbnail='/images/'+surveyInfo.thumbnail+'.jpg';
    
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {alert&&<div class="text-center pt-4 lg:px-4">
                        <div class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                            <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">New</span>
                            <span class="font-semibold mr-2 text-left flex-auto">게시글이 등록되었습니다! 다른 회원들에게 많은 도움이 될거에요!</span>
                            <svg class="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                        </div>
            </div>}
            <div class='flex flex-row h-screen items-center md:w-full justify-center'>
                    <div class='flex flex-row justify-center md:w-full md:h-screen mt-40'>
                        <div class='flex flex-col w-1/2'>
                            <img class="md:w-full md:h-4/6 object-fill md:rounded-xl" src={thumbnail}/>
                            <div class='font-bold md:h-1/6 text-center text-2xl mt-5 text-sky-500 dark:text-sky-400'>
                                {surveyInfo.title}
                            </div>                            
                        </div>
                        <div class='flex flex-col ml-28 w-1/2 '>
                            <div>
                                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-bold mb-5 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="제목을 간단하게 입력해주세요!" required
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        console.log('title: ',title);
                                    }}
                                />
                            </div>                   
                            <textarea rows="4" class="block p-2.5 md:h-3/5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="설문지에 대한 설명을 작성해주세요!&#13;&#10;어떤 목적으로 제작한 설문지인지, 원하는 정보를 수집했는지 등등 자유롭게 작성해주세요!&#13;&#10;대신 다른 사람들에게 도움이 되는 내용이면 더 좋을 거 같아요~"
                                    onChange={(e) => {
                                        setContent(e.target.value);
                                        console.log('content: ',content);
                                    }}
                            />
                            <button
                                type="button"
                                disabled={alert}
                                className="mt-5 self-center md:w-1/3 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={()=>{
                                    createPost(title,content,surveyId).then((response)=>{
                                        // if(response===100){
                                        //     logout();
                                        //     navigate();
                                        // }
                                        if(response===1000){
                                            setAlert(true);
                                            setTimeout(function() {
                                                setAlert(false);
                                                navigate('/community');
                                            }, 1000);
                                        }
                                    })
                                }}
                             >
                               글 등록하기
                             </button>

                            </div>
                    </div>
            </div>
      </div>
    );
    
}








export default CreatePostPage;
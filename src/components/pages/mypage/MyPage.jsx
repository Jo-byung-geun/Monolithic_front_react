import React, { useState,useEffect } from "react";
import { Await, Navigate, useNavigate } from "react-router-dom";
import member, { loginMember,logoutMember } from '../../../modules/member';
import { logout } from '../../../services/MemberService'
import { useSelector,useDispatch } from 'react-redux';
import List from '../../list/List';
// import post,{getPosts} from '../../modules/post';
import axios from 'axios';
import {getMyPagePosts} from '../../../services/PostService';
function MyPage(props) {
  const Dispatch = useDispatch();
  const navigate = useNavigate();

  const [bookmarkList, setBookmarkList] = useState([]);
  const [mypostList, setMypostList] = useState([]);
  const [emptyBookmarkList,setEmptyBookmarkList]=useState();
  const [emptyMyPostList,setEmptyMyPostList]=useState();

  const member=useSelector(state=>state.member);
 
  useEffect(()=>{
    //Dispatch(getPosts());
    getMyPagePosts().then((response)=>{
        console.log('mypage response',response);
        if(response===100){
          alert("Comfy를 사용하고 싶으시면 로그인해주세요!");
          Dispatch(logoutMember());
          navigate('/community');
        }
        // if(localStorage.getItem('memberId')==='0'){
        //   Dispatch(logoutMember());
        //   // Navigate('/');
        // }
        else{
          console.log('mypage response',response);
          

          if(response.bookmarks.length===0) setEmptyBookmarkList(true);
          else if(response.bookmarks.length>0) setEmptyBookmarkList(false);
          
          if(response.myposts.length===0) setEmptyMyPostList(true);
          else if(response.myposts.length>0) setEmptyMyPostList(false);

          setBookmarkList(response.bookmarks);
          setMypostList(response.myposts);
          
          console.log('empty bookmark',emptyBookmarkList);
          console.log('empty my posts',emptyMyPostList);
        }
        
    });
    
  },[]);

  useEffect(()=>{
    if(bookmarkList.length===0) setEmptyBookmarkList(true);
    else if(bookmarkList.length>0) setEmptyBookmarkList(false);
  },[bookmarkList]);

  useEffect(()=>{
    if(mypostList.length===0) setEmptyMyPostList(true);
    else if(mypostList.length>0) setEmptyMyPostList(false);
  },[mypostList]);


  // 북마크 취소 즉시 반영
  const deleteBookmark=(itemId)=>{
    console.log('mypage - deleteBookmark - itemId',itemId);
    const afterDeleteItemList=bookmarkList.filter((it)=>it.postId!==itemId);
    setBookmarkList(afterDeleteItemList);
  }

  // 게시글 삭제 즉시 반영
  const deletePost=(itemId)=>{
    const afterDeleteItemList=mypostList.filter((it)=>it.postId!==itemId);
    setMypostList(afterDeleteItemList);
  }

  
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div class="px-5 flex flex-col md:h-full pt-5">
          <div class='md:h-fit'>
              <p class="text-2xl font-bold text-gray-900">즐겨찾기</p>
              {emptyBookmarkList&&<div className="h-96 flex justify-center items-center text-2xl text-bold text-sky-400">마음에 드는 게시물을 즐겨찾기 해보세요!</div>}
              {bookmarkList&&<List items={bookmarkList} case_={2} type='post' deleteBookmark={deleteBookmark}/>}
          </div>

          <div class='md:h-fit'>
              <p class="text-2xl font-bold text-gray-900">내가 작성한 게시물</p>
              {emptyMyPostList&&<div className="h-96 flex justify-center items-center text-2xl text-bold text-sky-400">공유하고 싶은 설문지를 커뮤니티에 공유해보세요!</div>}
              {mypostList&&<List items={mypostList} case_={2} type='post' deletePost={deletePost}/>}
          </div>
          
        </div>
      </div>
    )    
}

export default MyPage;
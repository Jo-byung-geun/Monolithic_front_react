import React, { useState,useEffect } from "react";
import { Await, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import List from '../../list/List';
import axios from 'axios';
import {getPosts, getSearchedPosts} from '../../../services/PostService';
import { useCallback } from "react";
function MainPage(props) {
  const Dispatch = useDispatch();
  const navigate = useNavigate();
  const [postList, setpostList] = useState([]);
  const [word,setWord]=useState([]);
  const [newPostButton,setNewPostButton]=useState([]);
  const member=useSelector(state=>state.member);

  // 게시글 삭제 즉시 반영
  const deletePost=(itemId)=>{
    const afterDeleteItemList=postList.filter((it)=>it.postId!==itemId);
    setpostList(afterDeleteItemList);
  }

  // 검색
  const search =() => {
    getSearchedPosts(word).then((response)=>{
      setpostList(response);
      console.log('onSubmit',response);
    })
  };

  // useEffect(()=>{

  // },postList);

  useEffect(()=>{
    getPosts().then((response)=>{
      console.log('mainpage response',response);
      setpostList(response);
      if(localStorage.getItem('memberId')==='0') {
        setNewPostButton(false);
      }
      else setNewPostButton(true);
    });
  },[member]);
  
  // const posts=useSelector(state=>state.post);
  console.log('MainPage - postList',postList);

    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div class='flex flex-row items-center'>
          {newPostButton&&<button
            type="button"
            className="mt-5 mr-auto inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={()=>{
              navigate("/selectSurvey");
              
            }}
          >
            새로운 글 작성
          </button>}
          <div class='md:w-2/6 mt-5 ml-96'>   
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
              <div class="relative">
                  <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-blue-100 dark:border-blue-100 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="제목으로 찾아드립니다!" required=""
                    onChange={(e) => {
                      console.log('onChange - word',word);
                      setWord(e.target.value);
                    }}
                  />
                  <button class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                    onClick={()=>{
                      getSearchedPosts(word).then((response)=>{
                        setpostList(response);
                        console.log('search',response);
                      })
                    }}>검색
                  </button>
              </div>
          </div>
        </div>
        

        <div class="flex flex-col">
          {/* <div className="flex items-center"> */}
            {postList&&<List items={postList} case_={1} type='post' deletePost={deletePost}/>}
          {/* </div> */}
        </div>
      </div>
    )    
}

export default MainPage;
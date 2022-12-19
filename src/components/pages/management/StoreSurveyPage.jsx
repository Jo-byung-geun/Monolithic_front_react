import React, { useState,useEffect } from "react";
import { Await, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import List from '../../list/List';
// import post,{getPosts} from '../../modules/post';
import axios from 'axios';
import {getSurveys} from '../../../services/SurveyService';

function StoreSurveyPage(props) {
  const Dispatch = useDispatch();
  var notFinished=new Array();
  var surveying=new Array();
  var finished=new Array();
  const [notFinishedList,setNotFinishedList]=useState([]);
  

  useEffect(()=>{
    //Dispatch(getPosts());
   
    getSurveys().then((response)=>{
      console.log('management response',response);
      response.map((res)=>{
        if(res.status==="notFinish"){
          notFinished.push(res);
        }
      })
      setNotFinishedList(notFinished);
    });
  
    
  },[]);

  // 설문지 삭제 즉시 반영
  const deleteSurvey=(itemId)=>{
    const afterDeleteItemList=notFinishedList.filter((it)=>it.surveyId!==itemId);
    setNotFinishedList(afterDeleteItemList);
  }
  
    return (
      <div className="bg-gray-100 mx-auto max-w-7xl px-4 sm:px-6">
        <div class="flex flex-col">
          <div>
              <p class="text-2xl font-bold text-sky-500">임시 저장된 설문지</p>
              <div class='basis-1/4'>
                {notFinishedList&&<List items={notFinishedList} type='survey' survey_type='notfinished' deleteSurvey={deleteSurvey}/>}
              </div>
          </div>
        </div>
      </div>
    )    

}
export default StoreSurveyPage;
import React, { useState,useEffect } from "react";
import { Await, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import List from '../../list/List';
// import post,{getPosts} from '../../modules/post';
import axios from 'axios';
import {getSurveys} from '../../../services/SurveyService';
function ManageSurveyPage(props) {
  const Dispatch = useDispatch();
  var notFinished=new Array();
  var surveying=new Array();
  var finished=new Array();
  
  const [surveyingList,setSurveyingList]=useState([]);
  const [finishedList,setFinishedList]=useState([]);

  useEffect(()=>{
    //Dispatch(getPosts());
   
    getSurveys().then((response)=>{
      console.log('management response',response);
      response.map((res)=>{
        if(res.status==="surveying"){
          surveying.push(res);
        }
        else if(res.status==='finish'){
          finished.push(res);
        }
      })
     
      setSurveyingList(surveying);
      setFinishedList(finished);
    });
  
    
  },[]);



  // 설문지 상태 설문 완료로 즉시 반영
  const goFinished=(itemId)=>{
    console.log('surveyId:',itemId);
    const changedItem=surveyingList.filter((it)=>it.surveyId===itemId);
    // 설문중인 설문지 리스트에서 삭제
    const afterDeleteItemList=surveyingList.filter((it)=>it.surveyId!==itemId);
    setSurveyingList(afterDeleteItemList);
    // 설문완료 설문지 리스트에 추가
    console.log('changedItem',changedItem);
    const afterSurveyStatusChangedList=finishedList.concat(changedItem);
    console.log('afterSurveyStatusChangedList',afterSurveyStatusChangedList);
    setFinishedList(afterSurveyStatusChangedList);
  }

    return (
      <div className="bg-gray-100 mx-auto max-w-7xl px-4 sm:px-6">
        <div class="flex flex-col">
          <div>
              <p class="text-2xl font-bold text-sky-900">설문 중인 설문지</p>
              <div>
                {surveyingList&&<List items={surveyingList} type='survey' survey_type='surveying' goFinished={goFinished}/>}
              </div>
          </div>
          <div>
              <p class="text-2xl font-bold text-sky-500">설문 완료된 설문지</p>
              <div class='basis-1/4'>
                {finishedList&&<List items={finishedList} type='survey' survey_type='finished'/>}
              </div>
          </div>
        </div>
      </div>
    )    
}

export default ManageSurveyPage;
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ManageService from '../../../services/ManageService'
import FinishedItem from './item/FinishedItem'
import SurveyingItem from './item/SurveyingItem'
import { useSelector,useDispatch } from 'react-redux';
import member, { loginMember,logoutMember } from '../../../modules/member';
import { logout } from '../../../services/MemberService'
import { useNavigate } from 'react-router-dom'

function ManageSurvey() {

  const [surveyingList, setsurveyingList] = useState([]);
  const [surveyingListStatus,setSurveyingListStatus]=useState(false);
  const [finishListStatus,setFinishListStatus]=useState(false);
  const [finishList, setFinishList] = useState([]);
  const Dispatch=useDispatch();
  const navigate = useNavigate();

  //설문 중인 설문지 가져오기 
  useEffect(() => {
    ManageService.getSurveyByStatus('surveying').then((res) => {
      if(res.data.code===2002) {
          alert("Comfy를 사용하고 싶으시면 로그인해주세요!");
          Dispatch(logoutMember());
          navigate('/community');
      }
      else{
        setsurveyingList(res.data.result);
        setSurveyingListStatus(true);
      //   Navigate('/');
      }
      console.log("survey data : ", res.data.result);

      ManageService.getSurveyByStatus('finish').then((res) => {
        if(res.data.code===2002) {
            // alert("Comfy를 사용하고 싶으시면 로그인해주세요!");
            // Dispatch(logoutMember());
            // Navigate('/community');
        }
        else{
          setFinishList(res.data.result);
          setFinishListStatus(true);
        //   Navigate('/');
        }
        console.log("survey data : ", res.data.result);
      })
    })
  }, [])

  
  //설문 완료된 설문지 가져오기 
  // useEffect(() => {
    // ManageService.getSurveyByStatus('finish').then((res) => {
    //   if(res.data.code===2002) {
    //       // alert("Comfy를 사용하고 싶으시면 로그인해주세요!");
    //       // Dispatch(logoutMember());
    //       // Navigate('/community');
    //   }
    //   else{
    //     setFinishList(res.data.result);
    //     setFinishListStatus(true);
    //   //   Navigate('/');
    //   }
    //   console.log("survey data : ", res.data.result);
    // })
  // }, [])

  // const changeStatus=(surveyId)=>{
  //   const changedItem=surveyingList.filter((it)=>it.surveyId===surveyId);
  //   const after
  // }

 
  return (
    
    <div className="mx-auto max-w-7xl px-4 sm:px-6 ">
      {/* 설문완료  */}
      {finishListStatus&&<FinishedItem />}
      
      {/* 설문중 */}
      {surveyingListStatus&&<SurveyingItem/>}

      
    </div>
  )
}

export default ManageSurvey
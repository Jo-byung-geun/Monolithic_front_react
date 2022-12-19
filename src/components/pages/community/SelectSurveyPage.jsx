import React, { useState,useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import {useDispatch} from 'react-redux';
import {getMyFinishedSurvey} from '../../../services/SurveyService';
import List from '../../list/List';
import ManageService from '../../../services/ManageService'


function SelectSurveyPage(props) {
    const navigate = useNavigate();
    const Dispatch=useDispatch();
    
    const [myFinishedSurveyList, setMyFinishedSurveyList] = useState([]);
    const [checkSurveyListLength,setCheckSurveyListLength]=useState([false]); // true-> 조회된 설문지 없음 -> alert
    const [checkSatisfaction,setCheckSatisfaction]=useState([]); 
    useEffect(() => {
        setCheckSurveyListLength(false);
        ManageService.getSurveyByStatus('finish').then((response) => {
            console.log('select survey page - response',response.data.result);
            if(response.data.result.length===0){
                setCheckSurveyListLength(true);
            }
            else{
                setMyFinishedSurveyList(response.data.result);
            }
            setCheckSatisfaction(false);
            console.log("survey data : ", response.data.result);
          })
    }, [])

    const checkSatisfactionAlert=()=>{
        setCheckSatisfaction(true);
    }

    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {checkSurveyListLength&&<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <span class="block sm:inline">설문 완료된 설문지가 없어요... 게시글을 작성할 수 없습니다...</span>
                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>}
            {!checkSurveyListLength&&<div class="px-5 flex flex-col md:h-full pt-5">
                <div>
                    <p class="text-2xl font-bold text-gray-900">공유하고 싶은 설문지를 선택해주세요!</p>
                    {<List items={myFinishedSurveyList} type='select_survey' checkSatisfactionAlert={checkSatisfactionAlert}/>}
                </div>

            </div>}
      </div>

    );
}


export default SelectSurveyPage;

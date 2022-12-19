import React, { useEffect } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import QuestionList from './item/QuestionList'
import { useSelector, useDispatch } from 'react-redux';
import { getQuestion } from '../../../modules/result'
import SurveyService from '../../../services/ResultService';
import member, { loginMember,logoutMember } from '../../../modules/member';
import { renew_accessToken } from '../../../modules/member';


function QuestionResult() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { surveyId } = useParams();
  const questionList = useSelector(state => state.result.questions);
  useEffect(() => {
    if (Object.keys(questionList).length === 0) {
      SurveyService.getSurveyQuestion(surveyId).then((res) => {
        if(res.data.code===2002){
          alert("Comfy를 사용하고 싶으시면 로그인해주세요!");
          dispatch(logoutMember());
          navigate('/community');
        }
        else{
          dispatch(getQuestion(res.data.result));
          renew_accessToken(res.config.headers.ACCESS_TOKEN);

        } 
      })
    } else {
      if (questionList[0].question.surveyId !== surveyId) {
        SurveyService.getSurveyQuestion(surveyId).then((res) => {
          if(res.data.code===2002){
              alert("Comfy를 사용하고 싶으시면 로그인해주세요!");
              dispatch(logoutMember());
              navigate('/community');
            
          }
          else {
            dispatch(getQuestion(res.data.result));
            renew_accessToken(res.config.headers.ACCESS_TOKEN);
          }
        })
      } 
    }
  }, [])

  return (
    <div>
      {questionList && <QuestionList questions={questionList} />}
    </div>
  );
};

export default QuestionResult;
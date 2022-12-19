import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ListItem from "./ListItem";

function List(props) {
  // type: post/survey 
  // survey_type: notfinished/surveying/finished
  // case_: 1(bookmark)/2(mypost)
    const {items,type,case_,survey_type,onClickItem,deletePost,deleteBookmark,deleteSurvey,goFinished,checkSatisfactionAlert}=props;
    const [itemList,setItemList]=useState([]);

    // 게시글 삭제 즉시 반영
    const deletePostItem=(itemId)=>{
      console.log('List - deletePostItem - itemId',itemId);
      deletePost(itemId);
    }

    // 설문지 삭제 즉시 반영
    const deleteSurveyItem=(itemId)=>{
      console.log('List - deleteSurveyItem - itemId',itemId);
      deleteSurvey(itemId);
    }

     // 북마크 삭제 즉시 반영
     const deleteBookmarkItem=(itemId)=>{
      console.log('List - deleteBookmarkItem - itemId',itemId);
      deleteBookmark(itemId);
    }
    
    // 설문지 상태 설문 완료로 즉시 반영
    const goFinishedSurveyItem=(itemId)=>{
      console.log('List - goFinishedSurveyItem - itemId',itemId);
      goFinished(itemId);
    }
    
    return (
      <div class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {items && items.map((item)=>{
            var id;
            if(type==='survey') id=item.surveyId;
            else id=item.postId;
            return(
              <ListItem
                key={id}
                item={item}
                case_={case_}
                type={type}
                survey_type={survey_type}
                deletePostItem={deletePostItem}
                deleteBookmarkItem={deleteBookmarkItem}
                deleteSurveyItem={deleteSurveyItem}
                goFinishedSurveyItem={goFinishedSurveyItem}
                checkSatisfactionAlert={checkSatisfactionAlert}
                onClick={()=>{
                  onClickItem(item);
                }}/>
            );
          })}
        </div>
    );
    
}

export default List;
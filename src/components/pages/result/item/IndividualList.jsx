import React from "react";
// import { useSelector } from 'react-redux';
import IndividualListItem from './IndividualListItem'


const IndividualList = (props) => {

    const answers = props.answers;
    const onClickItem = props.onClickItem

    return(
        
        <div className="m-4 grid grid-cols-1 gap-y-10 text-center gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
            {answers.map((answer)=>{
                return(
                    <IndividualListItem
                        key = {answer.id}
                        answer = {answer}
                        onClick={()=>{
                            onClickItem(answer);
                        }}/>
                )
            })}
        </div>
    );
}
export default IndividualList;
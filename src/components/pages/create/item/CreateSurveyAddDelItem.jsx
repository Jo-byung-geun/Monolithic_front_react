import { useDispatch } from "react-redux"
import style from "./CreateSurvey.module.css"
import React from "react";
import { CreateSurveyButton } from "./CreateSurveyInput";

export function Add_item(props){
    const dispatch=useDispatch()
    const state=props.state
    const data=props.data
    return (
        <div className={style.row_container}>
        <CreateSurveyButton
            title={"+"}
            button={style.adddelbutton}
            onClick={()=>{
                var id=0
                if(state.length!==0){
                    id=state[state.length-1].id+1
                }
                console.log(state.length)
                try{
                    dispatch({
                        type:`${props.type}`,
                        rootid:data.rootid
                    })
                }
                catch(e){
                    dispatch({
                        type:`${props.type}`
                    })
                }
            }}
        />
        </div>
        
    )
}

export function Del_item(props){
    return (
        <div className={style.row_container}>
        <CreateSurveyButton
            title={"­-­"}
            button={style.adddelbutton}
            onClick={props.onClick}
        />
        </div>
    )
}
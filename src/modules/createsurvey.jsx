import { generatePath } from "react-router-dom"
import { Ans_data_list, Ques_data_list } from "../components/pages/create/item/CreateSurveyList"

function add_ques(props){
    return {
        "id":props.id,
        "ques":"",
        "type":Ques_data_list()[0]
    }
}

function init_survey(){
    return {
        "serverload":false,
        "end":"",
        "start":"",
        "share_modal":false,
        "ques_list":[],
        "ans_list":[],
        "choice_list":[],
        "satis":"",
        "intro0":"",
        "intro1":"",
    }
}

function Gen_id(state){
    var id=0
    state.map(st=>{
        if(st.id>=id){
            id=st.id+1
        }
    })
    return id
}

export default function createsurvey(state=init_survey(), action){
    var result;
    switch(action.type){
        case "change_list":
            switch(action.list_type){
                case "ques":
                    var dest_id=action.dest.id
                    var source_id=action.source.id
                    state.ques_list=state.ques_list.filter(t=>t.id!==source_id)
                    var dest_index=state.ques_list.findIndex(t=>t.id===dest_id)
                    if(action.source_index>action.dest_index){
                        state.ques_list.splice(dest_index,0,action.source)
                    }
                    else{
                        state.ques_list.splice(dest_index+1,0,action.source)
                    }
                    break
                case "ans":
                    var dest_id=action.dest.id
                    var source_id=action.source.id
                    state.ans_list=state.ans_list.filter(t=>t.id!==source_id)
                    var dest_index=state.ans_list.findIndex(t=>t.id===dest_id)
                    if(action.source_index>action.dest_index){
                        state.ans_list.splice(dest_index,0,action.source)
                    }
                    else{
                        state.ans_list.splice(dest_index+1,0,action.source)
                    }
                    break
                case "cho":
                    var dest_id=action.dest.id
                    var source_id=action.source.id
                    state.choice_list=state.choice_list.filter(t=>t.id!==source_id)
                    var dest_index=state.choice_list.findIndex(t=>t.id===dest_id)
                    if(action.source_index>action.dest_index){
                        state.choice_list.splice(dest_index,0,action.source)
                    }
                    else{
                        state.choice_list.splice(dest_index+1,0,action.source)
                    }
                    break
            }
            break
        case "loadfromserver": //??????????????? Survey ????????? ????????????
            state = init_survey()    
            state= action.value
            state={
                ...state,
                "serverload":true,
                "share_modal":false,
            }
            break
        case "edit_satis": //???????????? ????????? ??????
            state["satis"]=action.value
            break
        case "choice_checked": //???????????? ????????? ??????
            if(action.ansid===undefined){
                var rootid=action.rootid
            }
            else{
                var rootid=action.ansid
            }
            if(state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_type"]===false){
                if(state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"].filter(t=>t.rootid===rootid).length===0){
                    var cho_id=Gen_id(state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"])
                    state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"]=state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"].concat(Ans_data_list({selectid:action.value, rootid:rootid, id:cho_id})[1])
                }
                else{
                    var cho_id=Gen_id(state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"])
                    state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"].filter(t=>t.rootid===rootid)[0]["selectid"]=action.value
                }
            }
            else{
                if(state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"].filter(t=>t.rootid===rootid).filter(t=>t.selectid===action.value).length===0){
                    var cho_id=Gen_id(state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"])
                    state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"]=state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"].concat(Ans_data_list({selectid:action.value, rootid:rootid, id:cho_id})[1])
                }
                else{
                    var temp=state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"]
                    temp=temp.filter(t=>t!==temp.filter(t=>t.rootid===rootid).filter(t=>t.selectid===action.value)[0])
                    state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["choice_value"]=temp
                }
            }
            break
        case "edit_ques": //????????? ?????? ??????
            state["ques_list"].filter(t=>t.id===action.id)[0]["ques"]=action.value
            break
        case "edit_ans": // ????????? ????????? ?????? ??????
            state["ans_list"].filter(t=>t.rootid===action.rootid).filter(t=>t.id===action.id)[0]["value"]=action.value
            break
        case "edit_writing":
            state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]["answer"]=action.value
            break
        case "edit_cho": //????????? ????????? Grid ????????? ??????
            state["choice_list"].filter(t=>t.rootid===action.rootid).filter(t=>t.id===action.id)[0]["value"]=action.value
            break
        case "add_ques": //????????? ?????? ??????
            var ques_id=Gen_id(state["ques_list"])
            state["ques_list"]=state["ques_list"].concat(add_ques({id:ques_id}))
            break
        case "add_ans": //????????? ?????? ??????
            var ans_id=Gen_id(state["ans_list"])
            state["ans_list"]=state["ans_list"].concat(Ans_data_list({id:ans_id, rootid:action.rootid})[0])
            break
        case "add_ans_file": //????????? ?????? ?????? ??????
            var ans_id=Gen_id(state["ans_list"])
            state["ans_list"]=state["ans_list"].concat(Ans_data_list({id:ans_id, rootid:action.rootid})[2])
            break
        case "add_choice": //????????? ????????? Grid ????????? ??????
            var cho_id=Gen_id(state["choice_list"])
            state["choice_list"]=state["choice_list"].concat(Ans_data_list({id:cho_id,rootid:action.rootid})[0])
            break
        case "set_choice_type": //????????? ????????? ????????????/???????????? ??????
            state["ques_list"].filter(t=>t.id===action.id)[0]["type"]["choice_type"]=!state["ques_list"].filter(t=>t.id===action.id)[0]["type"]["choice_type"]
            state["ques_list"].filter(t=>t.id===action.id)[0]["type"]["choice_value"]=[]
            break
        case "change_ques_type": //????????? ???????????? ??????
            state["ques_list"].filter(t=>t.id===action.rootid)[0]["type"]=Ques_data_list()[action.temid]
            state["ans_list"]=state["ans_list"].filter(t=>t.rootid!==action.rootid)
            state["choice_list"]=state["choice_list"].filter(t=>t.rootid!==action.rootid)
            break
        case "del_ques": //????????? ?????? ??????
            state["ques_list"]=state["ques_list"].filter(t=>t.id!==action.id)
            state["ans_list"]=state["ans_list"].filter(t=>t.rootid!==action.id)
            state["choice_list"]=state["choice_list"].filter(t=>t.rootid!==action.id)
            break
        case "del_ans": //????????? ????????? ?????? ??????
            state["ans_list"]=state["ans_list"].filter(t=>t.id!==action.id)
            break
        case "del_choice": //????????? ????????? Grid ????????? ??????
            state["choice_list"]=state["choice_list"].filter(t=>t.id!==action.id)
            break
        case "reset_template": //????????? ??????
            state = init_survey()
            break
        case "serverload":
        case "share_modal":
        case "intro0":
        case "intro1":
        case "end":
        case "start":
            state[action.type]=action.value
    }
    result = {
        ...state,
    }
    return result;
}

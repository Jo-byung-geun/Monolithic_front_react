const GET_SURVEY_DETAILS = 'result/GET_SURVEY_DETAILS';
const GET_QUESTION = 'result/GET_QUESTION';
const GET_INDIVIDUAL = 'result/GET_INDIVIDUAL'

export function getSurveyDetails(surveyDetails) {
    return {
        type: GET_SURVEY_DETAILS,
        payload: surveyDetails
    }
}

export function getIndividual(respondents) {
    return {
        type: GET_INDIVIDUAL,
        payload: respondents
    }
}

export function getQuestion(questions) {
    return {
        type: GET_QUESTION,
        payload: questions
    }
}



const initialState = {
    questions: [],
    questionId: 0,
    surveyDetails: {
        title: '',
        contents: '',
        satisfaction: 0,
        type: '',
        end: ''
    },
    respondents: [],
}

function result(state = initialState, action) {
    switch (action.type) {
        case GET_SURVEY_DETAILS:

            if (state.surveyDetails.title !== action.payload.title) {
                state.surveyDetails = {
                    title: '',
                    contents: '',
                    satisfaction: 0,
                    type: '',
                    end: ''
                }
            }
            return {
                ...state,
                surveyDetails: {
                    title: action.payload.title,
                    contents: action.payload.contents,
                    satisfaction: action.payload.satisfaction,
                    type:action.payload.type,
                    end: action.payload.end
                }
            };
        // 이 부분 응답자수 구하는거로 바꿔야 함.   
        case GET_INDIVIDUAL:

            if (state.respondents.length > 0) {
                state.respondents = [];
            }
            return {
                ...state,
                respondents: state.respondents.concat(action.payload)
            };

        case GET_QUESTION:

            if (state.questions.length > 0) {
                state.questions = [];
                state.questionId = 0;
            }
            return {
                ...state,
                questionId: action.payload[0].question.id,
                questions: state.questions.concat(action.payload)
            };

        default:
            return state;
    }
}
export default result;
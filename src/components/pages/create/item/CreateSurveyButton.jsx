import { CDBBtn } from "cdbreact";
import React from "react";
import style from "./CreateSurvey.module.css"

export function CreateSurveyButton(props) {
    const { title, onClick } = props;

    return <button className="bg-white hover:bg-gray-100 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow" onClick={onClick}>{title || "button"}</button>;
}
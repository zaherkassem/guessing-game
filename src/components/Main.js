import React from "react";
import Form from './Form';
import ShowResult from "./ShowResult";


function Main() {

    return (
        <div className="ui main">
            <h2>Main</h2>
            <Form/>
            <div className={'item'}><hr /></div>
            <ShowResult/>
        </div>
    );

}

export default Main;
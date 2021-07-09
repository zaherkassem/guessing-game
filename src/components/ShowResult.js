import React  from "react";
import {connect} from "react-redux";

function ShowResult(props) {

    const {guesses} = props;

    console.log({guesses});


    return <div className={'center-div'}>
        { guesses.map(elm => {
            return(
                <>
                    <span>{ elm.enterTemp}</span><br/>
                    <span> was {elm.rightTemp} </span><br/><br/>
                </>
            )
        })
        }
    </div>;

}

function mapStateToProps(state) {
    return {
        guesses: state.guesses,
    };
}


export default connect(mapStateToProps)(ShowResult);
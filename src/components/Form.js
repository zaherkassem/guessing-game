import React, {useState} from "react";
import httpRequests from '../api/game';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {updateGuesses, updateTemperature} from "../redux/actions/guessingGame" ;


function Form(props) {
    const {guesses, temperature} = props;

    const checkTemp = (e) => {
        e.preventDefault();
        let cityName = 'haifa';
        // let temperature = this.state.temperature ;
        httpRequests.getTemperature(cityName,  (res) => {
            if (res.main && res.main.temp) {
                let rightTemperature = res.main.temp;
                let isRight = false;
                if( Math.abs(temperature - rightTemperature) <= 5) { // right
                    isRight = true;
                     // console.log('right:',temperature, res.main.temp);
                }
                let updatedGuesses = [...guesses];
                updatedGuesses.push( {enterTemp: temperature, rightTemp: rightTemperature,  isRight: isRight});
                props.updateGuesses(updatedGuesses);

            }
            // console.log(res.main.temp);
        }, (err)=> {
            console.log({err});
        });
        // console.log(this.state.temperature);
        // this.props.checkTemperatureOfCity(this.state.temperature);
    };


    return (
            <form className="ui form" onSubmit={()=>console.log('submit')}>
                <div className="field">
                    <label>City</label>
                    <input
                        type="text"
                        name="temperature"
                        placeholder="Your guess text box"
                        onChange={(e) =>  props.updateTemperature( e.target.value )}
                    />
                </div>
                <button className="ui button blue" onClick={checkTemp}>Check</button>
            </form>
    );

}

function mapStateToProps(state) {
    return {
        guesses: state.guesses,
        temperature: state.temperature,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateGuesses: bindActionCreators(updateGuesses, dispatch),
        updateTemperature: bindActionCreators(updateTemperature, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Form);
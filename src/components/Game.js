import React, {useState} from "react";
import httpRequestsAPI from '../api/openweathermapAPI';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {updateCities, updateGuesses, updateTemperature} from "../redux/actions/guessingGame" ;
import { Button, Col, Form, Card, Alert} from 'react-bootstrap';
import { City }  from 'country-state-city';
const allCities = City.getAllCities();
var inited = false;


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function Game(props) {
    const {guesses, temperature, cities} = props;
    const [key, setKey] = useState(0);
    const [totalRightAnswer, setTotalRightAnswer] = useState(0);

    const initCities  = () =>{
        if(!inited ) {
            let arrCities = [];
            for (let i = 0; i < 5; i++) {
                let city = allCities[getRandomInt(allCities.length)];
                arrCities.push(city);
            }
            props.updateCities(arrCities);
            inited = true;
        }
        // setCities(arrCities);
    }

    const startNewGame =  (e) => {
        setTotalRightAnswer (0);
        setKey(0);
        let updatedGuesses = [];
        props.updateGuesses(updatedGuesses);
        inited = false;
        initCities();
    }

    initCities();

    const getCityName = () => {
        let city = cities[key] || ''
        if (city !== '') {
            return  city.name;
            // return  city.name + ' countryCode:' + city.countryCode + ' stateCode: ' + city.stateCode + ' latitude:' + city.latitude + ' longitude:' + city.latitude;
        }

        return '';
    }

    const checkTemp = (e) => {
        e.preventDefault();
        let cityName = cities[key].name;
        // console.log({cityName}, cities[key]);
        httpRequestsAPI.getTemperature(cityName,  (res) => {
            if (res.main && res.main.temp) {
                setKey(key+1)
                let rightTemperature = res.main.temp;
                let isRight = ( Math.abs(temperature - rightTemperature) <= 5);
                let updatedGuesses = [...guesses];
                if (isRight) setTotalRightAnswer (totalRightAnswer+1);
                updatedGuesses.push( {enterTemp: temperature, rightTemp: rightTemperature,  isRight: isRight,  key: key});
                props.updateGuesses(updatedGuesses);
            }
        }, (err)=> {
            console.log({err});
        });
    };

    return (
        <>
            <div style={{ 'display' : (guesses.length === 5) ? 'none' : 'block'}}>
                <Card.Title>Guess the temperature (in celsius) for the following city:</Card.Title>
                <Card.Text> <strong> { getCityName()} </strong></Card.Text>
                <Form onSubmit={()=>console.log('submit')}>
                    <Form.Row>
                        <Col xs={4}>
                            <Form.Control name="temperature" sm={2} type={'number'} placeholder={'Enter your guess'} step="any" onChange={(e) =>  props.updateTemperature( e.target.value )} />
                        </Col>
                        <Col>
                            <Button type="button" onClick={checkTemp}>Check</Button>
                        </Col>
                    </Form.Row>
                </Form>
            </div>
            <div style={{ 'display' : (guesses.length === 5) ? 'block' : 'none'}}>
                <Alert variant={ (totalRightAnswer >=3 ) ?  "success" : "danger"}>
                    <Alert.Heading>Hey, you {(totalRightAnswer >= 3) ? ' Won' : ' Lose' } {totalRightAnswer} / 5</Alert.Heading>
                    <p> <Alert.Link href={void(0)} onClick={(e) => startNewGame()}>Click here  to start new Game</Alert.Link>.</p>
                </Alert>
            </div>
        </>
    );
}

function mapStateToProps(state) {
    return {
        guesses: state.guesses,
        temperature: state.temperature,
        cities: state.cities
    };
}

function mapDispatchToProps(dispatch) {
    return {
        updateGuesses: bindActionCreators(updateGuesses, dispatch),
        updateTemperature: bindActionCreators(updateTemperature, dispatch),
        updateCities: bindActionCreators(updateCities, dispatch),

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);
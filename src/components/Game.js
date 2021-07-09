import React, {useState} from "react";
import httpRequestsAPI from '../api/openweathermapAPI';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {updateGuesses, updateTemperature} from "../redux/actions/guessingGame" ;
import { Button, Col, Form, Card, Alert} from 'react-bootstrap';

function Game(props) {
    const {guesses, temperature} = props;
    const [key, setKey] = useState(0);
    const [totalRightAnswer, setTotalRightAnswer] = useState(0);

    const startNewGame =  (e) => {
        setTotalRightAnswer (0);
        let updatedGuesses = [];
        props.updateGuesses(updatedGuesses);
    }

    const checkTemp = (e) => {
        e.preventDefault();
        let cityName = 'haifa';
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
            <section style={{'display': (guesses.length === 5) ? 'none' : 'block'}}>
                <Card.Title>Guess the temperature (in celsius) for the following city:</Card.Title>
                <Card.Text> <strong> Haifa </strong></Card.Text>
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
            </section>
            <section style={{'display': (guesses.length === 5) ? 'block' : 'none'}}>
                <Alert variant={ (totalRightAnswer >=3 ) ?  "success" : "danger"}>
                    <Alert.Heading>{(totalRightAnswer >= 3) ? 'Hey, you Won' : 'Hey, you Lose' } {totalRightAnswer}</Alert.Heading>
                    <p> <Alert.Link href={void(0)} onClick={(e) => startNewGame()}>Click here  to start new Game</Alert.Link>.</p>
                </Alert>
            </section>
        </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Game);
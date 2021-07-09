import React from "react";
import Game from './Game';
import {Container, Alert, Card} from 'react-bootstrap';
import ShowResult from "./ShowResult";
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.css';

function Main() {
    return (
        <Container>
            <br/>
            <Card>
                <Card.Header><Header/></Card.Header>
                <Card.Body>
                    <Game index={0} />
                    <div className={'item'}><hr /></div>
                    <ShowResult/>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Main;
import React  from "react";
import {connect} from "react-redux";
import {ProgressBar, Col, Row} from 'react-bootstrap';

function ShowResult(props) {
    const {guesses} = props;
    return (
        <div key={11}>
            <Row noGutters={true} key={10}>
                { guesses.map(elm => {
                        return(
                            <Col className={ (elm.isRight) ? 'text-success text-center' :  'text-danger  text-center'} key={elm.key}  >{elm.enterTemp} was {elm.rightTemp}</Col>
                        )
                    })
                }
            </Row>
            <ProgressBar>
                { guesses.map(elm => {
                        return(
                            <ProgressBar variant={ (elm.isRight) ? "success" : "danger"} now={99} key={elm.key} />
                        )
                    })
                }
            </ProgressBar>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        guesses: state.guesses,
    };
}

export default connect(mapStateToProps)(ShowResult);
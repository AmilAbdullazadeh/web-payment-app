import React, {useState, useEffect} from "react";
import {Col, Container, Form, Row, Button, Card} from "react-bootstrap";
import Message from "./Message";
import {Link} from "react-router-dom";
import successIcon from '../assets/checked.png';


function Receipt({dataReceipt}) {

    return (
        <Container className="d-flex justify-content-center">
            <Card className="my-3 p-3 card-container rounded">
                <img style={{alignSelf: 'center'}} width="85" src={successIcon} alt="Logo"/>
                {dataReceipt && (
                    <Card.Body>
                        <Card.Title as="div">
                            <span className="text-success">Payment id: </span> <strong>{dataReceipt.id}</strong>
                        </Card.Title>
                        <Card.Title as="div">
                            <span className="text-success">Transaction date: </span> <strong>{dataReceipt.date}</strong>
                        </Card.Title>
                        <Card.Title as="div">
                            {
                                <>
                                    <span className="text-success">Transaction date: </span>
                                    <strong>{Object.keys(dataReceipt.details)} {Object.values(dataReceipt.details)}</strong>
                                </>
                            }
                        </Card.Title>
                        <Card.Title as="div">
                            <span className="text-success">Amount paid: </span>
                            <strong>{`${dataReceipt.amount.value} ${dataReceipt.amount.currency}`}</strong>
                        </Card.Title>
                    </Card.Body>
                )}
            </Card>
        </Container>
    );
}

export default Receipt;

import React from "react";
import {Container, Card} from "react-bootstrap";
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
                            <span className="text-success">Transaction details: </span>
                            {
                                dataReceipt.details.map((detail) => (
                                    <>
                                        <strong>{detail.key}: {detail.value}</strong> <br/>
                                    </>
                                ))
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

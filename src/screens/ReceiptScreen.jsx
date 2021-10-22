import React, {useState, useEffect} from "react";
import {Col, Container, Form, Row, Button, Card} from "react-bootstrap";
import Message from "../components/Message";
import {Link} from "react-router-dom";

function ReceiptScreen({match, history}) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {


        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [loading, error]);

    if (loading) return "Loading...";
    if (error) return <Message variant="danger">{error}</Message>

    return (
        <Container>

        </Container>
    );
}

export default ReceiptScreen;

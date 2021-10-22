import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Provider({ provider, categoryId }) {
    return (
        <Card className="my-3 p-3 card-container rounded">
            <Card.Body>
                <Link to={`/form/${categoryId}/${provider.id}`}>
                    <Card.Title as="div">
                        <strong>{provider.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default Provider;

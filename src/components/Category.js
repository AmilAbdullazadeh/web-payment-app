import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Category({ category }) {
    return (
        <Card className="my-3 p-3 card-container rounded">
            <Card.Body>
                <Link to={`/category/${category.id}`}>
                    <Card.Title as="div">
                        <strong>{category.name}</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default Category;

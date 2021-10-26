import React, {useState, useEffect, useContext} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Category from "../components/Category";
import Message from "../components/Message";
import {CategoryListContext} from "../contexts/CategoryListContext";

function HomeScreen() {

    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

        // context api
    const categoryList = useContext(CategoryListContext);

    useEffect(() => {
        fetch("http://localhost:8080/payments/categories")
            .then((response) => response.json())
            .then((data) => {
                //  check local storage data
                const localData = JSON.parse(localStorage.getItem('categoryListStorage'));
                if (localData !== undefined && localData !== null) {
                    localStorage.setItem('categoryListStorage', JSON.stringify(data));
                    setCategories(localData)
                }

                // local storage
                localStorage.setItem('categoryListStorage', JSON.stringify(data));
                setCategories(data)
            })
            .catch((error) => {
                console.error(error);
                setError(error)
            })
            .finally(() => setLoading(false))
    }, [loading, error]);

    if (loading) return "Loading...";
    if (error) return <Message variant="danger">{error}</Message>

    return (
        <Container>
            <h1>Categories</h1>
            <div>
                <Row>
                    {categories.map((category) => (
                        <Col key={category.id} sm={12} md={6} lg={4} xl={3}>
                            <Category category={category}/>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default HomeScreen;

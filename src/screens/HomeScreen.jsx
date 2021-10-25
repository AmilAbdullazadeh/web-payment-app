import React, {useState, useEffect, useContext} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Category from "../components/Category";
import Message from "../components/Message";
import {CategoryListContext} from "../contexts/CategoryListContext";

function HomeScreen() {

    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     fetch("testURL")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.info(error);
    //             setCategories(data)
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             setError(error)
    //         })
    //         .finally(() => setLoading(false))
    // }, [categories, error]);

    // context api
    const categoryList = useContext(CategoryListContext);

    useEffect(() => {
        try {
            setCategories(categoryList);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }

    }, []);


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

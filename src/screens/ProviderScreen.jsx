import React, {useState, useEffect, useContext} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Message from "../components/Message";
import {Link} from "react-router-dom";
import Provider from "../components/Provider";
import {CategoryListContext} from "../contexts/CategoryListContext";

function ProviderScreen({match, history}) {

    const categoryId = match.params.id;

    const [categoryFiltered, setCategoryFiltered] = useState();
    const [providers, setProviders] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categoryList = useContext(CategoryListContext);

    useEffect(() => {
        try {
            const categoryFiltered = categoryList.filter(category => category.id === categoryId);
            setCategoryFiltered(categoryFiltered[0]);
            setProviders(categoryFiltered[0]);
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
            <h1>Providers</h1>
            <Link to="/" className="btn btn-light my-3">
                Go Back
            </Link>
            <div>
                <Row>
                    {providers.providers.map((provider) => (
                        <Col key={provider.id} sm={12} md={6} lg={4} xl={3}>
                            <Provider categoryId={categoryId} provider={provider}/>
                        </Col>
                    ))}
                </Row>
            </div>
        </Container>
    );
}

export default ProviderScreen;

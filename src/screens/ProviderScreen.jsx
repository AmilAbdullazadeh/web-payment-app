import React, {useState, useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Message from "../components/Message";
import {Link} from "react-router-dom";
import Provider from "../components/Provider";

function ProviderScreen({match, history}) {

    const categoryList = [
        {
            "id": "1",
            "name": "Mobile",
            "providers": [
                {
                    "id": "1",
                    "name": "Bakcell",
                    "fields": [
                        {
                            "id": "subscriber_id",
                            "type": 1,
                            "label": "Subscriber"
                        }
                    ]
                },
                {
                    "id": "2",
                    "name": "Nar",
                    "fields": [
                        {
                            "id": "prefix_id",
                            "type": 4,
                            "label": "Prefix",
                            "options": [
                                {"k": "1", "v": "055"},
                                {"k": "2", "v": "077"},
                            ]
                        }
                    ]
                },
                {
                    "id": "3",
                    "name": "Azercell",
                    "fields": [
                        {
                            "id": "prefix_id",
                            "type": 4,
                            "label": "Prefix",
                            "options": [
                                {"k": "1", "v": "050"},
                                {"k": "2", "v": "051"},
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "id": "2",
            "name": "Utilities",
            "providers": [
                {
                    "id": "1",
                    "name": "Azeriqaz",
                    "fields": [
                        {
                            "id": "subscriber_id",
                            "type": 1,
                            "label": "Subscriber"
                        }
                    ]
                },
                {
                    "id": "2",
                    "name": "Azerisu",
                    "fields": [
                        {
                            "id": "prefix_id",
                            "type": 4,
                            "label": "Prefix",
                            "options": [
                                {"k": "1", "v": "Residential"},
                                {"k": "2", "v": "Commercial"},
                            ]
                        },
                        {
                            "id": "subscriber_id",
                            "type": 1,
                            "label": "Subscriber"
                        }
                    ]
                },
                {
                    "id": "3",
                    "name": "Grand Hayat",
                    "fields": [
                        {
                            "id": "client_code",
                            "type": 2,
                            "label": "Client code"
                        }
                    ]
                }
            ]
        },
        // {
        //     "id": "3",
        //     "name": "Banks",
        //     "providers": [
        //         {
        //             "id": "1",
        //             "name": "Kapital Bank",
        //             "fields": [
        //                 {}
        //             ]
        //         },
        //         {
        //             "id": "1",
        //             "name": "Pasha Bank",
        //             "fields": [
        //                 {}
        //             ]
        //         },
        //         {
        //             "id": "1",
        //             "name": "Access Bank",
        //             "fields": [
        //                 {}
        //             ]
        //         }
        //     ]
        // }
    ]

    const categoryId = match.params.id;

    const [categoryFiltered, setCategoryFiltered] = useState();
    const [providers, setProviders] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

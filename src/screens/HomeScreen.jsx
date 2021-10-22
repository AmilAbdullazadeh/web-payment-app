import React, {useState, useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";
import Category from "../components/Category";
import Message from "../components/Message";

function HomeScreen({history}) {

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

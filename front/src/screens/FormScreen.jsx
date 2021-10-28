import React, {useState, useEffect, useContext} from "react";
import {Col, Container, Form, Row, Button} from "react-bootstrap";
import Message from "../components/Message";
import Receipt from "../components/Receipt";
import {CategoryListContext} from "../contexts/CategoryListContext";

function FormScreen({match, history}) {

    const categoryId = match.params.categoryId;
    const providerId = match.params.providerId;

    const [keyData, setKeyData] = useState();
    const [field, setField] = useState();
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // form
    const [number, setNumber] = useState('');
    const [exp_month, setExpMonth] = useState('');
    const [exp_year, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');

    const [value, setValue] = useState('');
    const [currency, setCurrency] = useState('');

    const [datas, setDatas] = useState({})

    const [validated, setValidated] = useState(false);

    const [isSubmit, setIsSubmit] = useState(false);

    const [dataRequest, setDataRequest] = useState({});
    const [dataReceipt, setDataReceipt] = useState({});

    const [showReceipt, setShowReceipt] = useState(false);

    // context api
    const categoryList = useContext(CategoryListContext);

    useEffect(() => {
        try {
            //  check local storage data
            const localReceiptData = JSON.parse(localStorage.getItem('receiptStorage'));
            const localData = JSON.parse(localStorage.getItem('categoryListStorage'));

            if (localReceiptData !== undefined && localReceiptData !== null) {
                setIsSubmit(true);
                setShowReceipt(true);
                setDataReceipt(localReceiptData);
            } else if (localData !== undefined && localData !== null) {
                const categoryFiltered = localData.filter(category => category.id === +categoryId);
                setProviders(categoryFiltered[0].providers);
                const providerFiltered = providers.filter(provider => provider.id === +providerId);
                setField(providerFiltered[0]);
            } else {
                history.push('/');
            }
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [loading, error, isSubmit, showReceipt]);

    const fieldChanged = (key, value) => {
        setDatas(currentValues => {
            currentValues[key] = {
                key: key,
                value: value
            }
            return currentValues;
        });
    }

    const handleSubmit = (event) => {
        setIsSubmit(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            const data =
                {
                    providerId: +providerId,
                    fields: Object.values(datas),
                    amount: {
                        value: value,
                        currency: currency
                    },
                    card: {
                        number: number,
                        exp_month: exp_month,
                        exp_year: exp_year,
                        cvv: cvv
                    }
                }

            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            };

            fetch("http://localhost:8080/payments/new", requestOptions)
                .then((response) => response.json())
                .then((res) => {
                    console.log('data res', res)
                    setDataReceipt(res.data);
                    // local storage
                    localStorage.setItem('receiptStorage', JSON.stringify(res.data));
                    // eslint-disable-next-line no-unused-expressions
                    dataReceipt !== undefined ? setShowReceipt(true) : setShowReceipt(false);
                })
                .catch((error) => {
                    console.error(error);
                    setError(error)
                })
                .finally(() => setLoading(false))
        }
        setValidated(true);
    };

    const handleBack = () => {
        const localData = JSON.parse(localStorage.getItem('receiptStorage'));

        if (localData !== undefined || true) {
            localStorage.removeItem('receiptStorage');
            setIsSubmit(false);
            setShowReceipt(false);
        }

        history.push('/');
    }

    if (loading) return "Loading...";
    if (error) return <Message variant="danger">{error}</Message>

    return (
        <Container>
            <Button onClick={handleBack} className="btn btn-light my-3">
                Go back
            </Button>
            {
                (isSubmit && showReceipt) ? <Receipt dataReceipt={dataReceipt}/>
                    : (
                        <div>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Row>
                                    <Col sm={12} md={6} lg={4} xl={4}>
                                        <div className="card-container">
                                            {field && field.fields.map((f, idx) => (
                                                <div key={idx}>
                                                    <Form.Group className="mb-2">
                                                        <Form.Label>{f.label}</Form.Label>
                                                        {
                                                            f.type === 4 ?
                                                                (
                                                                    <Form.Control
                                                                        name={f.id}
                                                                        as="select"
                                                                        required
                                                                        onChange={(e) => fieldChanged(f.id, e.target.value)}
                                                                    >
                                                                        <option value="">Select...</option>
                                                                        {
                                                                            f.options.map((option) => (
                                                                                <option
                                                                                    key={option.key}
                                                                                    value={option.value}
                                                                                >
                                                                                    {option.value}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </Form.Control>
                                                                )
                                                                : (
                                                                    <Form.Control
                                                                        required
                                                                        name={f.id}
                                                                        type={f.type === 1 ? 'text' : (f.type === 2 && f.id !== 'number') || (f.type === 3 && f.id !== 'number') ? 'number' : f.type === 5 ? 'date' : 'text'}
                                                                        placeholder={f.label}
                                                                        maxLength={f.id === 'number' ? 7 : 55}
                                                                        onChange={(e) => fieldChanged(f.id, e.target.value)}
                                                                    />
                                                                )
                                                        }
                                                    </Form.Group>
                                                </div>
                                            ))}
                                            <Form.Group className="mb-2" controlId="value">
                                                <Form.Label>Amount</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Amount"
                                                    required
                                                    value={value}
                                                    onChange={(e) => setValue(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-2" controlId="currency">
                                                <Form.Label>Currency</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    required
                                                    value={currency}
                                                    onChange={(e) => setCurrency(e.target.value)}
                                                >
                                                    <option value="">Select...</option>
                                                    <option value="USD">USD</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </div>
                                    </Col>
                                    <Col sm={12} md={6} lg={8} xl={5}>
                                        <div className="card-container">
                                            <Col sm={12} md={12} lg={12} xl={12}>
                                                <Form.Group className="mb-2" controlId="number">
                                                    <Form.Label>Card number</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Card number"
                                                        required
                                                        className="cardNumber"
                                                        value={number}
                                                        maxLength="19"
                                                        onChange={(e) => setNumber(e.target.value)}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col sm={12} md={12} lg={12} xl={12}>
                                                <Row>
                                                    <Col sm={12} md={8} lg={6} xl={6}>
                                                        <Form.Label>Exp date</Form.Label>
                                                        <Form.Group className="exp mb-2" controlId="exp_month">
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="ExpMonth"
                                                                required
                                                                className="exp-left"
                                                                value={exp_month}
                                                                maxLength="2"
                                                                onChange={(e) => setExpMonth(e.target.value)}
                                                            />
                                                            <span className="exp-line"/>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="ExpYear"
                                                                required
                                                                className="exp-right"
                                                                value={exp_year}
                                                                maxLength="2"
                                                                onChange={(e) => setExpYear(e.target.value)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                    <Col sm={12} md={8} lg={6} xl={6}>
                                                        <Form.Group className="mb-2" controlId="cvv">
                                                            <Form.Label>CVV</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="CVV"
                                                                required
                                                                className="cvv"
                                                                value={cvv}
                                                                maxLength="3"
                                                                onChange={(e) => setCvv(e.target.value)}
                                                            />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col sm={12} md={12} lg={12} xl={12}>
                                                <Button className='submitButton' variant="primary" type="submit">
                                                    Submit
                                                </Button>
                                            </Col>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    )
            }
        </Container>
    );
}

export default FormScreen;

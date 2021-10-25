import React, {useState, useEffect, useContext} from "react";
import {Col, Container, Form, Row, Button} from "react-bootstrap";
import Message from "../components/Message";
import Receipt from "../components/Receipt";
import {CategoryListContext} from "../contexts/CategoryListContext";

function FormScreen({match, history}) {

    const categoryId = match.params.categoryId;
    const providerId = match.params.providerId;

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
            const localData = JSON.parse(localStorage.getItem('receiptStorage'));

            if (localData !== undefined && localData !== null) {
                setIsSubmit(true);
                setShowReceipt(true);
                setDataReceipt(localData);
            }

            const categoryFiltered = categoryList.filter(category => category.id === categoryId);
            const providerFiltered = providers.filter(provider => provider.id === providerId);

            setProviders(categoryFiltered[0].providers);
            setField(providerFiltered[0]);
        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, [loading, error, isSubmit, showReceipt]);

    const fieldChanged = (key, value) => {
        setDatas(currentValues => {
            currentValues[key] = value;
            return currentValues;
        });

        // for (const [key, value] of Object.entries(datas)) {
        //     setKeyData(currentValues => {
        //         currentValues = {
        //             k: currentValues[key],
        //             v: value
        //         }
        //         return currentValues;
        //     });
        // }

        // console.info('keyData', keyData);
    }

    const handleSubmit = (event) => {
        setIsSubmit(true);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();

            const data = [
                {
                    providerId: providerId,
                    fields: datas,
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
            ]

            setDataRequest(data);

            // for generate id
            const generateRandomString = (length = 10) => Math.random().toString(20).substr(2, length)
            let randomId = generateRandomString(200);

            // yyyy-MM-ddTHH:mm:ss
            let date_ob = new Date();
            // adjust 0 before single digit date
            let date = ("0" + date_ob.getDate()).slice(-2);
            // current month
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            // current year
            let year = date_ob.getFullYear();
            // current hours
            let hours = date_ob.getHours();
            // current minutes
            let minutes = date_ob.getMinutes();
            // current seconds
            let seconds = date_ob.getSeconds();

            const dateNow = `${year}-${month}-${date}T${hours}:${minutes}:${seconds}`;

            const receipt = {
                id: randomId,
                date: dateNow,
                details: datas,
                amount: {
                    value: value,
                    currency: currency
                }
            }

            setDataReceipt(receipt);

            // local storage
            localStorage.setItem('receiptStorage', JSON.stringify(receipt));

            // eslint-disable-next-line no-unused-expressions
            dataReceipt !== undefined && dataRequest !== undefined ? setShowReceipt(true) : setShowReceipt(false);

        }
        setValidated(true);
    };

    const handleBack = () => {
        const localeData = JSON.parse(localStorage.getItem('receiptStorage'));

        if (localeData !== undefined || true) {
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
                                                                                    key={option.id}
                                                                                    value={option.v}
                                                                                >
                                                                                    {option.v}
                                                                                </option>
                                                                            ))
                                                                        }
                                                                    </Form.Control>
                                                                )
                                                                : (
                                                                    <Form.Control
                                                                        required
                                                                        name={f.id}
                                                                        type={f.type === 1 ? 'text' : (f.type === 2 && f.id !== 'phone_number') || (f.type === 3 && f.id !== 'phone_number') ? 'number' : f.type === 5 ? 'date' : 'text'}
                                                                        placeholder={f.label}
                                                                        maxLength={f.id === 'phone_number' ? 7 : 55}
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

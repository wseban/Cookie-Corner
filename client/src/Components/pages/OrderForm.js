import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { getAllFoods, createOrder } from '../../utils/api';
import AuthService from '../../utils/auth';
import BrownChocolateChipCookie from "../assets/BrownChocolateChipCookie.png";
import CherryCheesecakeCookie from "../assets/CherryCheesecakeCookie.png";
import ChocolateCookie from "../assets/ChocolateCookie.png";
import PeanutButterCookie from "../assets/PeanutButterCookie.png";
import WalnutCookie from "../assets/WalnutCookie.png";
import { FaShoppingCart } from "react-icons/fa";

export default function OrderForm() {

    const [cookieData, setCookieData] = useState([]);
    const cookieImg = [
        BrownChocolateChipCookie,
        CherryCheesecakeCookie,
        ChocolateCookie,
        PeanutButterCookie,
        WalnutCookie
    ];

    useEffect(() => {

        // For getting cookies from our database
        const getAllCookies = async () => {
            const response = await getAllFoods();
            if (!response.ok) {
                return;
            }

            const cookieData = await response.json();
            if (cookieData) {


                setCookieData(cookieData);
                for (let i = 0; i < cookieData.length; i++) {
                    cookieData[i].picture = getImportName(cookieData[i].picture);
                }

            }
        }

        getAllCookies();
    }, []);

    // For importing cookie pictures
    function getImportName(picturePath) {
        const arr = picturePath.split('/');
        const importName = arr[2].split('.');
        return importName[0];
    }

    const [orderFormData, setOrderFormData] = useState({});
    const [orderNameData, setOrderNameData] = useState();
    const [orderDateData, setOrderDateData] = useState(new Date());

    // For handling changes in form group
    function handleOnChange(event) {
        const { name, value } = event.target;

        if (name === 'orderName') {
            setOrderNameData(value);
        } else {
            setOrderFormData({ ...orderFormData, [name]: value });
        }
    }

    // For submitting order
    function onSubmitOrder(event) {
        event.preventDefault();

        const orderData = {
            orderName: orderNameData,
            deliveryDate: orderDateData,
            food: orderFormData
        };


        sendNewOrder(orderData);
        //For sending to dahsboard after submit the order
        document.location.href = '/dashboard';

    }

    // For sending new order
    const sendNewOrder = async (orderData) => {
        if (!AuthService.isLoggedIn) {
            return;
        }

        const token = AuthService.getToken();
        if (!token) {
            return;
        }


        /* token exists, check if expired */
        if (AuthService.checkTokenExpired(token)) {
            return;
        }



        const foodArr = []
        for (let i = 0; i < cookieData.length; i++) {
            if (cookieData[i]._id in orderData.food) {
                const itemId = cookieData[i]._id;
                const item = { "foodId": cookieData[i]._id, "quantity": orderData.food[itemId] }
                foodArr.push(item)
            }
        }

        orderData.food = foodArr;


        /* use the api - to creating a new order */
        const response = await createOrder(token, orderData);
        if (!response.ok) {
            return;
        }


        const newOrderData = await response.json();

    }

    return (
        <Container className="p-2" fluid>
            <Row>
                <Col className="col-6">
                    {cookieData.map((item, i) => {
                        return (
                            <Container className="mb-30 col-8 p-3">
                                <Row>
                                    <Col className="col-12 pb-5">
                                        <Card className="m-1">
                                            <Card.Body>
                                                <Card.Title style={{ fontSize: "150%" }}>
                                                    {item.name}
                                                </Card.Title>
                                                <Card.Img className="mr-5" style={{ maxWidth: "250px" }} src={cookieImg[i]} />
                                                <Card.Text style={{ fontSize: "125%" }}>
                                                    Price: <i>  $ {item.price} </i>
                                                </Card.Text>
                                                <Card.Text style={{ fontSize: "125%" }}>
                                                    Ingredients: {item.ingredients}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>
                        );
                    })}
                </Col>
                <Col className="col-6">
                    <Container className="col-8" >
                        <Form className="p-3 m-3" onSubmit={onSubmitOrder}>
                            <Form.Group className="col-6">
                                <Form.Label style={{ fontSize: "125%" }}> <b>Order Name</b></Form.Label>
                                <Form.Control onChange={handleOnChange} name="orderName" value={orderNameData} type="string" placeholder="Enter a name for your order" active>
                                </Form.Control>
                            </Form.Group>
                            <h5 className="pt-1">Delivery date</h5>
                            <div className="col-6 pt-1">
                                <DatePicker name="orderDate" selected={orderDateData} onChange={(date) => setOrderDateData(date)} />
                            </div>
                            {cookieData.map((item) => {
                                return (
                                    <Form.Group className="col-6 pt-1">
                                        <Form.Label style={{ fontSize: "125%" }} > {item.name} </Form.Label>
                                        <Form.Control style={{ fontSize: "125%" }} onChange={handleOnChange} name={item._id} type="number" min="0" placeholder="0" active>
                                        </Form.Control>
                                    </Form.Group>
                                )
                            })}
                            <Button style={{ fontSize: "125%" }} variant="secondary" className="mt-3 col-6" type="submit" active>
                                Submit your order
                                <FaShoppingCart className="m-2" color="#eaded2" size={30} />
                            </Button>
                        </Form>
                    </Container >
                </Col>
            </Row>
        </Container >
    )
}
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ButtonGroup, Form, FormGroup } from "react-bootstrap";
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
        const getAllCookies = async () => {
            const response = await getAllFoods();
            console.log(response);
            if (!response.ok) {
                console.log(response.ok);
                return;
            }

            const cookieData = await response.json();
            if (cookieData) {


                setCookieData(cookieData);
                for (let i = 0; i < cookieData.length; i++) {
                    cookieData[i].picture = getImportName(cookieData[i].picture);
                }
                console.log(cookieData);

            }
        }

        getAllCookies();
    }, []);

    function getImportName(picturePath) {
        const arr = picturePath.split('/');
        const importName = arr[2].split('.');
        console.log(importName);
        return importName[0];
    }

    const [orderFormData, setOrderFormData] = useState({});
    const [orderNameData, setOrderNameData] = useState();

    function handleOnChange(event) {
        const { name, value } = event.target;

        if (name === 'orderName') {
            setOrderNameData(value);
        } else {
            setOrderFormData({ ...orderFormData, [name]: value });
        }
        console.log("!!!!!!!dglskjglksjgsdkl");
    }

    function onSubmitOrder(event) {
        event.preventDefault();

        console.log("orderName= " + orderNameData);
        console.log("orderFormData" + JSON.stringify(orderFormData));

        const orderData = {
            orderName: orderNameData,
            food: orderFormData
        };

        console.log("ORDERDATA=" + JSON.stringify(orderData));

        sendNewOrder(orderData);
        document.location.href = '/dashboard';

    }

    const sendNewOrder = async (orderData) => {
        if (!AuthService.isLoggedIn) {
            console.log('How did we get there with no one logged in?');
            return;
        }

        console.log('isLoggedIn');
        const token = AuthService.getToken();
        if (!token) {
            return;
        }

        console.log('got token');

        /* token exists, check if expired */
        if (AuthService.checkTokenExpired(token)) {
            return;
        }

        console.log('token has not expired');

        //for(let i=0; i<cookieData._id)
        console.log("COOOKKKKIIIESSSS= " + JSON.stringify(cookieData));

        const foodArr = []
        for (let i = 0; i < cookieData.length; i++) {
            if (cookieData[i]._id in orderData.food) {
                console.log(`id matches in db${cookieData[i]._id}`)
                const itemId = cookieData[i]._id;
                const item = { "foodId": cookieData[i]._id, "quantity": orderData.food[itemId] }
                console.log(`iittteeeemmmm food: ${JSON.stringify(item)}`)
                foodArr.push(item)
            }
        }

        orderData.food = foodArr;
        //console.log("New order data= " + JSON.stringify(orderDataa));


        /* use the api - to creating a new order */
        const response = await createOrder(token, orderData);
        if (!response.ok) {
            console.log(response.ok);
            return;
        }

        console.log('getMyInfo returned');

        const newOrderData = await response.json();
        console.log("New order= " + JSON.stringify(newOrderData));

    }

    return (
        <Container className="">
            {cookieData.map((item, i) => {
                return (
                    <Container className="mb-30 col-9 p-3">
                        <Row>
                            <Col className="col-12">
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

            <Form className="col-6 pb-5" onSubmit={onSubmitOrder}>
                <Form.Group className="col-6">
                    <Form.Label> <b>Order Name</b></Form.Label>
                    <Form.Control onChange={handleOnChange} name="orderName" value={orderNameData} type="string" placeholder="Enter a name for your order" active>
                    </Form.Control>
                </Form.Group>
                {cookieData.map((item) => {
                    return (
                        <Form.Group className="col-6 pt-1">
                            <Form.Label> {item.name} </Form.Label>
                            <Form.Control onChange={handleOnChange} name={item._id} type="number" min="0" placeholder="0" active>
                            </Form.Control>
                        </Form.Group>
                    )
                })}
                <Button variant="secondary" className="m-2 pb-3" type="submit" active>
                    Submit your order
                    <FaShoppingCart color="#eaded2" size={30} />
                </Button>
            </Form>
        </Container >
    )
}
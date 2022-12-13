import React, { useState, useEffect } from "react";
import CookieCounter from "./CookieCounter";
import { Container, Row, Col, Card, Button, ButtonGroup, Form, FormGroup } from "react-bootstrap";
import { getAllFoods, createOrder } from '../../utils/api';
import AuthService from '../../utils/auth';
import BrownChocolateChipCookie from "../assets/BrownChocolateChipCookie.png";
import CherryCheesecakeCookie from "../assets/CherryCheesecakeCookie.png";
import ChocolateCookie from "../assets/ChocolateCookie.png";
import PeanutButterCookie from "../assets/PeanutButterCookie.png";
import WalnutCookie from "../assets/WalnutCookie.png";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillBagDashFill, BsFillBagPlusFill } from "react-icons/bs";

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

        console.log("orderName= "+ orderNameData);
        console.log("orderFormData" + JSON.stringify(orderFormData));

        const orderData = {
            orderName: orderNameData,
            quantity: orderFormData
        };

        console.log("ORDERDATA="+JSON.stringify(orderData));

        sendNewOrder(orderData);

 }

    const sendNewOrder = async (orderData) => {
        if(!AuthService.isLoggedIn) {
            console.log('How did we get there with no one logged in?');
            return;
          } 
    
          console.log('isLoggedIn');
          const token = AuthService.getToken();
          if(!token) {
            return;
          }
    
          console.log('got token');
    
          /* token exists, check if expired */
          if(AuthService.checkTokenExpired(token)) {
            return;
          } 
    
          console.log('token has not expired');
    
          /* use the api - to creating a new order */
          const response = await createOrder(token, orderData);
          if (!response.ok) {
            console.log(response.ok);
            return;
          }
    
          console.log('getMyInfo returned');
    
          const newOrderData = await response.json();
          console.log("New order= "+JSON.stringify(newOrderData));
    
    }

    return (
        <Container className="pb-5">
            {cookieData.map((item, i) => {
                return (
                    <Container className="mb-30 col-9 p-3">
                        <Row>
                            <Col className="col-12">
                                <Card style={{ backgroundColor: "#DBBDC7" }} className="m-1">
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: "150%", color: "#504A6D" }}>
                                            {item.name}
                                        </Card.Title>
                                        <Card.Img className="mr-5" style={{ maxWidth: "250px" }} src={cookieImg[i]} />
                                        <Card.Text style={{ fontSize: "125%", color: "#504A6D" }}>
                                            Price: $ {item.price}
                                        </Card.Text>
                                        <Card.Text style={{ fontSize: "125%", color: "#504A6D" }}>
                                            Ingredients: {item.ingredients}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                );
            })}

            <Form onSubmit={onSubmitOrder}>
                <Form.Label>Order Name</Form.Label>
                <Form.Control onChange={handleOnChange} name="orderName"  value={orderNameData} type="string" placeholder="Enter a name for your order" active>
                </Form.Control>
                {cookieData.map((item) => {
                    return (
                        <Form.Group>
                            <Form.Label> {item.name} </Form.Label>
                            <Form.Control onChange={handleOnChange} name={item._id} type="number" placeholder="0" active>
                                </Form.Control> 
                        </Form.Group>
                    )
                })}
                <Button className="border-0 m-2" type="submit" style={{ backgroundColor: "#504A6D" }} active>
                        Submit your order
                        <FaShoppingCart color="#eaded2" size={30} />
                </Button>
            </Form>
        </Container >


    )
}
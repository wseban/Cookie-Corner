import React, { useState, useEffect } from "react";
import CookieCounter from "./CookieCounter";
import { Container, Row, Col, Card, Button, ButtonGroup, Form } from "react-bootstrap";
import { getAllFoods } from '../../utils/api';
import BrownChocolateChipCookie from "../assets/BrownChocolateChipCookie.png";
import CherryCheesecakeCookie from "../assets/CherryCheesecakeCookie.png";
import ChocolateCookie from "../assets/ChocolateCookie.png";
import PeanutButterCookie from "../assets/PeanutButterCookie.png";
import WalnutCookie from "../assets/WalnutCookie.png";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillBagDashFill, BsFillBagPlusFill } from "react-icons/bs";


export default function LoggedInMenu() {

    const [cookieData, setCookieData] = useState([]);
    const cookieImg = [
        BrownChocolateChipCookie,
        CherryCheesecakeCookie,
        ChocolateCookie,
        PeanutButterCookie,
        WalnutCookie
    ];

    // const [count, setCount] = useState([]);
    // const handleIncrement = (i) => {
    //     setCount(count[i] + 1);
    //     console.log(count[i]);

    // };

    // const handleDecrement = (i) => {
    //     if (count[i] > 0) {
    //         setCount(count[i] - 1);
    //     }
    // };
    




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
    if (!cookieData.length) {
        return <h2 className='p-4 text-center'>Loading...</h2>;
      }
    function getImportName(picturePath) {
        const arr = picturePath.split('/');
        const importName = arr[2].split('.');
        console.log(importName);
        return importName[0];
    }

    const cart = () => {
        document.location.href = '/dashboard';
    }


    const orderItems = [];
    
    const addItemToOrder = (item) => {
        const item = {};

    };

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
                                        <Form onSubmit={() => addItemToOrder(item)}>
                                            <Form.Group className="col-1 border-0 m-2" controlId="formBasic">
                                                <Form.Control type="number" placeholder="0" />
                                                <Form.Text className="text-muted"
                                                    style={{ color: "#eaded2", backgroundColor: "#504A6D" }}>
                                                    {/* <FaShoppingCart color="#eaded2" size={20} /> */}
                                                </Form.Text>
                                                <Button className="justify-content-center border-0 m-2" type="submit" style={{ backgroundColor: "#504A6D" }} active >
                                                    Add your order
                                                </Button>
                                                {/* <ButtonGroup>
                                                <Button className="justify-content-center border-0 m-2" style={{ backgroundColor: "#504A6D" }} onClick={() => handleDecrement(i)} active>
                                                    <BsFillBagDashFill color="#eaded2" size={30} />
                                                </Button>
                                                <Button className="justify-content-center border-0 m-2" style={{ backgroundColor: "#504A6D" }} onClick={() => handleIncrement(i)} active>
                                                    <BsFillBagPlusFill color="#eaded2" size={30} />
                                                </Button>
                                            </ButtonGroup> */}
                                            </Form.Group>
                                        </Form>
                                        {/* <CookieCounter price={item.price} /> */}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                );
            })}

            <Row className="justify-content-md-center">
                <Col className="col-2 pb-5">
                    <Button className="border-0 m-2" style={{ backgroundColor: "#504A6D" }} onClick={cart} active>
                        Submit your order
                        <FaShoppingCart color="#eaded2" size={30} />
                    </Button>
                </Col>
            </Row>
        </Container >


    )
}
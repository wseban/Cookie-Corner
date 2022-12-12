import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, InputGroup } from "react-bootstrap";
import { getAllFoods } from '../../utils/api';
import BrownChocolateChipCookie from "../assets/BrownChocolateChipCookie.png";
import CherryCheesecakeCookie from "../assets/CherryCheesecakeCookie.png";
import ChocolateCookie from "../assets/ChocolateCookie.png";
import PeanutButterCookie from "../assets/PeanutButterCookie.png";
import WalnutCookie from "../assets/WalnutCookie.png";
import { BsFillBagDashFill, BsFillBagPlusFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";


export default function LoggedInMenu() {

    const [cookieData, setCookieData] = useState([]);
    const cookieImg = [
        BrownChocolateChipCookie,
        CherryCheesecakeCookie,
        ChocolateCookie,
        PeanutButterCookie,
        WalnutCookie
    ]

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

    const cart = () => {
        document.location.href = '/viewOrder';
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
                                        <Button className="justify-content-center border-0 m-2" style={{ backgroundColor: "#504A6D" }} active>
                                            <BsFillBagDashFill color="#eaded2" size={30} />
                                        </Button>
                                        <Button className="justify-content-center border-0 m-2" style={{ backgroundColor: "#504A6D" }} active>
                                            <BsFillBagPlusFill color="#eaded2" size={30} />
                                        </Button>
                                        <InputGroup className="col-2 border-0 m-2">
                                            <InputGroup.Text style={{ color: "#eaded2", backgroundColor: "#504A6D" }}>$</InputGroup.Text>
                                            <InputGroup.Text style={{ color: "#eaded2", backgroundColor: "#504A6D" }}>0.00</InputGroup.Text>
                                        </InputGroup>
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
                        View order
                        <FaShoppingCart color="#eaded2" size={30} />
                    </Button>
                </Col>
            </Row>
        </Container>


    )
}
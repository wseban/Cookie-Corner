import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { getAllFoods } from '../../utils/api';
import BrownChocolateChipCookie from "../assets/BrownChocolateChipCookie.png";
import CherryCheesecakeCookie from "../assets/CherryCheesecakeCookie.png";
import ChocolateCookie from "../assets/ChocolateCookie.png";
import PeanutButterCookie from "../assets/PeanutButterCookie.png";
import WalnutCookie from "../assets/WalnutCookie.png";
import { BsFillBagDashFill, BsFillBagPlusFill } from "react-icons/bs";


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

    return (
        <Container>
            {cookieData.map((item, i) => {
                return (
                    <Container className="mb-30 col-9 p-2">
                        <Row>
                            <Col className="col-12">
                                <Card style={{ backgroundColor: "#DBBDC7" }} className="m-1">
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: "150%", color: "#504A6D" }}>
                                            {item.name}
                                        </Card.Title>
                                        <Card.Text style={{ fontSize: "125%", color: "#504A6D" }}>
                                            Price: $ {item.price}
                                        </Card.Text>
                                        <Card.Text style={{ fontSize: "125%", color: "#504A6D" }}>
                                            Ingredients: {item.ingredients}
                                        </Card.Text>
                                        <Card.Img className="mr-5" style={{ maxWidth: "250px" }} src={cookieImg[i]} />
                                        <Button className="border-0 m-2" style={{ backgroundColor: "#504A6D" }} active>
                                            <BsFillBagDashFill color="#eaded2" size={30} />
                                        </Button>
                                        <Button className="border-0 m-2" style={{ backgroundColor: "#504A6D" }} active>
                                            <BsFillBagPlusFill color="#eaded2" size={30} />
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                );
            })}
        </Container>


    )
}
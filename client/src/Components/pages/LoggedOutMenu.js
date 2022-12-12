import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { RxCookie } from "react-icons/rx";
import Menu from "../assets/Menu.pdf";
import BrownChocolateChipCookie from "../assets/BrownChocolateChipCookie.png";
import CherryCheesecakeCookie from "../assets/CherryCheesecakeCookie.png";
import ChocolateCookie from "../assets/ChocolateCookie.png";
import PeanutButterCookie from "../assets/PeanutButterCookie.png";
import WalnutCookie from "../assets/WalnutCookie.png";


export default function LoggedOutMenu() {
    return (
        <Container className="mb-30" fluid>
            <Row xs={1} md={3} className="justify-content-center">
                    <Col className="col-6 p-2 mt-5">
                        <Card className="border-0" style= {{backgroundColor:"#DBBDC7", maxWidth: "200px"}}>
                            <Card.Img variant="top" src={BrownChocolateChipCookie} />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-6 p-2 mt-5">
                        <Card className="border-0" style= {{backgroundColor:"#DBBDC7", maxWidth: "200px"}}>
                            <Card.Img variant="top" src={CherryCheesecakeCookie} />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-6 p-2 mt-5">
                        <Card className="border-0" style= {{backgroundColor:"#DBBDC7", maxWidth: "200px"}}>
                            <Card.Img variant="top" src={ChocolateCookie} />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-6 p-2 mt-5">
                        <Card className="border-0" style= {{backgroundColor:"#DBBDC7", maxWidth: "200px"}}>
                            <Card.Img variant="top" src={PeanutButterCookie} />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col className="col-6 p-2 mt-5">
                        <Card className="border-0" style= {{backgroundColor:"#DBBDC7", maxWidth: "200px"}}>
                            <Card.Img variant="top" src={WalnutCookie} />
                            <Card.Body>
                                <Card.Title>Card title</Card.Title>
                                <Card.Text>
                                    This is a longer card with supporting text below as a natural
                                    lead-in to additional content. This content is a little bit
                                    longer.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
            </Row>

            <Row className="justify-content-center">
                <Col className="col-4 p-2 mt-5">
                    <p style={{ fontSize: "150%", color: "#504A6D" }}> Click icon to download our menu
                        <a
                            className="btn justify-content-md-center mx-1"
                            href={Menu}
                            download="Menu.pdf"
                        >
                            <RxCookie color="#504A6D" size={30} />
                        </a>
                    </p>
                </Col>
            </Row>
        </Container>
    )
}
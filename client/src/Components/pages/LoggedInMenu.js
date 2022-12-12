import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import BrownChocolateChipCookie from "../assets/BrownChocolateChipCookie.png";
import CherryCheesecakeCookie from "../assets/CherryCheesecakeCookie.png";
import ChocolateCookie from "../assets/ChocolateCookie.png";
import PeanutButterCookie from "../assets/PeanutButterCookie.png";
import WalnutCookie from "../assets/WalnutCookie.png";
import { BsFillBagDashFill, BsFillBagPlusFill } from "react-icons/bs";

const cookies = [
    {
        name: "Brown Chocolate Chip Cookie",
        price: 7.5,
        ingredients: "Browned butter, Egg, Brown sugar, Baking soda, Vanilla",
        picture: BrownChocolateChipCookie
    },
    {
        name: "Cherry Cheesecake Cookie",
        price: 10,
        ingredients: "Cherry pie filling, Egg, White sugar, Baking soda, Vanilla",
        picture: CherryCheesecakeCookie

    },
    {
        name: "Chocolate Cookie",
        price: 5,
        ingredients: "Chocolate chips, Egg, White sugar, Baking soda, Vanilla",
        picture: ChocolateCookie

    },
    {
        name: "Peanut Butter Cookie",
        price: 7.5,
        ingredients: "Creamy full-fat peanut butter, Egg, White sugar, Baking soda, Vanilla",
        picture: PeanutButterCookie
    },
    {
        name: "Walnut Cookie",
        price: 5,
        ingredients: "Chopped walnuts, Egg, White sugar, Baking soda, Vanilla",
        picture: WalnutCookie
    }
];


export default function LoggedInMenu() {
    return (
        <Container>
            {cookies.map((item) => {
                return (
                    <Container className="mb-30 col-9 p-2">
                        <Row>
                            <Col className="col-12">
                                <Card style={{ backgroundColor: "#DBBDC7"}} className="m-1">
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
                                        <Card.Img className="mr-5" style={{maxWidth: "250px"}} src={item.picture} />
                                        <Button className="border-0 m-2" style={{ backgroundColor: "#504A6D"}} active>
                                            <BsFillBagDashFill color="#eaded2" size={30} />
                                        </Button>
                                        <Button className="border-0 m-2" style={{ backgroundColor: "#504A6D"}} active>
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
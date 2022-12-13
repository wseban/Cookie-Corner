import React, { useState, useEffect } from "react";
import { getOneOrder } from '../../utils/api';
import AuthService from '../../utils/auth';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Order() {
    const [orderData, setOrderData] = useState({});
    const [orderName, setOrderName] = useState();
    const [orderFoods, setFoods] = useState([]);
    const [orderDelivery, setDelivery] = useState();
    let { orderId } = useParams();
    const [sum, setSum] = useState(0);

    useEffect(() => {
        const getOrderInfo = async () => {
            const token = AuthService.getToken();

            try {
                const response = await getOneOrder(token, orderId);
                if (!response.ok) {
                    throw new Error('No orders from user');
                }

                const orderDataRes = await response.json();

                if (orderDataRes) {
                    setOrderName(orderDataRes.orderData.orderName);
                    console.log(orderDataRes.orderData.orderName)
                    setFoods(orderDataRes.orderData.food);
                    console.log(orderDataRes.orderData.food)
                    setDelivery(orderDataRes.orderData.deliveryDate);
                    console.log(orderDataRes.orderData.deliveryDate)

                }

                const priceData = await (orderDataRes.orderData.food.map(food => food.price));

                let calcSum = 0;
                for (let i = 0; i < priceData.length; i++) {
                    calcSum += priceData[0];
                }
                setSum(calcSum)

            } catch (err) {
                console.error(err);
            }
        };
        getOrderInfo();
    }, [orderId]);

    return (
        <Container fluid>
            <Row className="text-center" style={{ fontSize: "300%" }}>
                <Col xs={12}>
                    Order: {orderName}
                </Col>
            </Row>
            <Row style={{ fontSize: "250%" }}>
                <Col xs={6}>
                    Cookies
                </Col>
                <Col xs={3} className="text-center">
                    Quantity
                </Col>
                <Col xs={3} className="text-center">
                    Price
                </Col>
            </Row>

            {orderFoods
                ?
                orderFoods.map((food) => (
                    <>
                        <Row style={{ fontSize: "150%" }}>
                            <Col xs={6}>
                                {food.name}
                            </Col>
                            <Col xs={3} className="text-center">
                                num
                            </Col>
                            <Col xs={3} className="text-center">
                                ${food.price}
                            </Col>
                        </Row>
                    </>
                ))
                :
                <div>
                    <p>No cookies added to your order</p>
                </div>
            }

            <Row style={{ fontSize: "175%" }}>
                <Col xs={6}></Col>
                <Col xs={3} className="text-center">
                    Total Price
                </Col>
                <Col xs={3} className="text-center">
                    ${sum}
                </Col>
            </Row>

        </Container>
    )

    // if (orderData.length > 0) {
    //     return (

    //         <div className="container" style={{ color: "#504A6D" }}>
    //             <div className="row text-center">
    //                 <h2 className="m-3" style={{ fontSize: "300%" }}>Order: {userName}</h2>
    //             </div>
    //             <hr style={{ borderTop: "solid 5px #ff69b4" }}></hr>
    //             <div className="row" style={{ fontSize: "250%" }}>
    //                 <p className="col-6"> Cookies</p>
    //                 <p className="col-3 text-center">Quantity</p>
    //                 <p className="col-3 text-center">Price</p>
    //             </div>

    //             {orderData
    //                 ?
    //                 orderData.map((food) => (
    //                     <div key={food._id}>
    //                         <div className="row" style={{ fontSize: "150%" }}>
    //                             <p className="col-6">{food.name}</p>
    //                             <p className="col-3 text-center">num</p>
    //                             <p className="col-3 text-center">${food.price}</p>
    //                         </div>
    //                     </div>
    //                 ))
    //                 :
    //                 <div>
    //                     <p>No cookies added to your order</p>
    //                 </div>
    //             }
    //             <hr style={{ borderTop: "solid 5px #ff69b4" }}></hr>
    //             <div className="row" style={{ fontSize: "150%" }}>
    //                 <p className="col-7"></p>
    //                 <p className="col-2" style={{ fontSize: "125%" }}>Total Price:</p>
    //                 <p className="col-3 mb-2 text-center" style={{ fontSize: "125%" }}>${sum}</p>
    //             </div>
    //             <div className="row" style={{ fontSize: "150%" }}>
    //                 <div className="col-10"></div>
    //                 <Button className="col-2" style={{ fontSize: "110%", backgroundColor: "#504A6D", color: "#eaded2", border: "none" }}>Confirm Order</Button>
    //             </div>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div className="container text-center" style={{ color: "#504A6D" }}>
    //             <div className="row text-center">
    //                 <h2 className="m-3" style={{ fontSize: "300%" }}>Welcome, {userName}</h2>
    //             </div>
    //             <hr style={{ borderTop: "solid 5px #ff69b4" }}></hr>
    //             <div className="row text-center">
    //                 <p className="m-3" style={{ fontSize: "150%" }}>No cookies in your order</p>
    //             </div>
    //         </div>
    //     )
    // }
}
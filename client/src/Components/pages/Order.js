import React, { useState, useEffect } from "react";
import { getOneOrder, updateOrder, updateQuantity } from '../../utils/api';
import AuthService from '../../utils/auth';
import { Button, Container, Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Order() {
    const [orderName, setOrderName] = useState();
    const [orderFoods, setFoods] = useState([]);
    const [orderDelivery, setDelivery] = useState();
    let { orderId } = useParams();
    const [sum, setSum] = useState(0);
    const token = AuthService.getToken();

    const [updateOrderName, setUpdateOrderName] = useState();
    const [updateOrderFoods, setUpdateOrderFoods] = useState([]);
    const [updateOrderDelivery, setUpdateOrderDelivery] = useState()

    useEffect(() => {

        const getOrderInfo = async () => {

            try {
                const response = await getOneOrder(token, orderId);
                if (!response.ok) {
                    throw new Error('No orders from user');
                }

                const orderDataRes = await response.json();

                if (orderDataRes) {
                    setOrderName(orderDataRes.orderData.orderName);
                    setFoods(orderDataRes.orderData.quantity);
                    // console.log(`orderdataaaa ${JSON.stringify(orderDataRes.orderData)}`);
                    // console.log(`food order each${JSON.stringify(orderDataRes.orderData.quantity)}`);
                    const foodArr = JSON.parse(JSON.stringify(orderDataRes.orderData.quantity));
                    setDelivery(orderDataRes.orderData.deliveryDate);
                    setUpdateOrderFoods(foodArr);
                    console.log(`setupdateorderinitial${JSON.stringify(foodArr)}`);
                }

                const priceData = await (orderDataRes.orderData.quantity.map(food => food.quantity * food.foodId.price));

                let calcSum = 0;
                for (let i = 0; i < priceData.length; i++) {
                    calcSum += priceData[i];
                }
                setSum(calcSum)

            } catch (err) {
                console.error(err);
            }
        };
        getOrderInfo();
    }, [orderId, token]);

    //const foodArr = JSON.parse(JSON.stringify(orderFoods));
    //console.log(`foooodarrrrr${JSON.stringify(foodArr)}`)

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        const index = event.target.getAttribute("index")
        if (name === 'orderName') {
            if (value === '') {
                setUpdateOrderName(orderName)
            } else {
                setUpdateOrderName(value)
            }
        }
        if (name === 'quantity') {
            if (updateOrderFoods.length < 1) {
                const foodArrUpdate = updateOrderFoods.map((foodItem, j) => {
                    if (index == j) {

                        if (value === "") {
                            foodItem.quantity = orderFoods[j].quantity
                        } else {
                            foodItem.quantity = value
                        }
                        return foodItem;
                    } else {
                        return foodItem
                    }
                })
                const priceData = (foodArrUpdate.map(food => food.quantity * food.foodId.price));
                let calcSum = 0;
                for (let i = 0; i < priceData.length; i++) {
                    calcSum += priceData[i];
                }
                setSum(calcSum)
            } else {
                const foodArrUpdate = updateOrderFoods.map((foodItem, j) => {
                    if (index == j) {

                        if (value === "") {
                            foodItem.quantity = orderFoods[j].quantity
                        } else {
                            foodItem.quantity = value
                        }
                        return foodItem;
                    } else {
                        return foodItem
                    }
                })
                const priceData = (foodArrUpdate.map(food => food.quantity * food.foodId.price));
                let calcSum = 0;
                for (let i = 0; i < priceData.length; i++) {
                    calcSum += priceData[i];
                }
                setSum(calcSum)
                setUpdateOrderFoods(foodArrUpdate)
                console.log(`iiiwantdaaattaaaa ${JSON.stringify(updateOrderFoods[1])}`);
            }
        }
    }

    console.log(`updattteeddd ${JSON.stringify(updateOrderFoods)}`);
    console.log(`reeeeeeggg fod ${JSON.stringify(orderFoods)}`);

    const handleUpdateForm = async (event) => {
        event.preventDefault();

        let foodArrData = [];

        if (updateOrderFoods.length < 1) {
            foodArrData = orderFoods
        } else {
            foodArrData = updateOrderFoods
        }

        const updateData = { orderName: updateOrderName, food: foodArrData };

        try {
            if (updateData.orderName) {
                const response = await updateOrder(token, orderId, updateData);

                if (!response.ok) {
                    throw new Error(response.message);
                }
            }


            for (let i = 0; i < updateData.food.length; i++) {
                const quantityId = updateData.food[i]._id;
                const updateQuantityData = { quantity: `${updateData.food[i].quantity}` };
                // console.log(`quantityId ${JSON.stringify(quantityId)}`)
                // console.log(`quantitydata ${JSON.stringify(updateQuantityData)}`)
                const response = await updateQuantity(token, quantityId, updateQuantityData);

                if (!response.ok) {
                    throw new Error(response.message);
                }
            }
            //console.log(`submitted data ${JSON.stringify(updateOrderFoods)}`);

        } catch (err) {
            alert(err);
        }
        document.location.href = '/dashboard';

    }


    return (
        <Container style={{ color: "#504A6D" }} fluid>
            <Form
                onSubmit={handleUpdateForm}
            >
                <Row className='d-flex justify-content-center text-center' style={{ fontSize: "300%", borderBottom: "solid 5px #ff69b4" }}>

                    <FormLabel className="col-sm-4 col-form-label">Order Name</FormLabel>

                    <Col className='m-auto' xs={8}>
                        <FormGroup id='name'>
                            <FormControl size="lg" type='string'
                                name='orderName'
                                placeholder={orderName}
                                onChange={handleOnChange}
                            >
                            </FormControl>
                        </FormGroup>
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

                {updateOrderFoods.length
                    ?
                    updateOrderFoods.map((food, i) => (
                        <>
                            <Row style={{ fontSize: "150%" }}>
                                <Col xs={6}>
                                    {food.foodId.name}
                                </Col>
                                <Col xs={3} className="text-center">
                                    <FormGroup className='' id='name'>
                                        <FormControl type='string'
                                            name='quantity'
                                            index={i}
                                            placeholder={food.quantity ? food.quantity : 0}
                                            onChange={handleOnChange}
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </Col>

                                <Col xs={3} className="text-center">
                                    ${food.foodId.price * food.quantity}
                                </Col>

                            </Row>
                        </>
                    ))
                    :
                    orderFoods.map((food, i) => (
                        <>
                            {/* <Row style={{ fontSize: "150%" }}>
                                <Col xs={6}>
                                    {food.foodId.name}
                                </Col>
                                <Col xs={3} className="text-center">
                                    <FormGroup className='' id='name'>
                                        <FormControl type='string'
                                            name='quantity'
                                            index={i}
                                            placeholder={food.quantity ? food.quantity : 0}
                                            onChange={handleOnChange}
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </Col>

                                <Col xs={3} className="text-center">
                                    ${food.foodId.price*food.quantity}
                                </Col>

                            </Row> */}
                        </>
                    ))
                }

                <Row style={{ fontSize: "175%", borderBottom: "solid 5px #ff69b4" }}>
                    <Col xs={6}></Col>
                    <Col xs={3} className="text-center">
                        Total Price
                    </Col>
                    <Col xs={3} className="text-center">
                        ${sum}
                    </Col>
                </Row>

                <Row style={{ fontSize: "175%"}}>
                    <Col xs={9}></Col>
                    <Col xs={3} className="text-center">
                        <Button className='mt-2' type='submit' size="lg" style={{ fontSize: "110%", backgroundColor: "#504A6D", color: "#eaded2", border: "none" }}>
                            Update Order
                        </Button>
                    </Col>
                </Row>

            </Form>

        </Container>
    )
}
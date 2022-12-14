import React, { useState, useEffect } from "react";
import { getOneOrder, updateOrder } from '../../utils/api';
import AuthService from '../../utils/auth';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Button, Container, Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Order() {
    const [initOrderName, setInitOrderName] = useState();
    const [initOrderFoods, setinitOrderFoods] = useState([]);
    const [initOrderDate, setinitOrderDate] = useState();
    let { orderId } = useParams();
    const [calcSum, setSum] = useState(0);
    const token = AuthService.getToken();

    const [updateOrderName, setUpdateOrderName] = useState();
    const [updateOrderFoods, setUpdateOrderFoods] = useState([]);


    useEffect(() => {

        const getOrderInfo = async () => {

            try {
                const response = await getOneOrder(token, orderId);
                if (!response.ok) {
                    throw new Error('No orders from user');
                }

                const orderDataRes = await response.json();

                if (orderDataRes) {
                    setInitOrderName(orderDataRes.orderData.orderName);
                    setinitOrderFoods(orderDataRes.orderData.food);
                    setinitOrderDate(new Date(orderDataRes.orderData.deliveryDate));
                    const foodArr = JSON.parse(JSON.stringify(orderDataRes.orderData.food));
                    setUpdateOrderFoods(foodArr);
                }

                const priceData = await (orderDataRes.orderData.food.map(food => food.quantity * food.foodId.price));

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

    if (initOrderFoods.length < 1) {
        return <h2 className='p-4 text-center'>Loading...</h2>;
    }

    const handleOnChange = (event) => {
        const { name, value } = event.target;
        const index = event.target.getAttribute("index")
        if (name === 'orderName') {
            if (value === '') {
                setUpdateOrderName(initOrderName)
            } else {
                setUpdateOrderName(value)
            }
        }
        if (name === 'quantity') {
            const foodArrUpdate = updateOrderFoods.map((foodItem, j) => {
                if (index == j) {

                    if (value === "") {
                        foodItem.quantity = initOrderFoods[j].quantity
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

        }
    }

    const handleUpdateForm = async (event) => {
        event.preventDefault();

        let foodArrData = [];

        if (updateOrderFoods.length < 1) {
            foodArrData = initOrderFoods
        } else {
            foodArrData = updateOrderFoods
        }

        const updateData = { orderName: updateOrderName, food: foodArrData, deliveryDate: initOrderDate };

        try {

            const response = await updateOrder(token, orderId, updateData);

            if (!response.ok) {
                throw new Error(response.message);
            }


        } catch (err) {
            alert(err);
        }
        document.location.href = '/dashboard';

    }


    return (
        <Container style={{ color: "#504A6D" }} className="mb-30 col-9 p-3" fluid>
            <Form
                onSubmit={handleUpdateForm}
            >
                <Row className='d-flex justify-content-center text-center' style={{ fontSize: "300%" }}>

                    <FormLabel className="col-sm-4 col-form-label">Order Name</FormLabel>

                    <Col className='m-auto' xs={8}>
                        <FormGroup id='name'>
                            <FormControl size="lg" type='string'
                                name='orderName'
                                placeholder={initOrderName}
                                onChange={handleOnChange}
                            >
                            </FormControl>
                        </FormGroup>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center text-center' style={{ fontSize: "220%", borderBottom: "solid 5px #ff69b4" }}>

                    <FormLabel className="col-sm-4 col-form-label">Delivery Date</FormLabel>

                    <Col className='m-auto' xs={8}>
                        <FormGroup id='name'>
                            <DatePicker name="orderDate" selected={initOrderDate} onChange={(date) => setinitOrderDate(date)} />
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
                            <Row style={{ fontSize: "150%" }} className="mb-3">
                                <Col xs={6}>
                                    {food.foodId.name}
                                </Col>
                                <Col xs={3} className="text-center">
                                    <FormGroup className='' id='name'>
                                        <FormControl type='number'
                                            min='0'
                                            name='quantity'
                                            index={i}
                                            placeholder={food.quantity ? food.quantity : 0}
                                            onChange={handleOnChange}
                                        >
                                        </FormControl>
                                    </FormGroup>
                                </Col>

                                <Col xs={3} className="text-center">
                                    ${food.quantity * food.foodId.price}
                                </Col>

                            </Row>
                        </>
                    ))
                    :
                    initOrderFoods.map((food, i) => (
                        <>
                        </>
                    ))
                }

                <Row style={{ fontSize: "175%", borderTop: "solid 5px #ff69b4" }} className="mb-3">
                    <Col xs={6}></Col>
                    <Col xs={3} className="text-center">
                        Total Price
                    </Col>
                    <Col xs={3} className="text-center">
                        ${calcSum}
                    </Col>
                </Row>

                <Row style={{ fontSize: "175%" }}>
                    <Col xs={9}></Col>
                    <Col xs={3} className="text-center">
                        <Button variant='secondary' className='mt-2' type='submit' size="lg" style={{ fontSize: "110%", color: "#eaded2", border: "none" }}>
                            Update Order
                        </Button>
                    </Col>
                </Row>

            </Form>

        </Container>
    )
}
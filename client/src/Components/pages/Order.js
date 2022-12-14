import React, { useState, useEffect } from "react";
import { getOneOrder, updateOrder, updateQuantity } from '../../utils/api';
import AuthService from '../../utils/auth';
import { Button, Container, Row, Col, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

export default function Order() {
    const [initOrderName, setInitOrderName] = useState();
    const [initOrderFoods, setinitOrderFoods] = useState([]);
    //const [orderDelivery, setDelivery] = useState();
    let { orderId } = useParams();
    const [sum, setSum] = useState(0);
    const token = AuthService.getToken();

    const [updateOrderName, setUpdateOrderName] = useState();
    const [updateOrderFoods, setUpdateOrderFoods] = useState([]);
    //const [updateOrderDelivery, setUpdateOrderDelivery] = useState()

    
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
                    console.log(`orderdataaaa ${JSON.stringify(orderDataRes.orderData)}`);
                    // console.log(`food order each${JSON.stringify(orderDataRes.orderData.quantity)}`);
                    const foodArr = JSON.parse(JSON.stringify(orderDataRes.orderData.food));
                    //setDelivery(orderDataRes.orderData.deliveryDate);
                    setUpdateOrderFoods(foodArr);
                    console.log(`setupdateorderinitial${JSON.stringify(foodArr)}`);
                }

                const priceData = await (orderDataRes.orderData.food.map(food => food.foodId.price * food.foodId.price));
                console.log(`ppprrriiiccceee data ${(priceData)}`);

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

    //const foodArr = JSON.parse(JSON.stringify(initOrderFoods));
    //console.log(`foooodarrrrr${JSON.stringify(foodArr)}`)

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
            console.log(`iiiwantdaaattaaaa ${JSON.stringify(updateOrderFoods[1])}`);

        }
    }

    console.log(`updattteeddd ${JSON.stringify(updateOrderFoods)}`);
    console.log(`reeeeeeggg fod ${JSON.stringify(initOrderFoods)}`);

    const handleUpdateForm = async (event) => {
        event.preventDefault();

        let foodArrData = [];

        if (updateOrderFoods.length < 1) {
            foodArrData = initOrderFoods
        } else {
            foodArrData = updateOrderFoods
        }

        const updateData = { orderName: updateOrderName, food: foodArrData };
        console.log(`arrDaratosendtoDb ${JSON.stringify(updateData)}`)

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
                <Row className='d-flex justify-content-center text-center' style={{ fontSize: "300%", borderBottom: "solid 5px #ff69b4" }}>

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
                                    ${food.foodId.price * food.quantity}
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

                <Row style={{ fontSize: "175%", borderBottom: "solid 5px #ff69b4" }} className="mb-3">
                    <Col xs={6}></Col>
                    <Col xs={3} className="text-center">
                        Total Price
                    </Col>
                    <Col xs={3} className="text-center">
                        ${sum}
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
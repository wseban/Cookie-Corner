import React, { useState, useEffect } from "react";
import { getMyInfo, getSingleFood } from '../../utils/api';
import AuthService from '../../utils/auth';
import { Button } from 'react-bootstrap';

export default function Order() {
    const [orderData, setOrderData] = useState([]);
    const [userName, setuserName] = useState();
    const token = AuthService.getToken();
    const [sum, setSum] = useState(0);

    useEffect(() => {
        const getOrderInfo = async () => {
            try {
                const res = await getMyInfo(token);
                if (!res.ok) {
                    throw new Error('No orders from user');
                }
                const userData = await res.json();
                setuserName(userData.fullName)

                const allUserOrders = userData.orders;

                if (allUserOrders.length > 0) {
                    const currentOrder = allUserOrders[allUserOrders.length - 1];
                    console.log(currentOrder)
                    const foodInfoRes = await Promise.all(currentOrder.food.map(async foodId => (await getSingleFood(foodId))));
                    const orderFoodData = await Promise.all(foodInfoRes.map(async res => (await res.json())));
                    console.log(orderFoodData)
                    setOrderData(orderFoodData);

                    const priceData = await (orderFoodData.map(food => food.price));
                    let calcSum = 0;
                    for (let i = 0; i < priceData.length; i++) {
                        calcSum += priceData[0];
                    }
                    setSum(calcSum)

                }
            } catch (err) {
                console.error(err);
            }
        };
        getOrderInfo();
    }, [token, sum]);

    if (orderData.length > 0) {
        return (

            <div className="container" style={{ color: "#504A6D" }}>
                <div className="row text-center">
                    <h2 className="m-3" style={{ fontSize: "300%" }}>Welcome, {userName}</h2>
                </div>
                <hr style={{ borderTop: "solid 5px #ff69b4" }}></hr>
                <div className="row" style={{ fontSize: "250%" }}>
                    <p className="col-6"> Cookies</p>
                    <p className="col-3 text-center">Quantity</p>
                    <p className="col-3 text-center">Price</p>
                </div>

                {orderData
                    ?
                    orderData.map((food) => (
                        <div key={food._id}>
                            <div className="row" style={{ fontSize: "150%" }}>
                                <p className="col-6">{food.name}</p>
                                <p className="col-3 text-center">num</p>
                                <p className="col-3 text-center">${food.price}</p>
                            </div>
                        </div>
                    ))
                    :
                    <div>
                        <p>No cookies added to your order</p>
                    </div>
                }
                <hr style={{ borderTop: "solid 5px #ff69b4" }}></hr>
                <div className="row" style={{ fontSize: "150%"}}>
                    <p className="col-7"></p>
                    <p className="col-2" style={{ fontSize: "125%"}}>Total Price:</p>
                    <p className="col-3 mb-2 text-center" style={{ fontSize: "125%"}}>${sum}</p>
                </div>
                <div className="row" style={{ fontSize: "150%"}}>
                    <div className="col-10"></div>
                <Button className="col-2" style={{ fontSize: "110%", backgroundColor: "#504A6D", color:"#eaded2", border:"none" }}>Confirm Order</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container text-center" style={{ color: "#504A6D" }}>
                 <div className="row text-center">
                    <h2 className="m-3" style={{ fontSize: "300%" }}>Welcome, {userName}</h2>
                </div>
                <hr style={{ borderTop: "solid 5px #ff69b4" }}></hr>
                <div className="row text-center">
                    <p className="m-3" style={{ fontSize: "150%" }}>No cookies in your order</p>
                </div>
            </div>
        )
    }
}
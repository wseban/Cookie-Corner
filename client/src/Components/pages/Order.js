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
                    let calcSum=0;
                    for(let i=0; i<priceData.length; i++){
                        calcSum+=priceData[0];
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
                <div className="row" style={{ fontSize: "250%" }}>
                    <p className="col-9"> Cookies</p>
                    <p className="col-3">Price</p>
                </div>

                {orderData
                    ?
                    orderData.map((food) => (
                        <div key={food._id}>
                            <div className="row" style={{ fontSize: "150%" }}>
                                <p className="col-9">{food.name}</p>
                                <p className="col-3">${food.price}</p>
                            </div>
                        </div>
                    ))
                    :
                    <div>
                        <p>No cookies added to your order</p>
                    </div>
                }
                <div className="row" style={{ fontSize: "150%", width: "100%" }}>
                    <hr style={{ borderTop: "solid 5px #ff69b4" }}></hr>
                    <div className=" mb-2 offset-md-9">
                        <p className="">${sum}</p>
                    </div>
                </div>
                <div className="offset-md-9">
                    <Button style={{ fontSize: "125%", backgroundColor: "#504A6D"}}>Confirm Order</Button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container text-center" style={{ color: "#504A6D" }}>
                <div>
                    <h2>Welcome, {userName}</h2>
                </div>
                <div>
                    <p>No cookies added to your order</p>
                </div>
            </div>
        )
    }
}
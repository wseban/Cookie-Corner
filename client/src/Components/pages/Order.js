import React, { useState, useEffect } from "react";
import { getMyInfo, getSingleFood } from '../../utils/api';
import AuthService from '../../utils/auth';

export default function Order() {
    const [orderData, setOrderData] = useState([]);
    const [userName, setuserName] = useState();
    const token = AuthService.getToken();

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
                }
            } catch (err) {
                console.error(err);
            }
        };
        getOrderInfo();
    }, [token]);

    return (

        <div>
            <h2>Welcome, {userName}</h2>
            {orderData.length > 0
                ?
                orderData.map((food) => (
                    <div key={food._id} className="col-12">
                        <div className="p-3">
                            <p className="card-body">Name: {food.name} Price {food.price}</p>
                        </div>
                    </div>
                ))
                //<div></div>
                : <div>
                    <p>No cookies added to your order</p>
                </div>
            }
        </div >
    )
}
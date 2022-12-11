import React, { useState, useEffect } from "react";
import { getMyInfo, getSingleFood } from '../../utils/api';
import AuthService from '../../utils/auth';

export default function Order() {
    const [orderData, setOrderData] = useState([]);
    const token = AuthService.getToken();

    useEffect(() => {
        const getOrderInfo = async () => {
            try {
                const res = await getMyInfo(token);
                if (!res.ok) {
                    throw new Error('No orders from user');
                }
                const userData = await res.json();
                const allUserOrders = userData.orders;
                const currentOrder = allUserOrders[allUserOrders.length-1];
                console.log(currentOrder)
                const foodInfoRes = await Promise.all(currentOrder.food.map(async foodId => (await getSingleFood(foodId))));
                const orderFoodData = await Promise.all(foodInfoRes.map(async res => (await res.json())));
                console.log(orderFoodData)
                setOrderData(orderFoodData);
            } catch (err) {
                console.error(err);
            }
        };
        getOrderInfo();
    }, [token]);

    return (

        <div>
            <h2>Welcome, </h2>
            {orderData
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
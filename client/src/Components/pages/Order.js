import React, { useState, useEffect } from "react";
import { getMyInfo } from '../../utils/api';
import AuthService from '../../utils/auth';

export default function Order() {
    const [orderData, setOrderData] = useState({});
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
                setOrderData(allUserOrders[allUserOrders.length-1]);
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
                orderData.food.map((food) => (
                    <div key={food} className="col-12">
                        <div className="p-3">
                            <p className="card-body">Name: {food} Price {food}</p>
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
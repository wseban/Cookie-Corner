/* Food routes */
export const getAllFoods = () => {
    return fetch('api/cookies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

export const getSingleFood = (foodId) => {
    return fetch(`api/cookies/${foodId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

/* Order routes */
export const createOrder = (token, orderData) => {
    return fetch( '/api/orders/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData)
    });
};

export const getOneOrder = (token, orderId ) => {
    return fetch( `/api/orders/${orderId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    });
}

export const updateOrder = (token, orderId, orderData) => {
    return fetch( `/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData)
    });
}

export const deleteOrder = (token, orderId ) => {
    return fetch( `/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    });
}

/* User routes */
export const signupUser = (userData) => {
    return fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });
}

export const loginUser = (userData) => {
    return fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });    
}

export const getMyInfo = (token) => {
    return fetch( '/api/users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    });
}



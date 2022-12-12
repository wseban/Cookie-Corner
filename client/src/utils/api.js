export const getAllFoods = () => {
    return fetch('api/cookies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

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
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        }
    });
}

export const getSingleFood = (foodId) => {
    return fetch(`api/cookies/${foodId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
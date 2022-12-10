export const getAllFoods = () => {
    return fetch('api/cookies', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
};
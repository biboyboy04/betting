export const handleResponse = async(res, promise, status = 200) => {
    // res = used to make this function to set some statuses from the route handler (function that was passed to the route)
    // refactor promise to a more readable name?
    // promise = function passed to controller from the model
    try {
        const result = await promise;
        res.status(status).json(result);
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

export const getRandomIndex = (length) => {
    return Math.floor(Math.random() * length);
}
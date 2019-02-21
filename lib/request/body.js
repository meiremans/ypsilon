const validateBodyParams = (body, params) => {
    Object.keys(body).map((bodyKey) => {
        if (!params.some((param) => {
            return param === bodyKey;
        })) {
            throw new Error(`${bodyKey} is not allowed in the request body`)
        }

    });
    params.map((param) => {
        if (!body[param]) {
            throw new Error(`${param} is obliged in request body`)
        }
    })
};

module.exports = {
    validateBodyParams
};


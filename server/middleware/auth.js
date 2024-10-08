import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        if (token && isCustomAuth) {
            const decodedData = jwt.verify(token, 'test');
            req.userId = decodedData?.id;
        } else {
            const decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
        }
    } catch (error) {
        console.log(error);
    }
    next()
}

export default auth;
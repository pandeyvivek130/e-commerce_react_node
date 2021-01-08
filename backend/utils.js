import jwt from 'jsonwebtoken';

export const generateToken = (user) => {

    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAmin: user.isAdmin
    },
    process.env.JWT_SECRET || 'somethingSecret',
    {
        expiresIn : '30d'
    }
    );
}
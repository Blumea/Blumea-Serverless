const { generateEmailVerification, verifyEmail } = require('../services/verification.service');



const generateTokenController = (req, res) => {
    const email = req.body.email || req.body.mail;

    if (email === undefined || email === null || email === '') {
        return res.status(401).json({
            status: 401,
            message: 'Invalid email provided',
            data: null
        })
    }


    let isGenerated = generateEmailVerification(email);

    if (!isGenerated) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong while generating verification link',
            data: null
        })
    } else {
        return res.status(200).json({
            status: 200,
            message: 'Email verification link generated and sent',
            data: null
        })
    }
}

const verifyEmailController = (req, res) => {
    const token = req.params.token;

    if (token === null || token === undefined || token === '') {
        return res.status(401).json({
            status: 401,
            message: 'Verification link is invalid or has expired',
            data: null
        })
    }

    let isVerified = verifyEmail(token);

    if (!isVerified) {
        res.status(401).json({
            status: 401,
            message: 'Verification link is invalid or has expired',
            data: null
        })
    } else {
        return res.status(200).json({
            status: 200,
            message: 'Email has been successfully verified',
            data: null
        })
    }
}

module.exports = { generateTokenController, verifyEmailController }
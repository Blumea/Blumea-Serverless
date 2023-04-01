/*******************************************
 * copyright: @github.com/Blumea
 * authors: @akashchouhan16
 * *****************************************
*/

// Version 1: In memory solution 

require('dotenv').config({ path: __dirname + '/../.env' });
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const { log, warn } = require('console');

const ADMIN_EMAIL_NOREPLY = process.env.ADMIN_EMAIL_NOREPLY;
const ADMIN_APPTOKEN_NOREPLY = process.env.ADMIN_APPTOKEN_NOREPLY;
const TRANSPORTER_HOSTNAME = process.env.TRANSPORTER_HOSTNAME;
const TRANSPORTER_PORT = process.env.TRANSPORTER_PORT;


// TODO: Use MongoDB Atlas to store generated tokens.
const tokens = {};


const generateEmailVerification = async (email) => {
    if (email === null || email === undefined || email === '')
        return null;

    const transporter = nodemailer.createTransport({
        host: TRANSPORTER_HOSTNAME,
        port: TRANSPORTER_PORT,
        auth: {
            user: ADMIN_EMAIL_NOREPLY,
            pass: ADMIN_APPTOKEN_NOREPLY,
        }
    })


    try {
        const token = uuidv4();
        tokens[token] = email;

        // verification email to the user
        await transporter.sendMail({
            from: ADMIN_EMAIL_NOREPLY,
            to: email,
            subject: 'Hi, Please verify your email address',
            html: `
        <p>Hello!</p>
        <p>Please click the link below to verify your email address:</p>
        <a href="https://blumea-serverless.vercel.app/api/mail/verify/${token}">Verify Email</a>
        <p> Regards, </p>
        <p> Team Blumea <p>
      `
        });

        return true;
    } catch (err) {
        warn(err);
        return false;
        // throw new Error('Something went wrong while verifying email');
    }
}


const verifyEmail = (token) => {
    if (token === null || token === undefined || token === '')
        return false;
    else {
        const email = tokens[token];

        if (!email) {
            warn('Confirmation Link has expired or is invalid!');
            return false;
        }

        delete tokens[token]; //nullify the token once verified and send confirmation
        log(`Email has been verified for email: ${email} with token: ${token}`);
        return true;
    }
}

module.exports = { verifyEmail, generateEmailVerification }
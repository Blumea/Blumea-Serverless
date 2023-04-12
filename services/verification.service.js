/*******************************************
 * copyright: @github.com/Blumea
 * authors: @akashchouhan16
 * *****************************************
*/

// Version 1: In memory solution 

require('dotenv').config({ path: __dirname + '/../.env' });
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');
const { v4: uuidv4 } = require('uuid');
const { log, warn } = require('console');

const ADMIN_EMAIL_NOREPLY = process.env.ADMIN_EMAIL_NOREPLY;
const ADMIN_APPTOKEN_NOREPLY = process.env.ADMIN_APPTOKEN_NOREPLY;
const TRANSPORTER_HOSTNAME = process.env.TRANSPORTER_HOSTNAME;
const TRANSPORTER_PORT = process.env.TRANSPORTER_PORT;


// TODO: Use MongoDB Atlas to store generated tokens.
const tokens = {};


const generateEmailVerification = async (email) => {
    try {
        if (!email || typeof email !== 'string' || !emailValidator.validate(email)) {
            throw new Error('Invalid email address');
        }

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
                from: `Blumea <${ADMIN_EMAIL_NOREPLY}>`,
                to: email,
                subject: 'Hi, Please verify your email address',
                html: `<body color='#191c1a'><img src='https://user-images.githubusercontent.com/56465610/215419028-c5b3987d-4e9d-4cbb-931f-438a33ce07d4.png' width='600px' alt='Sent from Blumea-Serverless'/>
        <p>Hello!</p>
        <p>Please click the link below to verify your email address:</p>
        <a href="https://blumea-serverless-v2.onrender.com/api/mail/verify/${token}">Verify Email</a>
        <p> Regards, </p>
        <p> Team Blumea <p>
      </body>`
            });

            return true;
        } catch (e) {
            warn(`Exception with sendMail(): ${e.message}`);
            return false;
            // throw new Error('Something went wrong while verifying email');
        }

    } catch (e) {
        warn(`Exception with generateEmailVerification(): ${e.message}`);
        return false;
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
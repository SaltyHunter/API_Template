/* eslint-disable prettier/prettier */
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import confirmation from './templates/confirmation';
import suppression from './templates/suppression';


dotenv.config();
const API_KEY = process.env.SENDGRID_API_KEY;

export async function send(to: string, subject: string, body: string): Promise<boolean> {
    const msg = {
        to,
        from: 'kevin.moreau@efrei.net',
        subject,
        html: body,
    };

    if (!API_KEY) {
        console.log('API_KEY not found');
        return false;
    }
    sgMail.setApiKey(API_KEY);

    try {
        await sgMail.send(msg);
        return Promise.resolve(true);
    } catch (error) {
        if (error.response) {
            console.error(error.response.body);
        }
        return Promise.reject(error);
    }
}

export async function sendConfirmation(
    to: string,
    options: { username: string },
): Promise<boolean> {
    return send(to, 'AssurSafe, compte créé', confirmation(options));
}

export async function sendSuppression(
    to: string,
    options: { username: string },
): Promise<boolean> {
    return send(to, 'AssurSafe, compte supprimé', suppression(options));
}

export default {
    send,
    sendConfirmation,
    sendSuppression
};
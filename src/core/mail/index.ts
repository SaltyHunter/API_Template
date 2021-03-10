import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import confirmation from '@/core/mail/templates/confirmation';
import suppression from '@/core/mail/templates//suppression';
import { email } from '@/core/libs/utils'


dotenv.config();
const API_KEY = process.env.SENDGRID_API_KEY;
const MAIL = email(process.env.SENDGRIDE_MAIL);

export async function send(to: string, subject: string, body: string): Promise<boolean> {
    const msg = {
        to,
        from: MAIL,
        subject,
        html: body,
    };

    if (!API_KEY) {
        console.log("l'API_KEY n'existe pas");
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
    return send(to, 'Template, compte créé', confirmation(options));
}

export async function sendSuppression(
    to: string,
    options: { username: string },
): Promise<boolean> {
    return send(to, 'Template, compte supprimé', suppression(options));
}

export default {
    send,
    sendConfirmation,
    sendSuppression
};
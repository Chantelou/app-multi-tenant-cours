import nodemailer from "nodemailer"
export const SendMail = async (email: string, sujet: string, message: string) => {
    try {

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: `"App multiTant" <${process.env.SMTP_USER}>`, // sender address
            to: email, // list of recipients
            subject: sujet, // subject line
            html: message, // HTML body
        });

        return "envoyé";

    } catch (error) {
        console.log(error)
        return "Error"
    }
}
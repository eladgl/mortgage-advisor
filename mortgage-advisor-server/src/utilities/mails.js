import nodeMailer from 'nodemailer';

export async function sendMail(formData) {
    const transporter = nodeMailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'eladgiving1@gmail.com',
            pass: 'toon bnbs qwly okzb',
        },
    });

    const html = `<p>Name: ${formData.fname} ${formData.lname}</p>
                  <p>Email: ${formData.email}</p>
                  <p>Phone: ${formData.phone}</p>
                  <p>Reason: ${formData.reason}</p>
                  <p>Message: ${formData.contactMessage}</p>`; // Construct HTML content for the email body

    const info = await transporter.sendMail({
        from: 'NodeMailer eladgiving1@gmail.com',
        to: 'calc.task@gmail.com',
        subject: 'New Contact Form Submission',
        html: html // Pass the constructed HTML content as the email body
    });
    console.log(`Message sent: ${info?.messageId}`);
};

export async function recoverMail({ email, link }) {
    const transporter = nodeMailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'eladgiving1@gmail.com',
            pass: 'toon bnbs qwly okzb',
        },
    });

    const html = `
    <div style="font-family: Arial, sans-serif; color: #333; text-align: right; direction: rtl;">
        <h1>בקשה לאיפוס סיסמה</h1>
        <p>שלום,</p>
        <p>התקבלה בקשה לאיפוס הסיסמה שלך. לחץ על הקישור הבא כדי להמשיך:</p>
        <p><a href="${link}" style="color: #007bff; text-decoration: none;">אפס סיסמה</a></p>
        <p>אם לא ביקשת לאפס את הסיסמה, תוכל להתעלם מהמייל הזה.</p>
        <p>תודה,</p>
        <p>צוות האתר</p>
    </div>
`;

    const info = await transporter.sendMail({
        from: 'NodeMailer Recover password',
        to: email,
        subject: 'Recover Password',
        html: html // Pass the constructed HTML content as the email body
    });
    console.log(`Message sent: ${info?.messageId} to email: ${email}`);
};
// Install: npm i express twilio
const express = require("express");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(bodyParser.json());

const accountSid = "TWILIO_ACCOUNT_SID";
const authToken = "TWILIO_AUTH_TOKEN";
const client = twilio(accountSid, authToken);

const MY_WHATSAPP = "whatsapp:+917744869769"; // your WhatsApp
const FROM_WHATSAPP = "whatsapp:+14155238886"; // Twilio sandbox number

app.post("/api/send-request", async (req, res) => {
    let { phone } = req.body;
    phone = phone.replace(/\D/g, "");

    try {
        await client.messages.create({
            from: FROM_WHATSAPP,
            to: MY_WHATSAPP,
            body: `User wants your resume. Their WhatsApp: +${phone}`
        });
        res.json({ message: "Request sent! We'll share resume shortly." });
    } catch (err) {
        res.status(500).json({ message: "Error sending message" });
    }
});

app.listen(3000, () => console.log("Server running on 3000"));

const creds = require("./credential.json");
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const { validate } = require("email-validator");
const fs = require("fs");

const reportFilePath = __dirname + "/email_report.csv";
const reportFileStream = fs.createWriteStream(reportFilePath);

reportFileStream.write("Email,Status\n"); // Header for CSV

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: creds.auth.user,
    pass: creds.auth.pass,
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/mail", async (req, res, next) => {
  try {
    const emails = req.body.email.split(",").map((email) => email.trim());
    const cc = req.body.cc;
    const message = req.body.message;
    const subject = req.body.subject;
    const company = req.body.company;

    for (const email of emails) {
      if (!validate(email)) {
        console.error(`Invalid email: ${email}`);
        reportFileStream.write(`${email},false\n`);
        continue;
      }

      let mailOptions = {
        from: `"KHODAY INDIA LIMITED" <${creds.auth.user}>`, // Static "from" name
        to: email,
        cc: cc,
        subject: subject,
        html: `<div>
        <p style="font-size: 15px; color: #333; font-weight: bold; text-align: center;">
        <b>KHODAY INDIA LIMITED - IMPORTANT NOTIFICATION ON YOUR EQUITY SHARES</b>
      </p>
  ${message}
</div>`,

        attachments: [
          {
            filename: "certified copy of order 7-8-2014 Email.pdf",
            path:
              __dirname +
              "/attachment/certified copy of order 7-8-2014 Email.pdf",
          },

          {
            filename: "COURT ORDER 21-09-2015 Email.pdf",
            path: __dirname + "/attachment/COURT ORDER 21-09-2015 Email.pdf",
          },

          {
            filename: "ROC certificate Email.pdf",
            path: __dirname + "/attachment/ROC certificate Email.pdf",
          },
        ],
      };

      try {
        await sendMail(mailOptions);
        reportFileStream.write(`${email},success\n`);
      } catch (error) {
        console.error(`Failed to send email to ${email}:`, error);
        reportFileStream.write(`${email},false\n`);
      }
    }

    res.json({
      status: "success",
      reportFilePath: reportFilePath,
    });
  } catch (error) {
    res.json({
      status: "err",
      error: error.message,
    });
  }
});

async function sendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        console.error(`Failed to send email to ${mailOptions.to}:`, err);
        reject(err);
      } else {
        console.log(
          `Email Sent successfully to ${mailOptions.to}:`,
          data.response
        );
        resolve();
      }
    });
  });
}

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages!");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.info(`Server has started on ${PORT}`));

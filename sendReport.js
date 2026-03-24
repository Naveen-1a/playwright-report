const nodemailer = require("nodemailer");

async function sendEmail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "naveen.s@elblearning.com",
      pass: "vmuuqltbcvdwgbpf"
    }
  });

  const reportLink = "https://Naveen-1a.github.io/playwright-report/ortoni-report/";

  let mailOptions = {
    from: "naveen.s@elblearning.com",
    to: "naveen.s@elblearning.com",
    subject: "Playwright Ortoni Report",
    html: `
      <h3>Test Execution Completed</h3>
      <p>Please find the test report below:</p>
      <a href="${reportLink}" target="_blank">View Ortoni Report</a>
      <p>${reportLink}</p>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log("Email sent with GitHub report link!");
}

sendEmail();
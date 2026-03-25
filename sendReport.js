const nodemailer = require("nodemailer");
const fs = require("fs");

async function sendEmail() {

  // 🔹 Read Playwright JSON report
  const rawData = fs.readFileSync("test-results/results.json", "utf-8");
  const results = JSON.parse(rawData);

  let total = 0;
  let passed = 0;
  let failed = 0;
  let failedTests = [];

  // 🔹 Extract results
  results.suites.forEach(suite => {
    suite.specs.forEach(spec => {
      spec.tests.forEach(test => {
        total++;

        const status = test.results[0].status;

        if (status === "passed") {
          passed++;
        } else {
          failed++;
          failedTests.push(spec.title);
        }
      });
    });
  });

  // 🔹 Email setup
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "naveen.s@elblearning.com",
      pass: "vmuuqltbcvdwgbpf"
    }
  });

  const reportLink = "https://Naveen-1a.github.io/playwright-report/ortoni-report/";

  // 🔹 Failed tests HTML
  const failedSection = failed > 0
    ? `
      <h3 style="color:red;">❌ Failed Tests</h3>
      <ul>
        ${failedTests.map(test => `<li>${test}</li>`).join("")}
      </ul>
    `
    : `<p style="color:green;">✅ All tests passed successfully</p>`;

  // 🔹 Enhanced Email HTML
  let mailOptions = {
    from: "naveen.s@elblearning.com",
    to: "naveen.s@elblearning.com",
    subject: `Playwright Report | Passed: ${passed}, Failed: ${failed}`,
    html: `
      <div style="font-family: Arial; line-height:1.6;">

        <h2 style="color:#2E86C1;">🚀 Playwright Ortoni Report</h2>

        <p>Hello Team,</p>
        <p>Test execution has been completed. Please find the summary below:</p>

        <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
          <tr>
            <td><b>Execution Time</b></td>
            <td>${new Date().toLocaleString()}</td>
          </tr>
          <tr>
            <td><b>Total Tests</b></td>
            <td>${total}</td>
          </tr>
          <tr>
            <td><b style="color:green;">Passed</b></td>
            <td style="color:green;">${passed}</td>
          </tr>
          <tr>
            <td><b style="color:red;">Failed</b></td>
            <td style="color:red;">${failed}</td>
          </tr>
        </table>

        <br/>

        ${failedSection}

        <br/>

        <a href="${reportLink}" 
           style="background-color:#28a745;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
           🔍 View Full Ortoni Report
        </a>

        <br/><br/>

        <p>Report Link:<br/>
        <a href="${reportLink}">${reportLink}</a></p>

        <br/>

        <p>Thanks,<br/>Automation Team</p>

      </div>
    `
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ Enhanced email sent successfully!");
}

sendEmail();
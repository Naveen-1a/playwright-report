const nodemailer = require('nodemailer');

async function sendEmail() {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'naveen.s@elblearning.com',
        pass: 'vmuuqltbcvdwgbpf'
      }
    });

    let info = await transporter.sendMail({
      from: 'naveen.s@elblearning.com',
      to: 'naveen.s@elblearning.com',   // 👉 change this
      subject: 'Playwright Test Report',

      text: `
Test execution completed successfully.

📊 Ortoni Report:
Open from your system:
D:\\playwright-testing\\ortoni-report\\index.html

📁 Screenshots & Videos:
D:\\playwright-testing\\test-results

(Note: Attachments are not included due to email security restrictions)

Thanks,
Automation
`
    });

    console.log('✅ Email sent successfully:', info.response);

  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
}

sendEmail();
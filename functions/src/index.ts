/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
const Handlebars = require('handlebars')

exports.sendEmail = functions.https.onRequest(async (req: any, res: any) => {
  const body = req.body
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      port: 587,
      secure: false,
      auth: {
        user: 'book@meetstudioco.com',
        pass: 'GoMeet@1',
      },
      debug: true,
    })

    const clientContact = `<!doctype html>
    <html>
      <body>
        <div
          style="
            background-color: #f2f5f7;
            color: #242424;
            font-family: 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial,
              sans-serif;
            font-size: 16px;
            font-weight: 400;
            letter-spacing: 0.15008px;
            line-height: 1.5;
            margin: 0;
            padding: 32px 0;
            min-height: 100%;
            width: 100%;
          "
        >
          <table
            align="center"
            width="100%"
            style="margin: 0 auto; max-width: 600px; background-color: #ffffff"
            role="presentation"
            cellspacing="0"
            cellpadding="0"
            border="0"
          >
            <tbody>
              <tr style="width: 100%">
                <td>
                  <div style="padding: 24px 24px 24px 24px">
                    <a
                      href="https://www.meetstudioco.com/"
                      style="text-decoration: none"
                      target="_blank"
                      ><img
                        alt="Studio Co"
                        src="https://ik.imagekit.io/47zhisylvftkf/meet-o-studio/meet-co-logo_-ZohiIUc5.png?updatedAt=1716766987536"
                        height="50"
                        style="
                          height: 50px;
                          outline: none;
                          border: none;
                          text-decoration: none;
                          vertical-align: middle;
                          display: inline-block;
                          max-width: 100%;
                        "
                    /></a>
                  </div>
                  <div style="font-weight: normal; padding: 0px 24px 16px 24px">
                    Hi {{name}} 👋,
                  </div>
                  <div style="font-weight: normal; padding: 0px 24px 16px 24px">
                    Welcome to Meet Studio Co!
                  </div>
                  <div style="font-weight: normal; padding: 0px 24px 16px 24px">
                    Thank you for emailing us. book an appointment and meet with
                    your team/clients in a collaborative space with an on-demand
                    office and large screens for your idea board. You can enjoy your
                    time in a large cozy space and our private dressing room will be
                    ready for all your fabulous looks and glam team to set up and
                    make you look like a million bucks.
                  </div>
                  <div style="font-weight: normal; padding: 16px 24px 16px 24px">
                    All sessions include pre-session consultations, time and talent,
                    props and backgrounds, professional editing and retouching,
                    &amp; an online gallery. So whether it’s sharing your new idea,
                    an elaborate elopement, or growing your business, our goal is to
                    provide a space where you can be completely yourself.
                  </div>
                  <div style="padding: 16px 24px 24px 24px">
                    <a
                      href="https://app.acuityscheduling.com/schedule/e43c7e99"
                      style="
                        color: #ffffff;
                        font-size: 14px;
                        font-weight: bold;
                        background-color: #b05f1b;
                        display: inline-block;
                        padding: 12px 20px;
                        text-decoration: none;
                      "
                      target="_blank"
                      ><span
                        ><!--[if mso
                          ]><i
                            style="
                              letter-spacing: 20px;
                              mso-font-width: -100%;
                              mso-text-raise: 30;
                            "
                            hidden
                            >&nbsp;</i
                          ><!
                        [endif]--></span
                      ><span>Book Now</span
                      ><span
                        ><!--[if mso
                          ]><i
                            style="letter-spacing: 20px; mso-font-width: -100%"
                            hidden
                            >&nbsp;</i
                          ><!
                        [endif]--></span
                      ></a
                    >
                  </div>
                  <div style="padding: 16px 24px 40px 24px">
                    <img
                      alt="Illustration"
                      src="https://ik.imagekit.io/47zhisylvftkf/meet-o-studio/2751227_myktz0qDN.jpg?updatedAt=1718498795651"
                      style="
                        outline: none;
                        border: none;
                        text-decoration: none;
                        vertical-align: middle;
                        display: inline-block;
                        max-width: 100%;
                      "
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
    `
    const contactHandlebar = Handlebars.compile(clientContact)
    var contactResult = contactHandlebar(body)
    const options = {
      from: 'book@meetstudioco.com',
      to: body.email,
      subject: 'Meet Studio Co. Message',
      html: contactResult,
    }

    await transporter.sendMail(options)

    const studioContact = `<!doctype html>
<html>
  <body>
    <div
      style="
        background-color: #f2f5f7;
        color: #242424;
        font-family: 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial,
          sans-serif;
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 0.15008px;
        line-height: 1.5;
        margin: 0;
        padding: 32px 0;
        min-height: 100%;
        width: 100%;
      "
    >
      <table
        align="center"
        width="100%"
        style="margin: 0 auto; max-width: 600px; background-color: #ffffff"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
      >
        <tbody>
          <tr style="width: 100%">
            <td>
              <div style="padding: 24px 24px 24px 24px">
                <a
                  href="https://www.meetstudioco.com/"
                  style="text-decoration: none"
                  target="_blank"
                  ><img
                    alt="Studio Co"
                    src="https://ik.imagekit.io/47zhisylvftkf/meet-o-studio/meet-co-logo_-ZohiIUc5.png?updatedAt=1716766987536"
                    height="60"
                    style="
                      height: 60px;
                      outline: none;
                      border: none;
                      text-decoration: none;
                      vertical-align: middle;
                      display: inline-block;
                      max-width: 100%;
                    "
                /></a>
              </div>
              <div
                style="
                  font-weight: bold;
                  text-align: center;
                  padding: 0px 24px 16px 24px;
                "
              >
                Message From {{name}}
              </div>
              <div style="font-weight: normal; padding: 0px 24px 16px 24px">
                Name: {{name}}
              </div>
              <div style="font-weight: normal; padding: 0px 24px 16px 24px">
                Email: {{email}}
              </div>
              <div style="font-weight: normal; padding: 16px 24px 16px 24px">
                Company: {{company}}
              </div>
              <div style="font-weight: normal; padding: 16px 24px 16px 24px">
                Phone: {{company}}
              </div>
              <div style="font-weight: normal; padding: 16px 24px 16px 24px">
                Message: {{message}}
              </div>
              <div style="font-weight: normal; padding: 16px 24px 16px 24px">
                Budget: {{budget}}
              </div>
              <div style="padding: 16px 24px 40px 24px">
                <img
                  alt="Illustration"
                  src="https://ik.imagekit.io/47zhisylvftkf/meet-o-studio/2751227_myktz0qDN.jpg?updatedAt=1718498795651"
                  style="
                    outline: none;
                    border: none;
                    text-decoration: none;
                    vertical-align: middle;
                    display: inline-block;
                    max-width: 100%;
                  "
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </body>
</html>
`
    const studioContactHandlebar = Handlebars.compile(studioContact)
    var studioContactResult = studioContactHandlebar(body)
    const studioOptions = {
      from: 'book@meetstudioco.com',
      to: 'meetstudio.co@gmail.com',
      subject: 'Meet Studio Co. Message',
      html: studioContactResult,
    }
    await transporter.sendMail(studioOptions)

    res.status(200).send({
      message: 'Email Sent No issues',
      data: ':)',
    })
  } catch (error) {
    console.error(error)
    res.status(500).send({
      message: 'Failed to send email',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})

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

exports.sendEmail = functions.https.onRequest(async (req: any, res: any) => {
  const options = req.body
  console.log(options)

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

    await transporter.sendMail(options)

    // const studioData = await fs.readFile(studiofilePath, 'utf8');
    // const studioContactHandlebar = Handlebars.compile(studioData);
    // var studioContactResult = studioContactHandlebar(body);
    // const studioOptions = {
    //   from: 'book@meetstudioco.com',
    //   to: 'meetstudio.co@gmail.com',
    //   subject: 'Meet Studio Co. Message',
    //   html: studioContactResult,
    // }
    // await transporter.sendMail(studioOptions);

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

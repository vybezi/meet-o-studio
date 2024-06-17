import { NextResponse } from 'next/server'
// import nodemailer from 'nodemailer';
var nodemailer = require('nodemailer')
import Handlebars from 'handlebars'
import path, { parse } from 'path'
import fs from 'fs'

export async function POST(req: any, res: any) {
  const clientfilePath = path.join(
    process.cwd(),
    'src/templates',
    'client-contact.html',
  )
  const studiofilePath = path.join(
    process.cwd(),
    'src/templates',
    'studio-contact.html',
  )
  try {
    const body = await req.json()
    console.log(body)

    fs.readFile(clientfilePath, 'utf8', (err, data) => {
      if (err) {
        console.log('data not read')
        console.error(err)
      }
      console.log('data read')
      const contactHandlebar = Handlebars.compile(data)
      var contactResult = contactHandlebar(body)
      const options = {
        from: 'book@meetstudioco.com',
        to: body.email,
        subject: 'Meet Studio Co. Message',
        html: contactResult,
      }

      fetch('https://us-central1-meet-o-studio.cloudfunctions.net/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      })
    })
    fs.readFile(studiofilePath, 'utf8', (err, data) => {
      if (err) {
        console.log('data not read')
        console.error(err)
      }
      console.log('data read')
      const contactHandlebar = Handlebars.compile(data)
      var contactResult = contactHandlebar(body)
      const options = {
        from: 'book@meetstudioco.com',
        to: 'meetstudio.co@gmail.com',
        subject: 'Meet Studio Co. Message',
        html: contactResult,
      }
      fetch('https://us-central1-meet-o-studio.cloudfunctions.net/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      })
    })
    return NextResponse.json({
      message: 'Email Sent No issues',
      data: ':)',
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      {
        status: 500,
      },
    )
  }
}

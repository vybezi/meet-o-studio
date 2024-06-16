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
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    })

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
        from: process.env.MEET_EMAIL,
        to: body.email,
        subject: 'Contact Message',
        html: contactResult,
      }
      const response = transporter.sendMail(options)
      return NextResponse.json({
        message: 'Client email sent successfully',
        data: 'hi',
        response,
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
        from: process.env.MEET_EMAIL,
        to: process.env.MEET_EMAIL,
        subject: 'Contact Message',
        html: contactResult,
      }
      const response = transporter.sendMail(options)
      return NextResponse.json({
        message: 'Studio Email sent successfully',
        data: 'hi',
        response,
      })
    })
    return NextResponse.json({
      message: 'Data Failed to send',
      data: ':(',
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

import { NextResponse } from 'next/server'
var Acuity = require('acuityscheduling')

const acuity = Acuity.basic({
  userId: process.env.ACUITY_USER_ID,
  apiKey: process.env.ACUITY_API_KEY,
})

export async function POST(req: any, res: any) {
  const data = await req.json()
  console.log(data)
  return NextResponse.json({ message: 'Hello, world!', body: data })
}

export async function GET(req: any, res: any) {
  acuity.request(
    'appointments',
    function (err: any, res: any, appointments: any) {
      if (err) return console.error(err)
      console.log(appointments)
    },
  )
  return new Response(`Hello, ${req.url}!`)
}

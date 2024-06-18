import { FormEvent, useId } from 'react'
import { type Metadata } from 'next'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { ContactForm } from './Booking'

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-xl font-semibold text-meet-primary">
        Meet Studio.Co
      </h2>
      <p className="mt-6 text-base text-meet-secondary">
        Prefer doing things in person? We do too! Come see our studio, meet our team, and explore the possibilities for your next project. To arrange a tour, please send us an email. 
      </p>

      <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-meet-primary">
          Email us
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            ['Bookings', 'book@meetstudioco.com'],
            ['Press', 'meetstudioco@gmail.com'],
          ].map(([label, email]) => (
            <div key={email}>
              <dt className="font-semibold text-meet-secondary">{label}</dt>
              <dd>
                <Link
                  href={`mailto:${email}`}
                  className="text-meet-secondary hover:text-meet-primary"
                >
                  {email}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-meet-primary">
          Follow us
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}


export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Let’s work together. We can’t wait to meet you.',
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact us" title="Let’s work together">
        <p className='text-meet-secondary'>We can’t wait to meet you.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
        <div className='w-full flex items-center justify-center mt-20'>
        <Button href="https://app.acuityscheduling.com/schedule.php?owner=26926446" target="_blank" className='bg-meet-secondary'>
            <h1 className='text-2xl p-1'>BOOK NOW</h1>
          </Button>
        </div>
      </Container>
    </>
  )
}

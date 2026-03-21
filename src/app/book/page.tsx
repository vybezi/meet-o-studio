import { type Metadata } from 'next'

import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'
import { BookingForm } from '@/components/BookingForm'

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default function Book() {
  return (
    <>
      <PageIntro
        eyebrow="Photography Services"
        title="Ready to Start Planning Your Shoot?"
      >
        <p>
          Session fees cover any pre-session consultations, time and talent, use
          of props and backgrounds, professional editing and retouching, an
          online viewing gallery and a limited number of high-resolution jpeg
          digital files with printing rights.
        </p>
      </PageIntro>

      <Container>
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <BookingForm />
          <p className="mt-24 text-meet-secondary">
            <b>
              All sessions are by appointment only and require confirmation. A
              non-refundable 50% deposit and a signed agreement are due at the
              time of booking. The balance is due by the day of your session.
              Deposits are non-refundable but can be transferred to another
              reservation.
            </b>
          </p>
          <div className="mt-4 space-y-4 text-sm text-meet-secondary">
            <span>
              An MUA, a stylist, decorative services and photography printing
              are available on request.
            </span>
            <p>Turnaround time for edited images is 5-7 days</p>
            <p>
              Call or message us directly, and we'll be happy to answer your
              questions, provide more detail, and discuss pricing.
            </p>
            <p>
              To make this the best experience for you, we encourage you to be
              organized, prepared and on time for your session
            </p>
            <p>Custom requests are always welcome.</p>
            <p>Prices are shown in both JMD & USD</p>
            <p>Prices are subject to change without notice.</p>
          </div>
        </div>
      </Container>

      <ContactSection />
    </>
  )
}

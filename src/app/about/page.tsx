import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import imageLaptop from '@/images/laptop.jpg'
import landingSelfie from '@/images/landing-selfie.jpeg'
import mic from '@/images/audiomic.jpg'
import mic2 from '@/images/mic2.jpg'
import podcast from '@/images/podcast.jpg'
import musicStudio from '@/images/musicstudio.jpg'
import photography from '@/images/clients/photography/photography.svg'
import editing from '@/images/clients/photography/editing.svg'
import clientArea from '@/images/clients/photography/client-area.svg'
import gallery from '@/images/clients/photography/gallary.svg'
import videography from '@/images/clients/photography/videography.svg'
import presentations from '@/images/clients/photography/presentation.svg'
import production from '@/images/clients/photography/production.svg'
import podcasting from '@/images/clients/photography/podcasting.svg'
import { SelfieImage } from '@/components/SelfieImage'
import { url } from 'inspector'
import { PortraitImage } from '@/components/PortraitImage'
import { StylizedSection } from '@/components/StylizedSection'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/ContactSection'
import { Border } from '@/components/Border'
import { FAQs } from '@/components/Faqs'

const options = [
  ['Photography', photography],
  ['Editing', editing],
  ['Client Area', clientArea],
  ['Gallery', gallery],
  ['Videography', videography],
  ['Presentations', presentations],
  ['Production', production],
  ['Podcasting', podcasting],
]

function Options() {
  return (
    <StylizedSection left={true}> 
        <Container>
        <FadeIn className="flex items-center gap-x-8">
          <p className="mt-2 text-xl text-white">
            Our Studio is built to cover everything
          </p>
        </FadeIn>
          <FadeInStagger faster>
            <ul
              role="list"
              className="mt-6 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4 items-center"
            >
              {options.map(([option, logo]) => (
                <li key={option}>
                  <FadeIn>
                    <div className='flex gap-2 items-center'>
                      <Image className='sm:w-12 w-6' src={logo} alt={option} />
                      <h3 className="sm:text-2xl text-white" style={{"fontFamily":"'.New York'",}} >{option}</h3>
                    </div>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
    </StylizedSection>

  )
}

function PhotographyPortraits() {
  return (
    <>
      <SectionIntro
        title="PODCAST AND AUDIO RECORDING STUDIO"
        eyebrow="Audio Recording"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
        Whether you&apos;re podcasting, live streaming, or conducting 
corporate training,our state-of-the-art studio is equipped 
to handle all your media needs. Featuring modular setups, 
clear audio capture for up to 4 guests, multiple camera 
angles, teleprompter support, and seamless live streaming 
capabilities, Meet Studio.Co ensures a smooth and 
professional production process every time.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FadeIn>
            <PortraitImage shape={1} src={mic} alt="Photography portrait" />
          </FadeIn>
          <div className='sm:mt-32'>
            <FadeIn>
              <PortraitImage shape={1} src={mic2} alt="Photography portrait" />
            </FadeIn>
          </div>
          <FadeIn>
            <PortraitImage shape={1} src={podcast} alt="Photography portrait" />
          </FadeIn>
        </FadeInStagger>
        <div className='w-full flex justify-center mt-8'>
          <Button  href="/#gallery" invert={false}>
            SEE MORE
          </Button>
        </div>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Studio Rental"
        title="STUDIO RENTAL"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
        Perfect for small to medium-sized productions, 
individual \and group portrait shoots, fashion 
editorials, green screen work, music videos, 
and product launches. Our space is designed to 
inspire creativity and ensure your project&apos;s success.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={musicStudio}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Record">
            Your Next Audio Project with Us
            </ListItem>
            <ListItem title="Meet Studio.Co">
            is ready to host your next creative project. Reach out to us today to learn more or schedule a studio tour.
            </ListItem>
            <ListItem title="Travel Light?">
              we got you covered! Just walk 
              with your favourite camera!
            </ListItem>
            <ListItem title="Enhance">
              your studio session with our extensive 
              gear rental options. Whether you need cameras, 
              lighting, or audio equipment, we have everything 
              you need to tailor your experience and make your 
              project seamless and professional.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}



export const metadata: Metadata = {
  description:
    'Meet Studio.Co in Mandeville provides a versatile space for photo and video shoots, podcasts, and live streams, featuring a white Cyc wall, sound booth, and dressing room.',
}

export default async function WhatToExpext() {
  return (
    <>
      <Container className="mt-24 sm:mt-32">
        <FadeInStagger>
          <div className='flex justify-center items-center sm:flex-row gap-8 flex-col-reverse lg:justify-end lg:pr-12'>
            <div className='sm:w-1/2'>
              <FadeIn>
                  <h1 className="font-display text-5xl font-bold tracking-tight text-meet-primary lg:leading-[6rem] [text-wrap:balance] lg:text-[5.5rem]">
                      ALL-WHITE STUDIO WITH EVERYTHING YOU NEED IN ONE PLACE
                  </h1>
              </FadeIn>
            </div>
              <div className='sm:w-1/2'>
                <FadeIn>
                <SelfieImage 
                src={landingSelfie} 
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"/>
                </FadeIn>
              </div>
          </div>
          <FadeIn>
            <p className="mt-6 text-xl text-meet-secondary">
            <strong>Welcome to Meet Studio.Co</strong>, Located in the heart of Mandeville, Meet Studio.Co is the perfect 
            space for your next photo, video shoot podcast, or live stream. Studio.Co features a fully lit white 
            Cyc wall, sound booth, editing bay, board room, and dressing room. <br/> <br/>
            Meet with your team/clients in a collaborative space with an on-demand office and large screens 
            for your idea board. You can enjoy your time in a large cozy space and our private dressing room 
            will be ready for all your fabulous looks and glam team to set up and make you look like a million bucks
            </p>
          </FadeIn>
        </FadeInStagger>
      </Container>

      <Options />

      <PhotographyPortraits />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
      />

      <Services />

      <StylizedSection left={false}>
      <Container>
        <FadeInStagger faster>
          <div className='grid grid-cols-1 sm:gap-x-8 gap-y-8 sm:gap-y-2 lg:grid-cols-3 sm:mb-8'>
              <div className='sm:col-span-3'>
                <FadeIn>
                  <h1 className="sm:my-6 text-4xl sm:text-7xl text-white font-bold text-center sm:text-start">
                  Become A Member
                  </h1>
                </FadeIn>
              </div>
              <div className='sm:col-span-2'>
                <FadeIn>
                  <Button href="/contact" invert={true}>
                      Contact Us
                  </Button>
                </FadeIn>
              </div>
              <FadeIn>
                <p className='text-white text-xl sm:text-4xl'>
                <span className='font-bold'>12</span> hours / 8 episodes 
                per month (Studio 
                Create / Podcast Start)
                </p>
              </FadeIn>
              <p className='hidden sm:block'></p>
              <FadeIn>
                <p className='text-white text-xl sm:text-4xl sm:mb-16 sm:mt-8'>
                <span className='font-bold'>15% off </span> Podcast Studio Complete & Editing Bay
                </p>
              </FadeIn>
              <p className='hidden sm:block'></p>
              <FadeIn>
                <p className='text-white text-xl sm:text-4xl'>
                <span className='font-bold'>15% off </span> for additional hours booked
                </p>
              </FadeIn>
              <FadeIn>
                <p className='text-white text-xl sm:text-4xl'>
                <span className='font-bold'>10% off</span> gear rental
                </p>
              </FadeIn>
              <FadeIn>
                <p className='text-white text-xl sm:text-4xl'>
                <span className='font-bold'>No</span> minimum hourly 
                  booking requirement 
                  and  <span className='font-bold'>no deposit</span>required
                </p>
              </FadeIn>
          </div>
        </FadeInStagger>
      </Container>
      </StylizedSection>
      <FAQs />
      <ContactSection />
    </>
  )
  
}

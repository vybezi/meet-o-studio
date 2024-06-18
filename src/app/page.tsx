import { type Metadata } from 'next'
import Image, { ImageLoader } from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpg'
import imageBlakeReid from '@/images/team/blake-reid.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageMichaelFoster from '@/images/team/michael-foster.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpg'

import landingImage from '@/images/gallery/LSP08321 (2)-min.jpg'

import familyPhoto1 from '@/images/gallery/LSP04774-min.jpg'
import familyPhoto2 from '@/images/gallery/LSP07807 (2)-min.jpg'
import familyPhoto3 from '@/images/gallery/LSP05538-min.jpg'
import familyPhoto4 from '@/images/gallery/DSC03238 copy-min.jpg'
import familyPhoto5 from '@/images/gallery/DSC01969 (2)-min.jpg'

import portraitPhoto1 from '@/images/gallery/landing.jpg'
import portraitPhoto2 from '@/images/gallery/LSP08372 (1)-min.jpg'
import portraitPhoto3 from '@/images/gallery/LSP07571-min.jpg'
import portraitPhoto4 from '@/images/gallery/LSP00729-min.jpg'
import portraitPhoto5 from '@/images/gallery/LSP08235 (1)-min.jpg'

import miniPhoto1 from '@/images/gallery/LSP01211 (1)-min.jpg'
import miniPhoto2 from '@/images/gallery/LSP07342 (2)-min.jpg'
import miniPhoto3 from '@/images/gallery/LSP08186-min.jpg'
import miniPhoto4 from '@/images/gallery/LSP05449-min.jpg'
import miniPhoto5 from '@/images/gallery/LSP01212v3 (1)-min.jpg'
import miniPhoto6 from '@/images/gallery/LSP07357 (1)-min.jpg'

import { StylizedSection } from '@/components/StylizedSection'
import clsx from 'clsx'
import { PortraitImage } from '@/components/PortraitImage'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our culture"
        title="Balance your passion with your passion for life."
        invert
      >
        <p>
          We are a group of like-minded people who share the same core values.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Loyalty" invert>
            Our team has been with us since the beginning because none of them
            are allowed to have LinkedIn profiles.
          </GridListItem>
          <GridListItem title="Trust" invert>
            We don’t care when our team works just as long as they are working
            every waking second.
          </GridListItem>
          <GridListItem title="Compassion" invert>
            You never know what someone is going through at home and we make
            sure to never find out.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const images = [
  {
    title: 'Family',
    people: [
      {
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        image: { src: familyPhoto1 },
        landscape: false
      },
      {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        image: { src: familyPhoto2 },
        landscape: false
      },
      {
        name: 'Dries Vincent',
        role: 'Partner & Business Relations',
        image: { src: familyPhoto3 },
        landscape: false
      },
      {
        name: 'Dries Vincent',
        role: 'Partner & Business Relations',
        image: { src: familyPhoto4 },
        landscape: true
      },
      {
        name: 'Dries Vincent',
        role: 'Partner & Business Relations',
        image: { src: familyPhoto5 },
        landscape: false
      },
    ],
  },
  {
    title: 'Portraits',
    people: [
      {
        name: 'Chelsea Hagon',
        role: 'Senior Developer',
        image: { src: portraitPhoto1 },
        landscape: false
      },
      {
        name: 'Emma Dorsey',
        role: 'Senior Designer',
        image: { src: portraitPhoto2 },
        landscape: false
      },
      {
        name: 'Leonard Krasner',
        role: 'VP, User Experience',
        image: { src: portraitPhoto3 },
        landscape: false
      },
      {
        name: 'Blake Reid',
        role: 'Junior Copywriter',
        image: { src: portraitPhoto4 },
        landscape: true
      },
      {
        name: 'Kathryn Murphy',
        role: 'VP, Human Resources',
        image: { src: portraitPhoto5 },
        landscape: false
      },
    ],
  },
  {
    title: "Mini's",
    people: [
      {
        name: 'Chelsea Hagon',
        role: 'Senior Developer',
        image: { src: miniPhoto1 },
        landscape: true
      },
      {
        name: 'Emma Dorsey',
        role: 'Senior Designer',
        image: { src: miniPhoto2 },
        landscape: false
      },
      {
        name: 'Leonard Krasner',
        role: 'VP, User Experience',
        image: { src: miniPhoto3 },
        landscape: false
      },
      {
        name: 'Blake Reid',
        role: 'Junior Copywriter',
        image: { src: miniPhoto4 },
        landscape: true
      },
      {
        name: 'Kathryn Murphy',
        role: 'VP, Human Resources',
        image: { src: miniPhoto5 },
        landscape: true
      },
      {
        name: 'Kathryn Murphy',
        role: 'VP, Human Resources',
        image: { src: miniPhoto6 },
        landscape: false
      },
    ],
  }
]

function Gallery() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40" id='gallery'>
      <FadeIn>
      <div className='w-full flex justify-center mb-6 sm: mb-8'>
        <h1 style={{"fontFamily":"'.New York'",}} className=' block text-center max-w-5xl font-display text-5xl font-bold tracking-tight text-meet-secondary [text-wrap:balance] sm:text-7xl'>GALLERY</h1>
      </div>
      </FadeIn>
      <div className="space-y-24">
        {images.map((group) => ( 
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-meet-secondary" style={{"fontFamily":"'.New York'",}}>
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name} className={clsx(person.landscape && 'lg:col-span-2')}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          {/* <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div> */}
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  description:
    'Meet Studio.Co in Mandeville provides a versatile space for photo and video shoots, podcasts, and live streams, featuring a white Cyc wall, sound booth, and dressing room.',
}


export default async function Home() {
  return (
    <>
    <div className='relative'>
      <PageIntro eyebrow="Overview" title="Welcome to Meet Studio.Co">
        <div className='text-meet-secondary'>
        <p>
        Located in the heart of Mandeville, Meet Studio.Co is the perfect space for your next photo, video shoot podcast, or live stream. Studio.Co features a fully lit white Cyc wall, sound booth, editing bay, board room, and dressing room. 
        </p>
        <div className="mt-10 max-w-2xl space-y-6">
          <p>
          Meet with your team/clients in a collaborative space with an on-demand office and large screens for your idea board. You can enjoy your time in a large cozy space and our private dressing room will be ready for all your fabulous looks and glam team to set up and make you look like a million bucks. 
          </p>
          <p>
          All sessions include pre-session consultations, time and talent, props and backgrounds, professional editing and retouching, & an online gallery.  So whether it’s sharing your new idea, an elaborate elopement, or growing your business, our goal is to provide a space where you can be completely yourself.
          </p>
        </div>
        </div>
      </PageIntro>
      <div className='absolute right-[-18rem] top-[-10rem] lg:block hidden'>
      <FadeIn>
      <div className="group relative overflow-hidden rounded-3xl">
          <PortraitImage className="h-[45rem] w-full"  shape={0} src={landingImage} alt="Photography portrait"/>
        </div>
        </FadeIn>
      </div>
    </div>
      <StylizedSection left={true}>
          <Container>
            <FadeIn>
            <div className='flex flex-col items-center'>
              <h1 style={{"fontFamily":"'.New York'",}} className='mt-6 block text-center max-w-5xl font-display text-5xl font-bold tracking-tight text-white [text-wrap:balance] sm:text-7xl'>
                ONE STUDIO INFINITE IMAGES <br/>TO CREATE
              </h1>
              <div className='size-12 sm:size-20 rounded-full border-4 sm:border-8 border-white bg-meet-primary mt-2 sm:mt-5'></div>
            </div>
            </FadeIn>
          </Container>
      </StylizedSection>

      <Gallery />

      <ContactSection />
    </>
  )
}



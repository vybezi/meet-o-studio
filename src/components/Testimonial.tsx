import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridPattern } from '@/components/GridPattern'
import { Button } from './Button'

export function Testimonial({
  className,
}: {
  className?: string
}) {
  return (
    <div
      className={clsx(
        'relative isolate bg-neutral-50 py-8 sm:py-28 md:py-12',
        className,
      )}
    >
      <GridPattern
        className="absolute inset-0 -z-10 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_50%,transparent_60%)]"
        yOffset={-256}
      />
      <Container>
        <FadeInStagger>
          <div className='mt-6 grid grid-cols-1 sm:gap-x-8 gap-y-10 lg:grid-cols-4 items-center'>
            <div  className="text-5xl text-meet-secondary col-span-2 text-center sm:text-left" style={{"fontFamily":"'.New York'",}}>
            <FadeIn>
              <h3>
              100% Hand-off Experience
              </h3>
            </FadeIn>
            </div>
            <div className="text-6xl mb-12 text-meet-secondary text-center sm:text-left" style={{"fontFamily":"'.New York'",}}>
            <FadeIn>
              <h3>
                Telepromter
              </h3>
            </FadeIn>
            </div>
            <div className="text-4xl text-meet-secondary text-center hidden sm:block" style={{"fontFamily":"'.New York'",}}>
            <FadeIn><h3>
              Up to 4 Guests
              </h3>
            </FadeIn>
            </div>
            <div className="text-4xl text-meet-secondary  hidden sm:block" style={{"fontFamily":"'.New York'",}}>
            <FadeIn>
              <h3>
              Up to 4 Cameras
              </h3>
            </FadeIn>
            </div>
            <div className='flex flex-col col-span-2'>
              <FadeIn>
                <h3 className="text-6xl text-meet-primary text-center" style={{"fontFamily":"'.New York'",}}>
                  THE TRUE PODCASTING EXPERIENCE
                </h3>
              </FadeIn>
                <div className='mx-auto mt-12 md:mt-24'>
                <FadeIn>
                  <Button  href="/contact" invert={false}>
                    BOOK NOW
                  </Button>
                </FadeIn>
                </div>
            </div>
            <FadeIn><h3 className="text-2xl text-meet-secondary text-center" style={{"fontFamily":"'.New York'",}}>Live Streaming and Call In</h3></FadeIn>
          </div>
        </FadeInStagger>
      </Container>
    </div>
  )
}

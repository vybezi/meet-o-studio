import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { SocialMedia } from './SocialMedia'

export function ContactSection() {
  return (
    <FadeInStagger>
    <FadeIn>
    <div className='bg-meet-primary mt-24 sm:mt-32 lg:mt-400 rounded-lg'>
      <div className='flex justify-between pt-1 md:pt-2 lg:pt-4'>
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className='w-2 h-1 md:h-2 md:w-4 lg:h-4 lg:w-8 bg-white'></div>
        ))}
      </div>
      <Container>
        <FadeIn className="-mx-6 px-6 py-10 sm:mx-0 sm:py-16 md:px-12">
          <div>
            <div className='flex flex-col items-center'>
              <h2 className="font-display text-3xl font-bold text-white [text-wrap:balance] sm:text-4xl text-center">
                Follow Us
              </h2>
              <p className="text-white text-xl text-center my:2 sm:my-4">
                Stay updated with our latest offerings and promotions by following us on social media.
              </p>
              <SocialMedia invert={true}/>
            </div>
          </div>
        </FadeIn>
      </Container>
      <div className='flex justify-between pb-1 md:pb-2 lg:pb-4'>
        {Array.from({ length: 30 }).map((_, index) => (
          <div key={index} className='w-2 h-1 md:h-2 md:w-4 lg:h-4 lg:w-8 bg-white'></div>
        ))}
      </div>
    </div>
    </FadeIn>
    </FadeInStagger>
  )
}

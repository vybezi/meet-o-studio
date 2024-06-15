import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { StylizedSection } from './StylizedSection'

export function MemberSection() {
  return (
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
  )
}

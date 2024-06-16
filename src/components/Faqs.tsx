"use client";
import { useState } from "react";
import { Container } from "./Container";
import { Border } from "./Border";
import { FadeIn, FadeInStagger } from "./FadeIn";


export function FAQs(){
    return (
        <FadeInStagger>
            <Container className='mt-24 sm:mt-32 lg:mt-40'>
                <FadeIn>
                <h1 className='block font-display tracking-tight [text-wrap:balance] text-4xl font-bold sm:text-7xl text-meet-primary pb-5'>FAQs</h1>
                </FadeIn>
                <FAQListItem title="WHAT ARE YOUR HOURS?" description="Monday - Friday 8 am - 5 pm, Weekend bookings available."/>
                <FAQListItem title="WHAT ARE YOUR PHOTOGRAPHY PACKAGES?" description="We offer custom photography packages for Portraits, Professional headshots, New Born, and Family Portraits. Custom requests are always welcome."/>
                <FAQListItem title="WHAT IS INCLUDED IN PHOTOGRAPHY PACKAGES?" description="Session fees cover any pre-session consultations, time and talent, use of props and backgrounds, professional editing and retouching, an online viewing gallery and a limited number of high-resolution jpeg digital files with printing rights."/>
                <FAQListItem title="REFUND & SECURITY DEPOSIT POLICY?" description="A security deposit is required for all rentals and prepayment to confirm all bookings and rentals. The deposit is non-refundable but we can always reschedule."/>
                <FAQListItem title="DO YOU OFFER PHOTOGRAPHY PRINTING?" description="YES, we offer Easy Online Ordering. Just Upload. Choose Size & Options. Checkout. Enjoy Art!"/>
                <FAQListItem title="PRINT SIZES?" description="Print sizes 4x6 up to 17x22. Print releases over 22” are available upon request. All prints will be delivered within 7-10 business days. Delivery Fee not included"/>
                <FAQListItem title="HOW DO I CHECK AVAILABILITY?" description="Availability can be viewed on the ‘BOOK NOW’ page by selecting one of our packages."/>
                <FAQListItem title="HOW MUCH DOES IT COST TO BOOK THE STUDIO?" description="You can view rates on either the ‘BOOK STUDIO’ page or under each studio detail page." />
                <FAQListItem title="WHAT IF I NEED TO BOOK A RENTAL TIME THAT ISN’T ON THE SITE?" description="If your desired time package that isn’t listed, please contact us."/>
                <FAQListItem title="DO YOU PROVIDE THE PHOTOGRAPHER?" description="Yes, we provide a photographer or you can opt to use your own. However, you would have to book the studio for your shoot."/>
                <FAQListItem title="DO YOU OFFER CONTINUOUS LIGHTING FOR VIDEO?" description="We offer an Aputure lighting package included in some packages and can be offered as add-on. Check website for more details. "/>
                <FAQListItem title="CAN I WALK IN AND SEE THE STUDIO BEFORE BOOKING?" description="We do not allow walk-ins but you can request a tour by email request for a studio tour."/>
                <FAQListItem title="DO YOU OFFER GIFT CARDS?" description="Yes, you can purchase gift cards. Contact us to place your order"/>
                <FAQListItem title="PRODUCTION TIME" description="With each booked session comes a 15-minute transition period before and after the allotted time for set up and wrap-up."/>
            </Container> 
        </FadeInStagger>
    )
  }
  
  function FAQListItem({
    title,
    description
  }:{
    title: string,
    description: string
  }){
    const [isOpen, setIsOpen] = useState(false);
    return (
<>
<FadeIn>
  <Border />
    <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className='flex justify-between items-center'>
        <p className='text-xl font-bold text-meet-secondary my-5'>{title}</p>
        <svg className={`fill-meet-secondary size-6 transition ease-in-out delay-80 duration-500  ${isOpen ? 'transform rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg>
        </div>
        <p className={`text-meet-secondary text-xl transition-all ease-in-out delay-80 duration-500 overflow-hidden ${isOpen ? 'max-h-screen mb-5' : 'max-h-0'}`}>{description}</p>
    </div>
  <Border />
</FadeIn>
</>
    )
  }
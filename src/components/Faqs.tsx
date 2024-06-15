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
                <FAQListItem title="WHAT IF I NEED TO BOOK A RENTAL TIME THAT ISN'T ON THE SITE?"/>
                <FAQListItem title="DO YOU PROVIDE THE PHOTOGRAPHER?"/>
                <FAQListItem title="DO YOU OFFER CONTINUOUS LIGHTING FOR VIDEO?"/>
                <FAQListItem title="CAN I WALK IN AND SEE THE STUDIO BEFORE BOOKING?"/>
            </Container> 
        </FadeInStagger>
    )
  }
  
  function FAQListItem({
    title
  }:{
    title: string
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
        <p className={`text-meet-secondary text-xl transition-all ease-in-out delay-80 duration-500 overflow-hidden ${isOpen ? 'max-h-screen mb-5' : 'max-h-0'}`}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.</p>
    </div>
  <Border />
</FadeIn>
</>
    )
  }
'use client'
import { Border } from "@/components/Border";
import { Button } from "@/components/Button";
import { FadeIn } from "@/components/FadeIn";
import { Offices } from "@/components/Offices";
import { SocialMedia } from "@/components/SocialMedia";
import clsx from "clsx";
import Link from "next/link";
import { FormEvent, useId, useState } from "react";


function TextInput({
    label,
    ...props
  }: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
    let id = useId()
  
    return (
      <div className="group relative z-0 transition-all focus-within:z-10">
        <input
          type="text"
          id={id}
          {...props}
          placeholder=" "
          className="peer block w-full border border-meet-secondary/30 bg-transparent px-6 pb-4 pt-12 text-base/6 text-meet-secondary ring-4 ring-transparent transition focus:border-meet-secondary focus:outline-none focus:ring-meet-secondary/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-meet-secondary transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-meet-secondary peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-meet-secondary"
        >
          {label}
        </label>
      </div>
    )
  }
  
  function RadioInput({
    label,
    ...props
  }: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
    return (
      <label className="flex gap-x-3">
        <input
          type="radio"
          {...props}
          className="h-6 w-6 flex-none appearance-none rounded-full border border-meet-primary/20 outline-none checked:border-[0.5rem] checked:border-meet-primary focus-visible:ring-1 focus-visible:ring-meet-primary focus-visible:ring-offset-2"
        />
        <span className="text-base/6 text-meet-primary">{label}</span>
      </label>
    )
  }
  
export function ContactForm() {
  const [isSuccess, setSuccess] = useState(false);
    async function onSubmit(event: FormEvent<HTMLFormElement>){
      event.preventDefault();
    try {
        const formData = new FormData(event.currentTarget);
        const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
            'content-type': 'application/json'
            }
        })
        if (response.ok) {
          const data = await response.json();
          console.log(data.message);
          setSuccess(true);
        } else {
          setSuccess(false);
        }
    } catch (error) {
        console.error(error);
        setSuccess(false);
    } finally{
    }
    }

    // async function getAppointments(){
    //   try {
    //     const response = await fetch('/api/booking', {
    //       method: 'GET',
    //       headers: {
    //         'content-type': 'application/json'
    //       }
    //     })
    //     if (response.ok) {
    //       const data = await response.json();
    //       console.log(data);
    //     } else {
    //         console.error('Failed to fetch data.');
    //     }
    //   } catch (error) {
    //       console.error(error);
    //   } finally{
    //   }
    // }
    return (
      <FadeIn className="lg:order-last">
        <form onSubmit={onSubmit}>
          <h2 className="font-display text-base font-semibold text-meet-primary">
            Work inquiries
          </h2>
          <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
            <TextInput label="Name" name="name" autoComplete="name" />
            <TextInput
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
            />
            <TextInput
              label="Company"
              name="company"
              autoComplete="organization"
            />
            <TextInput label="Phone" type="tel" name="phone" autoComplete="tel" />
            <TextInput label="Message" name="message" />
            <div className="border border-meet-secondary/30 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
              <fieldset>
                <legend className="text-base/6 text-meet-secondary">Budget</legend>
                <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <RadioInput label="$25K – $50K" name="budget" value="25" />
                  <RadioInput label="$50K – $100K" name="budget" value="50" />
                  <RadioInput label="$100K – $150K" name="budget" value="100" />
                  <RadioInput label="More than $150K" name="budget" value="150" />
                </div>
              </fieldset>
            </div>
          </div>
          <Button type="submit" className={clsx('mt-10 px-6 transition ease-in-out delay-500 duration-500 bg-green-600', isSuccess ? 'bg-green-500' : '')}>
            {isSuccess ? <svg className={clsx('w-5 fill-white ')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg> : 'Email Us'}
          </Button>
        </form> 
      </FadeIn>
    )
  }
  

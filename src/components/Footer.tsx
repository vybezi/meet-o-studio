import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Logo } from '@/components/Logo'
import { SocialMedia, socialMediaProfiles } from '@/components/SocialMedia'

const navigation = [
  {
    title: 'Hours',
    links: [
      { title: 'Monday - Friday', href: '/' },
      { title: '8:30 am - 5 pm', href: '/' },
      { title: 'Weekend open by appointment only', href: '/' },
    ],
  },
  {
    title: 'Meet Studio.co',
    links: [
      { title: '61 Manchester Road, Mandeville. JA.', href: '/' },
      { title: 'book@meetstudioco.com', href: '/' },
      { title: '(876) 995-0735', href: '/' },
    ],
  },
]

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-8">
        {navigation.map((section, sectionIndex) => (
          <li key={sectionIndex}>
            <div className="font-display text-xl font-semibold tracking-wider text-meet-primary">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-meet-secondary">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex} className="mt-4">
                  <Link
                    href={link.href}
                    className="transition hover:text-meet-primary"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 6" aria-hidden="true" {...props}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 3 10 .5v2H0v1h10v2L16 3Z"
      />
    </svg>
  )
}

function NewsletterForm() {
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-xl font-semibold tracking-wider text-meet-primary">
        Sign up for our newsletter
      </h2>
      <p className="mt-4 text-meet-secondary">
        Subscribe to get the latest design news, articles, resources and
        inspiration.
      </p>
      <div className="relative mt-6">
        <input
          type="email"
          placeholder="Email address"
          autoComplete="email"
          aria-label="Email address"
          className="block w-full rounded-2xl border border-meet-primary/30 bg-transparent py-4 pl-6 pr-20 text-base/6 text-meet-primary ring-4 ring-transparent transition placeholder:text-meet-secondary focus:border-meet-primary focus:outline-none focus:ring-meet-primary/5"
        />
        <div className="absolute inset-y-1 right-1 flex justify-end">
          <button
            type="submit"
            aria-label="Submit"
            className="flex aspect-square h-full items-center justify-center rounded-xl bg-meet-primary text-white transition hover:bg-neutral-800"
          >
            <ArrowIcon className="w-4" />
          </button>
        </div>
      </div>
    </form>
  )
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />
          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>
        <div className="mb-20 mt-24 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-meet-primary/10 pt-12">
          <Link href="/" aria-label="Home">
            <Logo fillOnHover />
          </Link>
          <SocialMedia />
          <p className="text-sm text-meet-secondary">
            © Studio Agency Inc. {new Date().getFullYear()}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}

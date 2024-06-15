import clsx from 'clsx'

function Office({
  name,
  children,
  invert = false,
}: {
  name: string
  children: React.ReactNode
  invert?: boolean
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-meet-secondary',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-meet-secondary'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({
  invert = false,
  ...props
}: React.ComponentPropsWithoutRef<'ul'> & { invert?: boolean }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Location" invert={invert}>
          61 Manchester Road, 
          <br />
          Mandeville. JA.Mandeville. JA.
        </Office>
      </li>
      <li>
        <Office name="Hours" invert={invert}>
          Monday - Friday
          <br />
          8:30 am - 5 pm
          <br />
          Weekend open by appointment only
        </Office>
      </li>
    </ul>
  )
}

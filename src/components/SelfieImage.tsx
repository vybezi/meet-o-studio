import { useId } from 'react'
import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

const shape = 
  {
    width: 655,
    height: 680,
  }


type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string }

export function SelfieImage({
  className,
  ...props
}: ImagePropsWithOptionalAlt) {
  let id = useId()
  let { width} = shape

  return (
    <div
      className={clsx(
        className,
        'relative flex w-full block h-full',
      )}
    >
      <div className='border rounded-[6%] overflow-hidden mb-8 w-full'>
        <foreignObject width={width}>
                <Image
                  alt=""
                  className="w-full bg-neutral-100 object-cover"
                  {...props}
                />
        </foreignObject>
      </div>
      
      <div className='absolute top-[-5.8%] left-[-6.8%] w-[113.5%]'>
        <svg  id="svg1" version="1.1" viewBox="0 0 80.435097 90.347289" xmlns="http://www.w3.org/2000/svg">
          <defs id="defs1"/>
          <g id="layer1" transform="translate(-95.907278,-87.308575)">
            <g id="g36-2" style={{"display":"inline"}} clipPath="none" transform="matrix(0.85403611,0,0,0.85403611,186.09551,-141.59947)">
              <rect height="94.625793" id="rect34-0" style={{"display":"inline","fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} width="83.427475" ry="6.3834844" x="-100.22495" y="273.61227"/>
              <circle id="path40-5" style={{"display":"inline","fill":"#b05f1b","fillOpacity":"1","stroke":"#ffffff","strokeWidth":"1.3025","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} cx="-58.511215" cy="358.3244" r="5.6305723"/>
            </g>
            <g id="use36-3" style={{"display":"inline"}} transform="matrix(0.85403611,0,0,0.85403611,186.09551,-141.59947)">
              <rect height="94.625793" id="rect1" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} width="83.427475" ry="6.3834844" x="-100.22495" y="273.61227"/>
            </g>
            <path id="path34-8-7-1-8" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} d="m 4.525987,186.10387 v -0.40311 a 9.048325,9.048325 135 0 1 9.048325,-9.04833" transform="matrix(-0.86436223,0,0,-0.86436223,179.91142,330.00451)"/>
            <path id="path34-8-7-1-1-4" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} d="m 4.525987,186.10387 v -0.40311 a 9.048325,9.048325 135 0 1 9.048325,-9.04833" transform="matrix(0.86436223,0,0,0.86436223,92.33823,-65.04007)"/>
          </g>
        </svg>
      </div>
    </div>
  )
}

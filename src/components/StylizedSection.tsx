import { FadeIn, FadeInStagger } from "./FadeIn"


export function StylizedSection({
        children, 
        left
    }:{
        children: React.ReactNode, 
        left: boolean
    }) {
        if(left){
            return (
                <FadeInStagger>
                <FadeIn>
                <div className='mt-14 py-10 px-2 sm:px-4 sm:mt-12 sm:py-4 lg:mt-16 mx-2 sm:mx-4 relative'>
                <div className='rounded-3xl bg-meet-primary py-8 sm:py-12'>
                    {children}
                </div>
                <div className='absolute w-7 sm:w-10 top-8 sm:top-0 left-0'>
                <svg  id="svg1" version="1.1" viewBox="0 0 9.8420754 10.24519" xmlns="http://www.w3.org/2000/svg">
                    <defs id="defs1"/>
                    <g id="layer1" transform="translate(-6.486444,-100.59057)">
                    <path id="path34-8" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} d="m 4.525987,186.10387 v -0.40311 a 9.048325,9.048325 135 0 1 9.048325,-9.04833" transform="translate(2.357332,-75.66499)"/>
                    </g>
                </svg>
                </div>
                <div className='absolute w-7 sm:w-10 bottom-8 sm:bottom-0 right-0'>
                <svg  id="svg1" version="1.1" viewBox="0 0 9.8420754 10.24519" xmlns="http://www.w3.org/2000/svg">
                    <defs id="defs1"/>
                    <g id="layer1" transform="translate(-211.91697,-200.08572)">
                    <path id="path34-8-9-3" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} d="m 4.525987,186.10387 v -0.40311 a 9.048325,9.048325 135 0 1 9.048325,-9.04833" transform="rotate(180,112.94408,193.29323)"/>
                    </g>
                </svg>
                </div>
            </div>
            </FadeIn>
            </FadeInStagger>
            )
        }else{
            return(
                <FadeInStagger>
                    <FadeIn>
                    
                <div className='mt-14 py-10 px-2 sm:px-4 sm:mt-12 sm:py-4 lg:mt-32 mx-2 sm:mx-4 relative'>
                <div className='rounded-3xl bg-meet-primary py-8 sm:py-12'>
                {children}
                </div>
                <div className='absolute w-7 sm:w-10 bottom-8 sm:bottom-0 left-0'>
                <svg version="1.1" viewBox="0 0 10.24519 9.8420992" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                  <defs id="defs1"/>
                  <g id="layer1" transform="translate(-6.32139,-748.29052)">
                    <path id="path34-8-9-4-1" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} d="m 4.525987,186.10387 v -0.40311 a 9.048325,9.048325 135 0 1 9.048325,-9.04833" transform="rotate(-90,296.16381,466.09797)"/>
                  </g>
                  <title id="title1">Twitter-color</title>
                  <title id="title1-6">instagram [#167]</title>
                </svg>
                </div>
                <div className='absolute w-7 sm:w-10 top-8 sm:top-0 right-0'>
                <svg version="1.1" viewBox="0 0 10.245192 9.8420344" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve">
                  <defs id="defs1"/>
                  <g id="layer1" transform="translate(-193.43343,-656.22131)">
                    <path id="path34-8-9-4" style={{"fill":"none","fillOpacity":"1","stroke":"#b05f1c","strokeWidth":"0.79375","strokeLinecap":"round","strokeDasharray":"none","strokeOpacity":"1"}} d="m 4.525987,186.10387 v -0.40311 a 9.048325,9.048325 135 0 1 9.048325,-9.04833" transform="rotate(90,-136.07901,516.01318)"/>
                  </g>
                  <title id="title1">Twitter-color</title>
                  <title id="title1-6">instagram [#167]</title>
                </svg>
                </div>
            </div>
            </FadeIn>
            </FadeInStagger>
            )
        }
  }

  
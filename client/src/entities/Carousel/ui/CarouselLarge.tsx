'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

function CarouselLarge() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  useEffect(() => {
    if (emblaApi) {
    //   console.log(emblaApi.slideNodes())
    }
  }, [emblaApi])

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">Slide 1</div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div>
      </div>
    </div>
  )
}

export default CarouselLarge
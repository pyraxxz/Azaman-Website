import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionWrapperProps {
  id: string
  children: React.ReactNode
  className?: string
}

export default function SectionWrapper({ id, children, className = '' }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!sectionRef.current) return
    const animElements = sectionRef.current.querySelectorAll('.animate-in')
    if (animElements.length === 0) return

    gsap.from(animElements, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`py-16 lg:py-24 border-b border-[#1a1a2e] scroll-mt-16 ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
        {children}
      </div>
    </section>
  )
}

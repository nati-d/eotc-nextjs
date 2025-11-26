"use client"

import { Container } from "@/components/ui/container"

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-[600px] overflow-hidden rounded-t-3xl">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-t-3xl"
        style={{
          backgroundImage: 'url(/hero-bg.jpg)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background rounded-t-3xl" />
      <Container className="relative py-20 lg:py-32">
        <div className="relative z-10 mx-auto max-w-2xl lg:max-w-5xl  p-8 sm:p-10 lg:p-12">
          <h1 className="font-geist text-5xl font-normal tracking-tighter bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent sm:text-7xl">
            <span className="sr-only">EOTC Resource Hub - </span>
            Your Gateway to Ethiopian Orthodox Faith
          </h1>
          <div className="mt-6 space-y-6 font-geist text-md sm:text-xl tracking-tight text-muted-foreground">
            <p>
              Everything you need for your spiritual journey in one place. Find resources, share knowledge, and grow in faith with our community.
            </p>
          </div>
          <button className="mt-4 w-full md:w-52 font-geist tracking-tighter text-center rounded-md text-md bg-primary text-primary-foreground px-4 py-2 text-lg ring-2 ring-primary/50 ring-offset-2 ring-offset-background transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-primary/70 flex items-center justify-center gap-2">
            Get Started
          </button>

          <dl className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6 sm:mt-16 sm:gap-x-16 sm:gap-y-10 sm:text-center lg:auto-cols-auto lg:grid-flow-col lg:grid-cols-none lg:justify-start lg:text-left">
            {[
              ["Resources", "100+"],
              ["Active Users", "2,091"],
              ["Categories", "15+"],
              ["Uploads", "500+"],
            ].map(([name, value]) => (
              <div key={name}>
                <dt className="font-mono text-sm text-muted-foreground">{name}</dt>
                <dd className="mt-0.5 text-2xl font-normal font-geist tracking-tight text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  )
}

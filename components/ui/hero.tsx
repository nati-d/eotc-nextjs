"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Container({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />
}

export default function HeroSection() {
  return (
    <div className="relative min-h-screen">
      <Container className="relative py-20 sm:pb-24 sm:pt-36">
        {/* <Image
          src="https://tailwindcss.com/_next/static/media/docs@30.8b9a76a2.avif"
          alt="Hero decoration"
          width={400}
          height={400}
          className="absolute z-2 -top-0 left-10"
          unoptimized
        /> */}

        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:px-12">
          <h1 className="font-geist text-5xl font-normal tracking-tighter bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60 bg-clip-text text-transparent sm:text-7xl">
            <span className="sr-only">EOTC Resource Hub - </span>
            Welcome to EOTC Resource Hub
          </h1>
          <div className="mt-6 space-y-6 font-geist text-md sm:text-xl tracking-tight text-muted-foreground">
            <p>
              Your central hub for accessing and managing resources. Connect with your community, share knowledge, and
              discover valuable content tailored for you.
            </p>
            <p>
              Explore our comprehensive library of resources, upload your own content, and collaborate with others in
              the EOTC community.
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

import { SiteHeader } from "@/components/landing/site-header"
import { Hero } from "@/components/landing/hero"
import { Situations } from "@/components/landing/situations"
import { Problem } from "@/components/landing/problem"
import { Instructor } from "@/components/landing/instructor"
import { Curriculum } from "@/components/landing/curriculum"
import { Bonus } from "@/components/landing/bonus"
import { Outcomes } from "@/components/landing/outcomes"
import { Audience } from "@/components/landing/audience"
import { Pricing } from "@/components/landing/pricing"
import { Faq } from "@/components/landing/faq"
import { FinalCta } from "@/components/landing/final-cta"
import { SiteFooter } from "@/components/landing/site-footer"
import { Inscricao } from "@/components/landing/inscricao"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main>
        <Hero />
        <Situations />
        <Problem />
        <Instructor />
        <Curriculum />
        <Bonus />
        <Outcomes />
        <Audience />
        <Pricing />
        <Faq />
        <FinalCta />
        <Inscricao />
      </main>
      <SiteFooter />
    </div>
  )
}

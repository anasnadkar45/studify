import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Navbar } from "./components/landing page/Navbar";
import { Hero } from "./components/landing page/Hero";
import { PlatformShowcase } from "./components/landing page/PlatformShowcase";
import { ContainerScroll } from "./components/landing page/container-scroll-animation";
import Image from "next/image";
import PlatformImage from '../../public/Hero.png'
import { Features } from "./components/landing page/Features";
import { Testimonials } from "./components/landing page/Testimonials";
import { CallToAction } from "./components/landing page/CallToAction";
import { FAQ } from "./components/landing page/FAQ";
import { Footer } from "./components/landing page/Footer";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = await getKindeServerSession()
  const user = await getUser();
  if (user) {
    redirect('/dashboard')
  }
  return (
    <div className="container mx-auto px-3">
      <Navbar />
      <Hero />
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Your AI-Powered <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                Study Companion.
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={PlatformImage}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
      </ContainerScroll>
      <Features />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <Footer />
    </div>
  );
}

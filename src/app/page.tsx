export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";


import Footer from "@/components/ui/Footer";
import AboutPage from "@/components/modules/homepage/About";
import { Animated } from "@/components/modules/homepage/Animated";

import { GrowSkillsSection } from "@/components/modules/homepage/GrowSkills";
import { BannerCarousel } from "@/components/modules/homepage/CBanner";
import { Navbar } from "@/components/Navbar1";

export default async function HomePage() {
  return (
    <div>
      <Animated><Navbar/></Animated>
      <BannerCarousel/>
     
      <Animated><AboutPage/></Animated>
      <Animated><GrowSkillsSection/></Animated>
      <Animated><Footer /></Animated>
    </div>
  );
}
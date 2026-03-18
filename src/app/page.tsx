export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import { Navbar } from "@/components/Navbar1";
import Footer from "@/components/ui/Footer";
import AboutPage from "@/components/modules/homepage/About";
import { Animated } from "@/components/modules/homepage/Animated";
import Categories from "@/components/modules/homepage/Categories";
import FeaturedTutors from "@/components/modules/homepage/FeaturedTutors";
import { GrowSkillsSection } from "@/components/modules/homepage/GrowSkills";
import { BannerCarousel } from "@/components/modules/homepage/CBanner";

export default async function HomePage() {
  return (
    <div>
      <Animated><Navbar /></Animated>
      <BannerCarousel/>
      <Animated><Categories/></Animated>
      <Animated><FeaturedTutors/></Animated>
      <Animated><AboutPage/></Animated>
      <Animated><GrowSkillsSection/></Animated>
      <Animated><Footer /></Animated>
    </div>
  );
}
import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { SectionImagePreloader } from '@/components/home/shared/SectionImagePreloader';
import { SixMoodsSection } from '@/components/home/SixMoodsSection';
import { WovenToBeRemembered } from '@/components/home/WovenToBeRemembered';
import { NewArrivals } from '@/components/home/NewArrivals';
import { BestSellers } from '@/components/home/BestSellers';
import { BridalCollection } from '@/components/home/BridalCollection';
import { TrendOfTheDay } from '@/components/home/TrendOfTheDay';
import { SeasonalSpecial } from '@/components/home/SeasonalSpecial';
import { AutumnWinter2026 } from '@/components/home/AutumnWinter2026';
import { ChangeYourLook } from '@/components/home/ChangeYourLook';
import { EditsForEveryOccasion } from '@/components/home/EditsForEveryOccasion';
import { WorthYourAttention } from '@/components/home/WorthYourAttention';
import { CinematicStories } from '@/components/home/CinematicStories';
import { LatestTrends } from '@/components/home/LatestTrends';
import { CraftsmanshipSection } from '@/components/home/CraftsmanshipSection';
import { TestimonialCarousel } from '@/components/home/TestimonialCarousel';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F7F0E5]">
      {/* Background section image preloader for instant load on scroll */}
      <SectionImagePreloader />

      {/* 0. Flagship Hero Canvas Image Sequence Walkthrough (Preserved 400vh) */}
      <HeroSection />

      {/* SECTION 1: Six Moods of Silk (Matching Screenshot 1) */}
      <SixMoodsSection />

      {/* SECTION 2: Woven to Be Remembered (Matching Screenshot 2) */}
      <WovenToBeRemembered />

      {/* SECTION 2: New Arrivals */}
      <NewArrivals />

      {/* SECTION 3: Best Sellers */}
      <BestSellers />

      {/* SECTION 4: The Bridal Collection */}
      <BridalCollection />

      {/* SECTION 5: Trend of the Day */}
      <TrendOfTheDay />

      {/* SECTION 6: Seasonal Special */}
      <SeasonalSpecial />

      {/* SECTION 7: Autumn–Winter 2026 Season Forecast (Matching Screenshot 1) */}
      <AutumnWinter2026 />

      {/* SECTION 8: Interactive Studio: Change Your Look (Matching Screenshot 2) */}
      <ChangeYourLook />

      {/* SECTION 9: Edits for Every Occasion (Matching Screenshot 3) */}
      <EditsForEveryOccasion />

      {/* SECTION 10: Worth Your Attention */}
      <WorthYourAttention />

      {/* SECTION 11: Cinematic Stories (Moments in Silk & Two-Phase Storyboard) */}
      <CinematicStories />

      {/* SECTION 12: Latest Trends */}
      <LatestTrends />

      {/* Interactive 3D Fabric & Brocade Craftsmanship Sanctum */}
      <CraftsmanshipSection />

      {/* Royal Client Diary Testimonials */}
      <TestimonialCarousel />
    </div>
  );
}

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
import { ChangeYourLook } from '@/components/home/ChangeYourLook';
import { WorthYourAttention } from '@/components/home/WorthYourAttention';
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

      {/* SECTION 7: Change Your Look */}
      <ChangeYourLook />

      {/* SECTION 8: Worth Your Attention */}
      <WorthYourAttention />

      {/* SECTION 9: Latest Trends */}
      <LatestTrends />

      {/* Interactive 3D Fabric & Brocade Craftsmanship Sanctum */}
      <CraftsmanshipSection />

      {/* Royal Client Diary Testimonials */}
      <TestimonialCarousel />
    </div>
  );
}

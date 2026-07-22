'use client';

import { AppViewModelProvider } from '@/presentation/viewmodels/AppViewModelContext';
import { Navbar } from '@/presentation/features/nav/Navbar';
import { Hero } from '@/presentation/features/hero/Hero';
import { MarqueeBar } from '@/presentation/features/marquee/MarqueeBar';
import { FeaturesCarousel } from '@/presentation/features/features/FeaturesCarousel';
import { DailyPlanSection } from '@/presentation/features/dailyPlan/DailyPlanSection';
import { TrainersSection } from '@/presentation/features/trainers/TrainersSection';
import { TrainerProfileModal } from '@/presentation/features/trainers/TrainerProfileModal';
import { ChatModal } from '@/presentation/features/chat/ChatModal';
import { TransformSection } from '@/presentation/features/transform/TransformSection';
import { CommunitySection } from '@/presentation/features/community/CommunitySection';
import { OffersSection } from '@/presentation/features/offers/OffersSection';
import { PricingSection } from '@/presentation/features/pricing/PricingSection';
import { LoginModal } from '@/presentation/features/auth/LoginModal';
import { AdminDashboard } from '@/presentation/features/dashboard/AdminDashboard';
import { CoachDashboard } from '@/presentation/features/dashboard/CoachDashboard';
import { FinalCta } from '@/presentation/features/finalCta/FinalCta';
import { Footer } from '@/presentation/features/footer/Footer';

export default function HomePage() {
  return (
    <AppViewModelProvider>
      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <MarqueeBar />
        <FeaturesCarousel />
        <DailyPlanSection />
        <TrainersSection />
        <TransformSection />
        <CommunitySection />
        <OffersSection />
        <PricingSection />
        <FinalCta />
        <Footer />
        <TrainerProfileModal />
        <LoginModal />
        <AdminDashboard />
        <CoachDashboard />
        <ChatModal />
        
      </div>
    </AppViewModelProvider>
  );
}

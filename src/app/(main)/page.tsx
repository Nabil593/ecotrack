import AiAgentHighlight from '@/components/shared/AiAgentHighlight';
import EmissionCategoriesGrid from '@/components/shared/Emission';
import FaqAndCta from '@/components/shared/FaqAndCta';
import FeatureOverview from '@/components/shared/Feature';
import HeroPage from '@/components/shared/HeroPage';
import LivePlatformStats from '@/components/shared/LivePlatformStats';
import PricingTiers from '@/components/shared/PricingTiers';
import ReductionPreview from '@/components/shared/ReductionPreview';

const HomePage = () => {
  return (
    <div>
      <HeroPage />
      <FeatureOverview />
      <AiAgentHighlight />
      <LivePlatformStats />
      <EmissionCategoriesGrid />
      <ReductionPreview />
      <PricingTiers />
      <FaqAndCta />
    </div>
  );
};

export default HomePage;
import { mockAnak } from "@/data/mockData";
import { MatchingWizard } from "@/components/matching/MatchingWizard";

export default function MatchingPage() {
  return (
    <div className="pb-8">
      <MatchingWizard childrenList={mockAnak} />
    </div>
  );
}

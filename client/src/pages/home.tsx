
import { useState } from "react";
import { 
  Card, 
  Elevation, 
  Button, 
  Intent,
  H2,
  H4,
  Text,
  Icon,
  Classes
} from "@blueprintjs/core";
import TenantDashboard from "@/components/tenant-dashboard";
import RepairReports from "@/components/repair-reports";
import UserRegistration from "@/components/user-registration";
import VoiceRecorder from "@/components/voice-recorder";
import LegalDashboard from "@/components/legal-dashboard";
import AlmaAnalysis from "@/components/alma-analysis";
import HarassmentReporting from "@/components/harassment-reporting";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "reports":
        return <RepairReports />;
      case "registration":
        return <UserRegistration />;
      case "voice":
        return <VoiceRecorder />;
      case "legal":
        return <LegalDashboard />;
      case "analysis":
        return <AlmaAnalysis />;
      case "harassment":
        return <HarassmentReporting />;
      default:
        return <TenantDashboard />;
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {renderContent()}
    </div>
  );
}

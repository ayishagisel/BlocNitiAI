
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
        return (
          <div className="blocniti-content">
            <H2>BlocNiti Dashboard</H2>
            <Text className={Classes.TEXT_LARGE}>
              Welcome to BlocNiti - Building ethical housing communities through transparency and accountability.
            </Text>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '20px', 
              marginTop: '30px' 
            }}>
              <Card elevation={Elevation.TWO} className="blocniti-card">
                <Icon icon="document" size={24} style={{ marginBottom: '10px' }} />
                <H4>Repair Documentation</H4>
                <Text>
                  Document and track housing repair issues with detailed reporting and photo evidence.
                </Text>
                <Button 
                  intent={Intent.PRIMARY} 
                  text="Start Reporting" 
                  style={{ marginTop: '15px' }}
                  onClick={() => setActiveTab("reports")}
                />
              </Card>

              <Card elevation={Elevation.TWO} className="blocniti-card">
                <Icon icon="people" size={24} style={{ marginBottom: '10px' }} />
                <H4>Community Registration</H4>
                <Text>
                  Register community members and maintain organized records for better accountability.
                </Text>
                <Button 
                  intent={Intent.PRIMARY} 
                  text="Manage Users" 
                  style={{ marginTop: '15px' }}
                  onClick={() => setActiveTab("registration")}
                />
              </Card>

              <Card elevation={Elevation.TWO} className="blocniti-card">
                <Icon icon="microphone" size={24} style={{ marginBottom: '10px' }} />
                <H4>Voice Recording</H4>
                <Text>
                  Capture voice testimonies and convert them to documentation for official records.
                </Text>
                <Button 
                  intent={Intent.PRIMARY} 
                  text="Record Voice" 
                  style={{ marginTop: '15px' }}
                  onClick={() => setActiveTab("voice")}
                />
              </Card>

              <Card elevation={Elevation.TWO} className="blocniti-card">
                <Icon icon="shield" size={24} style={{ marginBottom: '10px' }} />
                <H4>Legal Dashboard</H4>
                <Text>
                  Access legal resources and track compliance with housing regulations and ethics.
                </Text>
                <Button 
                  intent={Intent.PRIMARY} 
                  text="Legal Tools" 
                  style={{ marginTop: '15px' }}
                  onClick={() => setActiveTab("legal")}
                />
              </Card>

              <Card elevation={Elevation.TWO} className="blocniti-card">
                <Icon icon="chart" size={24} style={{ marginBottom: '10px' }} />
                <H4>ALMA Analysis</H4>
                <Text>
                  Advanced analytics for housing data and community impact assessment.
                </Text>
                <Button 
                  intent={Intent.PRIMARY} 
                  text="View Analytics" 
                  style={{ marginTop: '15px' }}
                  onClick={() => setActiveTab("analysis")}
                />
              </Card>

              <Card elevation={Elevation.TWO} className="blocniti-card">
                <Icon icon="warning-sign" size={24} style={{ marginBottom: '10px' }} />
                <H4>Harassment Reporting</H4>
                <Text>
                  Safe and confidential reporting system for harassment and ethical violations.
                </Text>
                <Button 
                  intent={Intent.PRIMARY} 
                  text="Report Issues" 
                  style={{ marginTop: '15px' }}
                  onClick={() => setActiveTab("harassment")}
                />
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {renderContent()}
    </div>
  );
}

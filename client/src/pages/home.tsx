import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import UserRegistration from "@/components/user-registration";
import RepairReports from "@/components/repair-reports";
import LegalDashboard from "@/components/legal-dashboard";
import HarassmentReporting from "@/components/harassment-reporting";

type TabType = "registration" | "repairs" | "legal" | "harassment";

export default function Home() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("registration");

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const tabs = [
    { id: "registration" as const, label: "Registration", icon: "fas fa-user-plus" },
    { id: "repairs" as const, label: "Repair Reports", icon: "fas fa-tools" },
    { id: "legal" as const, label: "Legal Info", icon: "fas fa-balance-scale" },
    { id: "harassment" as const, label: "Harassment", icon: "fas fa-exclamation-triangle" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-white p-2 rounded-lg">
                <i className="fas fa-home text-lg"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BlocNiti AI</h1>
                <p className="text-xs text-gray-600">Tenant Rights Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="text-gray-600 hover:text-primary"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Sign Out
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">
                  {user?.firstName?.[0] || 'U'}
                  {user?.lastName?.[0] || ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="alma-bg p-3 rounded-full">
                <i className="fas fa-robot text-primary text-xl"></i>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Hi {user?.firstName || 'there'}! I'm Alma, your AI assistant.
                </h2>
                <p className="text-gray-600 mb-4">
                  I'm here to help you document repair issues, understand your legal rights, 
                  and generate formal documentation for your landlord. Let's start by making 
                  sure I have your current information.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <i className="fas fa-shield-alt mr-1"></i>
                    Secure & Private
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <i className="fas fa-gavel mr-1"></i>
                    Legal Compliance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                className={`${
                  activeTab === tab.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:text-primary hover:bg-primary/10"
                } transition-all duration-200`}
                onClick={() => setActiveTab(tab.id)}
              >
                <i className={`${tab.icon} mr-2`}></i>
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === "registration" && <UserRegistration />}
          {activeTab === "repairs" && <RepairReports />}
          {activeTab === "legal" && <LegalDashboard />}
          {activeTab === "harassment" && <HarassmentReporting />}
        </div>
      </div>
    </div>
  );
}

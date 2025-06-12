
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Classes, Drawer, Menu, MenuItem } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import './index.css';

import { useAuth } from './hooks/useAuth';
import UserRegistration from './components/user-registration';
import TenantDashboard from './components/tenant-dashboard';
import RepairReports from './components/repair-reports';
import LegalDashboard from './components/legal-dashboard';
import HarassmentReporting from './components/harassment-reporting';
import StakeholderDashboard from './components/stakeholder-dashboard';
import LandingPage from './pages/landing';
import Home from './pages/home';
import NotFound from './pages/not-found';

import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarTrigger,
  SidebarInset 
} from './components/ui/sidebar';

const queryClient = new QueryClient();

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-2">
          <img 
            src="./BlocNiti-LogoNB_1749709973044.png" 
            alt="BlocNiti AI" 
            style={{ 
              maxWidth: '120px', 
              height: 'auto'
            }} 
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/">
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/repair-reports">
                <span>Repair Reports</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/legal-dashboard">
                <span>Legal Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/harassment-reports">
                <span>Harassment Reports</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/stakeholder">
                <span>Analytics</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/register" element={<UserRegistration />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <TenantDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/repair-reports"
                element={
                  <ProtectedRoute>
                    <RepairReports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/legal-dashboard"
                element={
                  <ProtectedRoute>
                    <LegalDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/harassment-reports"
                element={
                  <ProtectedRoute>
                    <HarassmentReporting />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/stakeholder"
                element={
                  <ProtectedRoute>
                    <StakeholderDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
}


import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Home from "@/pages/home";
import { 
  Navbar, 
  NavbarGroup, 
  NavbarHeading,
  NavbarDivider,
  Button,
  Menu,
  MenuItem,
  Drawer,
  Classes
} from "@blueprintjs/core";
import { useState } from "react";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

function AppNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <Navbar>
      <NavbarGroup>
        <Button 
          icon="menu" 
          minimal 
          onClick={onMenuClick}
          className="bp4-button bp4-minimal"
        />
        <NavbarDivider />
        <img 
          src="/blocniti-logo.png" 
          alt="BlocNiti AI" 
          style={{ height: '88px', width: 'auto', marginLeft: '8px' }}
        />
      </NavbarGroup>
    </Navbar>
  );
}

function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Drawer
      icon="menu"
      isOpen={isOpen}
      onClose={onClose}
      title="Navigation"
      size="240px"
    >
      <div className={Classes.DRAWER_BODY}>
        <Menu className={Classes.ELEVATION_1}>
          <MenuItem 
            icon="home" 
            text="Dashboard" 
            href="/"
          />
          <MenuItem 
            icon="document" 
            text="Repair Reports"
          />
          <MenuItem 
            icon="chart" 
            text="Analytics"
          />
          <MenuItem 
            icon="people" 
            text="User Management"
          />
          <MenuItem 
            icon="shield" 
            text="Legal Dashboard"
          />
          <MenuItem 
            icon="warning-sign" 
            text="Harassment Reports"
          />
          <MenuItem 
            icon="settings" 
            text="Settings"
          />
        </Menu>
      </div>
    </Drawer>
  );
}

function Router() {
  const { isAuthenticated, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  return (
    <div>
      <AppNavbar onMenuClick={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
        <Switch>
          <Route path="/" component={Home} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;

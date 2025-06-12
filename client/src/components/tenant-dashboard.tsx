
import React, { useState } from 'react';
import { Card, H2, H4, Button, ButtonGroup, Icon, Text } from '@blueprintjs/core';

interface DashboardLevel {
  id: string;
  name: string;
  description: string;
}

const dashboardLevels: DashboardLevel[] = [
  { id: 'personal', name: 'My Tenancy', description: 'Your personal housing data' },
  { id: 'building', name: 'My Building', description: 'Building-wide statistics' },
  { id: 'block', name: 'My Block', description: 'Block-level housing data' },
  { id: 'neighborhood', name: 'Neighborhood', description: 'Community housing trends' },
  { id: 'borough', name: 'Borough', description: 'Borough-wide statistics' },
  { id: 'city', name: 'NYC', description: 'City-wide housing data' }
];

export default function TenantDashboard() {
  const [activeLevel, setActiveLevel] = useState('personal');

  const getStatsForLevel = (level: string) => {
    switch (level) {
      case 'personal':
        return {
          stats: [
            { number: '3', label: 'Active Issues', trend: '+1', type: 'danger' },
            { number: '12', label: 'Days Avg Response', trend: '-2', type: 'warning' },
            { number: '85%', label: 'Completion Rate', trend: '+5%', type: 'normal' },
            { number: '$2,400', label: 'Monthly Rent', trend: '+3%', type: 'accent' }
          ],
          recentActivity: [
            { title: 'Heating Issue Reported', description: 'Living room heating not working', time: '2 hours ago', type: 'danger' },
            { title: 'Window Repair Completed', description: 'Bedroom window latch fixed', time: '1 day ago', type: 'completed' },
            { title: 'Rent Payment Due', description: 'Due in 5 days', time: '3 days ago', type: 'warning' }
          ]
        };
      case 'building':
        return {
          stats: [
            { number: '47', label: 'Total Units', trend: '0', type: 'primary' },
            { number: '23', label: 'Active Issues', trend: '+3', type: 'danger' },
            { number: '78%', label: 'Occupancy Rate', trend: '+2%', type: 'normal' },
            { number: '1892', label: 'Year Built', trend: '132 yrs', type: 'accent' }
          ],
          recentActivity: [
            { title: 'Building Violation Filed', description: 'HPD Class A violation - No heat', time: '4 hours ago', type: 'danger' },
            { title: 'Elevator Maintenance', description: 'Scheduled for tomorrow', time: '1 day ago', type: 'warning' },
            { title: 'New Tenant Registration', description: 'Unit 4B - Sarah Johnson', time: '2 days ago', type: 'completed' }
          ]
        };
      case 'block':
        return {
          stats: [
            { number: '12', label: 'Buildings', trend: '0', type: 'primary' },
            { number: '156', label: 'Total Issues', trend: '+12', type: 'danger' },
            { number: '82%', label: 'Resolution Rate', trend: '+3%', type: 'normal' },
            { number: '15', label: 'HPD Violations', trend: '+2', type: 'warning' }
          ],
          recentActivity: [
            { title: 'Block Meeting Scheduled', description: 'Tenant rights workshop', time: '1 day ago', type: 'normal' },
            { title: 'Multiple Heat Complaints', description: '3 buildings affected', time: '2 days ago', type: 'danger' },
            { title: 'Legal Aid Consultation', description: 'Available next week', time: '3 days ago', type: 'completed' }
          ]
        };
      default:
        return {
          stats: [
            { number: '2.1M', label: 'Total Units', trend: '+1%', type: 'primary' },
            { number: '45K', label: 'Open Issues', trend: '+8%', type: 'danger' },
            { number: '72%', label: 'Resolution Rate', trend: '-2%', type: 'warning' },
            { number: '8.2%', label: 'Rent Increase', trend: '+0.5%', type: 'accent' }
          ],
          recentActivity: [
            { title: 'Housing Policy Update', description: 'New tenant protection laws', time: '1 week ago', type: 'normal' },
            { title: 'City Council Meeting', description: 'Housing committee session', time: '2 weeks ago', type: 'completed' },
            { title: 'Rent Stabilization Report', description: 'Annual statistics released', time: '3 weeks ago', type: 'accent' }
          ]
        };
    }
  };

  const currentData = getStatsForLevel(activeLevel);
  const currentLevel = dashboardLevels.find(l => l.id === activeLevel);

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">BlocNiti Dashboard</h1>
            <p className="dashboard-subtitle">{currentLevel?.description}</p>
          </div>
          <div>
            <ButtonGroup>
              {dashboardLevels.map(level => (
                <Button
                  key={level.id}
                  active={activeLevel === level.id}
                  onClick={() => setActiveLevel(level.id)}
                  small
                >
                  {level.name}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="dashboard-grid-4">
          {currentData.stats.map((stat, index) => (
            <div key={index} className={`stat-card ${stat.type}`}>
              <div className="stat-card-icon">
                <Icon 
                  icon={
                    stat.type === 'danger' ? 'warning-sign' :
                    stat.type === 'warning' ? 'time' :
                    stat.type === 'completed' ? 'tick-circle' :
                    stat.type === 'accent' ? 'dollar' : 'chart'
                  } 
                  size={20} 
                />
              </div>
              <div className="stat-card-number">{stat.number}</div>
              <div className="stat-card-label">{stat.label}</div>
              <div className="stat-card-trend">{stat.trend}</div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="dashboard-grid">
          {/* Chart Card */}
          <div className="chart-card">
            <h3>Issue Resolution Trends</h3>
            <div style={{ 
              height: '200px', 
              background: 'linear-gradient(135deg, rgba(23, 126, 188, 0.1) 0%, rgba(255, 222, 89, 0.1) 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <Icon icon="timeline-line-chart" size={48} />
                <p>Interactive chart will be implemented</p>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="activity-feed">
            <h3 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Recent Activity
            </h3>
            {currentData.recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon status-${activity.type}`}>
                  <Icon 
                    icon={
                      activity.type === 'danger' ? 'warning-sign' :
                      activity.type === 'warning' ? 'time' :
                      activity.type === 'completed' ? 'tick' :
                      'info-sign'
                    } 
                    size={14} 
                  />
                </div>
                <div className="activity-content">
                  <div className="activity-title">{activity.title}</div>
                  <div className="activity-description">{activity.description}</div>
                </div>
                <div className="activity-time">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <Card style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
          <H4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>Quick Actions</H4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button intent="primary" icon="document">Report New Issue</Button>
            <Button intent="none" icon="microphone" style={{ background: 'var(--beer)', color: 'white' }}>
              Record Voice Note
            </Button>
            <Button intent="none" icon="people" style={{ background: 'var(--violet-red)', color: 'white' }}>
              Contact Organizer
            </Button>
            <Button intent="none" icon="shield" style={{ background: 'var(--mustard)', color: 'var(--space-cadet)' }}>
              Legal Resources
            </Button>
          </div>
        </Card>

        {/* Alerts & Countdowns */}
        <div className="dashboard-grid" style={{ marginTop: '1.5rem' }}>
          <Card style={{ background: 'linear-gradient(135deg, var(--violet-red) 0%, #a31358 100%)', color: 'white' }}>
            <H4 style={{ color: 'white', marginBottom: '1rem' }}>Urgent Deadline</H4>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>3 Days</div>
            <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
              Landlord response deadline for heating issue
            </Text>
          </Card>
          
          <Card style={{ background: 'linear-gradient(135deg, var(--cyan-cornflower) 0%, #1a8fd4 100%)', color: 'white' }}>
            <H4 style={{ color: 'white', marginBottom: '1rem' }}>Next Meeting</H4>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Jan 15</div>
            <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
              Tenant organizing meeting at 7 PM
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
}

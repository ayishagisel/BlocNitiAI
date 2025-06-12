
import React, { useState } from 'react';
import { Card, H2, H4, Button, ButtonGroup, Icon, Text } from '@blueprintjs/core';

interface StakeholderType {
  id: string;
  name: string;
  description: string;
}

const stakeholderTypes: StakeholderType[] = [
  { id: 'organizer', name: 'Organizer', description: 'Community organizing dashboard' },
  { id: 'official', name: 'Elected Official', description: 'Policy and constituent dashboard' },
  { id: 'liaison', name: 'Liaison', description: 'Inter-agency coordination dashboard' },
  { id: 'media', name: 'Media', description: 'Public interest and story tracking' }
];

export default function StakeholderDashboard() {
  const [stakeholderType, setStakeholderType] = useState('organizer');

  const getStatsForStakeholder = (type: string) => {
    switch (type) {
      case 'organizer':
        return {
          stats: [
            { number: '247', label: 'Active Tenants', trend: '+12', type: 'primary' },
            { number: '89', label: 'Buildings Organized', trend: '+3', type: 'secondary' },
            { number: '156', label: 'Issues Escalated', trend: '+8', type: 'warning' },
            { number: '73%', label: 'Success Rate', trend: '+5%', type: 'accent' }
          ],
          activities: [
            { title: 'Tenant Meeting Scheduled', description: '123 Main St - Tomorrow 7PM', time: '2 hours ago', type: 'normal' },
            { title: 'Media Inquiry Received', description: 'Channel 7 News - Heat violations', time: '4 hours ago', type: 'accent' },
            { title: 'Legal Aid Referral', description: '3 tenants connected to lawyers', time: '1 day ago', type: 'completed' }
          ]
        };
      case 'official':
        return {
          stats: [
            { number: '1,234', label: 'Constituents Served', trend: '+45', type: 'primary' },
            { number: '67', label: 'Policy Actions', trend: '+2', type: 'secondary' },
            { number: '23', label: 'Bills Sponsored', trend: '+1', type: 'warning' },
            { number: '91%', label: 'Approval Rating', trend: '+3%', type: 'accent' }
          ],
          activities: [
            { title: 'Housing Committee Meeting', description: 'Rent stabilization hearing', time: '3 hours ago', type: 'normal' },
            { title: 'Constituent Meeting', description: 'Tenant rights workshop', time: '1 day ago', type: 'completed' },
            { title: 'Press Release', description: 'New housing protection laws', time: '2 days ago', type: 'accent' }
          ]
        };
      case 'liaison':
        return {
          stats: [
            { number: '12', label: 'Active Agencies', trend: '0', type: 'primary' },
            { number: '89', label: 'Cross-referrals', trend: '+7', type: 'secondary' },
            { number: '34', label: 'Joint Actions', trend: '+2', type: 'warning' },
            { number: '85%', label: 'Resolution Rate', trend: '+8%', type: 'accent' }
          ],
          activities: [
            { title: 'Inter-agency Meeting', description: 'HPD, DHCR, DOB coordination', time: '1 hour ago', type: 'normal' },
            { title: 'Data Sharing Agreement', description: 'New MOU with Housing Court', time: '6 hours ago', type: 'completed' },
            { title: 'Case Escalation', description: 'Complex violation to HPD', time: '1 day ago', type: 'warning' }
          ]
        };
      case 'media':
        return {
          stats: [
            { number: '45', label: 'Active Stories', trend: '+5', type: 'primary' },
            { number: '1.2M', label: 'Reach This Month', trend: '+15%', type: 'secondary' },
            { number: '23', label: 'Investigations', trend: '+3', type: 'warning' },
            { number: '78%', label: 'Follow-up Rate', trend: '+12%', type: 'accent' }
          ],
          activities: [
            { title: 'Breaking Story', description: 'Landlord harassment investigation', time: '30 min ago', type: 'danger' },
            { title: 'Interview Scheduled', description: 'Tenant rights lawyer - Tomorrow', time: '2 hours ago', type: 'normal' },
            { title: 'FOIL Request Filed', description: 'HPD violation statistics', time: '1 day ago', type: 'completed' }
          ]
        };
      default:
        return { stats: [], activities: [] };
    }
  };

  const currentData = getStatsForStakeholder(stakeholderType);
  const currentType = stakeholderTypes.find(t => t.id === stakeholderType);

  return (
    <div className="dashboard-container">
      <div className="dashboard-main">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Stakeholder Dashboard</h1>
            <p className="dashboard-subtitle">{currentType?.description}</p>
          </div>
          <div>
            <ButtonGroup>
              {stakeholderTypes.map(type => (
                <Button
                  key={type.id}
                  active={stakeholderType === type.id}
                  onClick={() => setStakeholderType(type.id)}
                  small
                >
                  {type.name}
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
                    stakeholderType === 'organizer' ? 'people' :
                    stakeholderType === 'official' ? 'office' :
                    stakeholderType === 'liaison' ? 'exchange' :
                    'feed'
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
          {/* Network Map */}
          <div className="chart-card">
            <h3>Network Activity Map</h3>
            <div style={{ 
              height: '200px', 
              background: 'linear-gradient(135deg, rgba(139, 15, 78, 0.1) 0%, rgba(255, 222, 89, 0.1) 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <Icon icon="graph" size={48} />
                <p>Interactive network visualization</p>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="activity-feed">
            <h3 style={{ marginTop: 0, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Recent Activity
            </h3>
            {currentData.activities.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className={`activity-icon status-${activity.type}`}>
                  <Icon 
                    icon={
                      activity.type === 'danger' ? 'warning-sign' :
                      activity.type === 'warning' ? 'time' :
                      activity.type === 'completed' ? 'tick' :
                      activity.type === 'accent' ? 'star' :
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

        {/* Role-specific Actions */}
        <Card style={{ marginTop: '1.5rem', padding: '1.5rem' }}>
          <H4 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>
            {currentType?.name} Tools
          </H4>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {stakeholderType === 'organizer' && (
              <>
                <Button intent="primary" icon="people">Schedule Meeting</Button>
                <Button intent="none" icon="megaphone" style={{ background: 'var(--beer)', color: 'white' }}>
                  Send Alert
                </Button>
                <Button intent="none" icon="manually-entered-data" style={{ background: 'var(--violet-red)', color: 'white' }}>
                  Generate Report
                </Button>
              </>
            )}
            {stakeholderType === 'official' && (
              <>
                <Button intent="primary" icon="office">Policy Briefing</Button>
                <Button intent="none" icon="document" style={{ background: 'var(--beer)', color: 'white' }}>
                  Draft Legislation
                </Button>
                <Button intent="none" icon="chat" style={{ background: 'var(--violet-red)', color: 'white' }}>
                  Constituent Outreach
                </Button>
              </>
            )}
            {stakeholderType === 'liaison' && (
              <>
                <Button intent="primary" icon="exchange">Coordinate Agencies</Button>
                <Button intent="none" icon="data-connection" style={{ background: 'var(--beer)', color: 'white' }}>
                  Share Data
                </Button>
                <Button intent="none" icon="flows" style={{ background: 'var(--violet-red)', color: 'white' }}>
                  Track Referrals
                </Button>
              </>
            )}
            {stakeholderType === 'media' && (
              <>
                <Button intent="primary" icon="feed">New Story</Button>
                <Button intent="none" icon="search" style={{ background: 'var(--beer)', color: 'white' }}>
                  Investigate
                </Button>
                <Button intent="none" icon="video" style={{ background: 'var(--violet-red)', color: 'white' }}>
                  Schedule Interview
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

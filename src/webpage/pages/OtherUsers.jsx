import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/OtherUsers.css';

const OtherUsers = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const userRoles = [
    {
      id: 'customer',
      title: 'Customer',
      icon: '🛍️',
      description: 'Browse and purchase products',
      features: [
        'Browse products',
        'Make purchases',
        'Track orders',
        'Write reviews',
        'Create wishlists'
      ],
      color: '#3B82F6'
    },
    {
      id: 'seller',
      title: 'Seller',
      icon: '🏪',
      description: 'Sell your products on our platform',
      features: [
        'List products',
        'Manage inventory',
        'View sales analytics',
        'Handle orders',
        'Customer communication'
      ],
      color: '#10B981'
    },
    {
      id: 'admin',
      title: 'Admin',
      icon: '👨‍💼',
      description: 'Manage platform operations',
      features: [
        'User management',
        'Content moderation',
        'Sales reports',
        'System configuration',
        'Analytics dashboard'
      ],
      color: '#8B5CF6'
    },
    {
      id: 'superadmin',
      title: 'Super Admin',
      icon: '👑',
      description: 'Full system control and oversight',
      features: [
        'All admin privileges',
        'System settings',
        'Database management',
        'Security controls',
        'User role assignment'
      ],
      color: '#F59E0B'
    },
    {
      id: 'delivery-partner',
      title: 'Delivery Partner',
      icon: '🚚',
      description: 'Handle product deliveries',
      features: [
        'View delivery assignments',
        'Update delivery status',
        'Navigation support',
        'Earnings tracking',
        'Customer feedback'
      ],
      color: '#EF4444'
    },
    {
      id: 'delivery-admin',
      title: 'Delivery Admin',
      icon: '📦',
      description: 'Manage delivery operations',
      features: [
        'Assign deliveries',
        'Monitor delivery partners',
        'Route optimization',
        'Delivery analytics',
        'Issue resolution'
      ],
      color: '#EC4899'
    },
    {
      id: 'customer-support',
      title: 'Customer Support',
      icon: '💬',
      description: 'Assist customers with inquiries',
      features: [
        'Handle customer queries',
        'Process returns/refunds',
        'Order issue resolution',
        'Live chat support',
        'Feedback collection'
      ],
      color: '#06B6D4'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Here you can add logic to change user role or navigate to specific dashboard
    alert(`You selected ${role.title} role!`);
    
    // You can navigate to different dashboards based on role
    // Example:
    // if (role.id === 'customer') navigate('/customer-dashboard');
    // else if (role.id === 'seller') navigate('/seller-dashboard');
  };

  const handleContinue = () => {
    if (selectedRole) {
      // Save role selection to localStorage or context/state management
      localStorage.setItem('userRole', selectedRole.id);
      
      // Navigate to appropriate dashboard
      switch(selectedRole.id) {
        case 'customer':
          navigate('/');
          break;
        case 'seller':
          navigate('/seller/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'superadmin':
          navigate('/superadmin/dashboard');
          break;
        case 'delivery-partner':
          navigate('/delivery/dashboard');
          break;
        case 'delivery-admin':
          navigate('/delivery-admin/dashboard');
          break;
        case 'customer-support':
          navigate('/support/dashboard');
          break;
        default:
          navigate('/');
      }
    }
  };

  return (
    <div className="other-users-container">
      <div className="other-users-header">
        <h1>Choose Your Role</h1>
        <p className="subtitle">Select the role that best describes what you want to do on our platform</p>
      </div>

      <div className="role-selection-container">
        <div className="roles-grid">
          {userRoles.map((role) => (
            <div
              key={role.id}
              className={`role-card ${selectedRole?.id === role.id ? 'selected' : ''}`}
              onClick={() => handleRoleSelect(role)}
              style={{ borderColor: selectedRole?.id === role.id ? role.color : '#e5e7eb' }}
            >
              <div className="role-icon" style={{ backgroundColor: `${role.color}20` }}>
                <span style={{ fontSize: '2rem' }}>{role.icon}</span>
              </div>
              <h3 style={{ color: role.color }}>{role.title}</h3>
              <p className="role-description">{role.description}</p>
              
              <div className="role-features">
                <h4>Features:</h4>
                <ul>
                  {role.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>

              <button 
                className="select-role-btn"
                style={{ 
                  backgroundColor: selectedRole?.id === role.id ? role.color : '#f3f4f6',
                  color: selectedRole?.id === role.id ? 'white' : '#374151'
                }}
              >
                {selectedRole?.id === role.id ? '✓ Selected' : 'Select Role'}
              </button>
            </div>
          ))}
        </div>

        {selectedRole && (
          <div className="selected-role-summary">
            <div className="summary-content">
              <div className="summary-header">
                <div className="summary-icon" style={{ backgroundColor: `${selectedRole.color}20` }}>
                  <span style={{ fontSize: '1.5rem' }}>{selectedRole.icon}</span>
                </div>
                <div>
                  <h2 style={{ color: selectedRole.color }}>You selected: {selectedRole.title}</h2>
                  <p>{selectedRole.description}</p>
                </div>
              </div>
              
              <div className="summary-actions">
                <button 
                  className="continue-btn"
                  onClick={handleContinue}
                  style={{ backgroundColor: selectedRole.color }}
                >
                  Continue as {selectedRole.title}
                </button>
                <button 
                  className="change-role-btn"
                  onClick={() => setSelectedRole(null)}
                >
                  Change Selection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="role-info">
        <h3>About Roles</h3>
        <p>
          Each role provides different access and features on our platform. 
          You can switch between roles later in your account settings.
        </p>
        <div className="info-tips">
          <p>💡 <strong>Tip:</strong> Choose the role that matches what you want to do:</p>
          <ul>
            <li><strong>Want to shop?</strong> Choose <span style={{ color: '#3B82F6' }}>Customer</span></li>
            <li><strong>Want to sell?</strong> Choose <span style={{ color: '#10B981' }}>Seller</span></li>
            <li><strong>Want to deliver?</strong> Choose <span style={{ color: '#EF4444' }}>Delivery Partner</span></li>
            <li><strong>Need to manage?</strong> Choose Admin roles</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OtherUsers;
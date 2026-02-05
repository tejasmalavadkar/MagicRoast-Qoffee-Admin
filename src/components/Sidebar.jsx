import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  ListTodo,
  UserPlus,
  ShoppingCart,
  Target,
  PhoneCall,
  Package,
  ArrowLeftRight,
  Warehouse,
  Receipt,
  TrendingUp,
  CreditCard,
  PiggyBank,
  BarChart3,
  Store,
  Tag,
  Truck,
  Image,
  Globe,
  Newspaper,
  Video,
  Settings,
  Shield,
  Percent,
  Building2,
  Building,
  LogOut,
  ChevronDown,
  ChevronRight,
  Coffee,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';
// Using original logo from public folder
const MagicRoastLogo = '/MagicRoast_Qoffee_Logo.png';

const navigationItems = [
  {
    id: 'personal',
    label: 'Personal',
    icon: UserPlus,
    children: [
      { id: 'calendar', label: 'Calendar', icon: Calendar, path: '/calendar' },
      { id: 'apply-leave', label: 'Apply Leave', icon: FileText, path: '/apply-leave' },
      { id: 'my-tasks', label: 'My Tasks', icon: ListTodo, path: '/my-tasks' },
      { id: 'my-attendance', label: 'My Attendance', icon: Clock, path: '/my-attendance' },
    ],
  },
  {
    id: 'hrm',
    label: 'HRM',
    icon: Users,
    children: [
      { id: 'add-new-employee', label: 'Add New Employee', icon: UserPlus, path: '/hrm/employee-management' },
      { id: 'events', label: 'Events', icon: Calendar, path: '/hrm/events' },
      { id: 'leave', label: 'Leave Management', icon: FileText, path: '/hrm/leave' },
      { id: 'attendance', label: 'Attendance', icon: Clock, path: '/hrm/attendance' },
    ],
  },
  {
    id: 'stock',
    label: 'Stock',
    icon: Package,
    children: [
      { id: 'warehouse', label: 'Warehouse', icon: Warehouse, path: '/stock/warehouse' },
    ],
  },
  {
    id: 'invoice',
    label: 'Invoice',
    icon: Receipt,
    children: [
      { id: 'sales-invoice', label: 'Sales Stock Invoice', icon: TrendingUp, path: '/sales-invoices' },
      { id: 'purchase-invoice', label: 'Purchase Stock Invoice', icon: ShoppingCart, path: '/purchase-invoices' },
    ],
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: DollarSign,
    children: [
      { id: 'account-receivable', label: 'Account Receivable', icon: TrendingUp, path: '/accounts-receivable' },
      { id: 'account-payable', label: 'Account Payable', icon: PiggyBank, path: '/finance-dashboard' }
    ],
  },

];

export default function Sidebar({ isOpen, onToggle }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [expandedItems, setExpandedItems] = useState([]);
  
    // Auto-expand HRM menu if on Add New Employee page, otherwise expand Personal menu if on Calendar page
    useEffect(() => {
      if (location.pathname === '/hrm/add-new-employee') {
        setExpandedItems(prev => 
          prev.includes('hrm') ? prev : [...prev, 'hrm']
        );
      } else if (location.pathname === '/calendar') {
        setExpandedItems(prev => 
          prev.includes('personal') ? prev : [...prev, 'personal']
        );
      }
    }, [location.pathname]);

  const toggleExpand = (id) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleNavClick = (item) => {
    if (item.children) {
      toggleExpand(item.id);
    } else if (item.path) {
      navigate(item.path);
      if (window.innerWidth < 1024) {
        onToggle();
      }
    }
  };

  const isActive = (path) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const isParentActive = (item) => {
    if (!item.children) return false;
    return item.children.some(child => isActive(child.path));
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-espresso/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-[280px] bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out flex flex-col',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-sidebar-hover">
          <div className="flex items-center gap-3">
            <img 
              src={MagicRoastLogo} 
              alt="MagicRoast Logo" 
              className="w-10 h-10 rounded-xl object-contain cursor-pointer"
              onClick={() => navigate('/my-tasks')}
            />
            <div>
              <h1 className="font-bold text-lg text-sidebar-foreground cursor-pointer" onClick={() => navigate('/my-tasks')}>MagicRoast</h1>
              <p className="text-xs text-sidebar-foreground/60 cursor-pointer" onClick={() => navigate('/my-tasks')}>Qoffee ERP</p>
            </div>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-sidebar-hover"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-sidebar-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-caramel/20 flex items-center justify-center text-caramel font-semibold">
              {user?.name?.split(' ').map(n => n[0]).join('') || 'SA'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user?.name || 'Super Admin'}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 scrollbar-thin">
          <ul className="space-y-1">
            {navigationItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={cn(
                    'sidebar-item w-full',
                    (isActive(item.path) || isParentActive(item)) && 'active'
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left text-sm">{item.label}</span>
                  {item.children && (
                    <span className="ml-auto">
                      {expandedItems.includes(item.id) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </button>
                {item.children && expandedItems.includes(item.id) && (
                  <ul className="mt-1 ml-4 pl-4 border-l border-sidebar-hover space-y-1">
                    {item.children.map(child => (
                      <li key={child.id}>
                        <button
                          onClick={() => handleNavClick(child)}
                          className={cn(
                            'sidebar-item w-full text-sm',
                            isActive(child.path) && 'active'
                          )}
                        >
                          <child.icon className="w-4 h-4 flex-shrink-0" />
                          <span className="flex-1 text-left">{child.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-sidebar-hover">
          <button
            onClick={handleLogout}
            className="sidebar-item w-full text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export function MobileMenuButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-lg hover:bg-accent"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
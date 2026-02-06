import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHRM } from './HRMContext';

const DashboardContext = createContext(undefined);

export function DashboardProvider({ children }) {
  const { employees } = useHRM();
  const [stats, setStats] = useState({
    employees: {
      total: 0,
      active: 0,
      inactive: 0,
      departments: 0,
      averageSalary: 0,
    },
    payroll: {
      total: 0,
      totalPaid: 0,
      pending: 0,
      completed: 0,
      averagePayment: 0,
    },
    leave: {
      total: 0,
      pending: 0,
      approved: 0,
      rejected: 0,
      active: 0,
    },
    attendance: {
      totalRecords: 0,
      present: 0,
      absent: 0,
      late: 0,
      halfDay: 0,
      averageWorkingHours: 0,
    },
    purchases: {
      totalInvoices: 0,
      todayPurchases: 0,
      totalAmount: 0,
      thisMonthPurchases: 0,
      topSupplier: '',
    },
    salesInvoice: {
      totalInvoices: 0,
      todayInvoices: 0,
      totalAmount: 0,
    },
    invoice: {
      totalInvoices: 0,
      totalSpent: 0,
      currentBalance: 0,
      averageValue: 0,
    },
    paymentMethods: {
      cash: 0,
      cheque: 0,
      online: 0,
      upi: 0,
    },
    financial: {
      employeeSalaryTotal: 0,
      rawMaterialPurchases: 0,
      otherExpenses: 0,
    },
    receivables: {
      totalInvoices: 0,
      totalAmount: 0,
      receivedAmount: 0,
      pendingAmount: 0,
      overdueInvoices: 0,
    },
  });

  const [salesChartData, setSalesChartData] = useState([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  // Calculate employee stats based on HRM data
  useEffect(() => {
    if (employees && employees.length > 0) {
      const activeEmployees = employees.filter(emp => emp.status === 'active');
      const inactiveEmployees = employees.filter(emp => emp.status === 'inactive');
      const totalSalary = employees.reduce((sum, emp) => sum + (emp.salary || 0), 0);
      const averageSalary = employees.length > 0 ? Math.round(totalSalary / employees.length) : 0;
      
      const departments = [...new Set(employees.map(emp => emp.department))];
      
      setStats(prev => ({
        ...prev,
        employees: {
          total: employees.length,
          active: activeEmployees.length,
          inactive: inactiveEmployees.length,
          departments: departments.length,
          averageSalary: averageSalary,
        }
      }));
    }
  }, [employees]);

  // This would be updated with real data from API calls to other modules
  // For now, we'll simulate real data updates based on employee changes
  useEffect(() => {
    // Simulate fetching other data from APIs
    // This would typically be replaced with actual API calls to inventory, sales, etc.
    const timer = setTimeout(() => {
      // Update stats based on employee data
      setStats(prev => ({
        ...prev,
        payroll: {
          total: prev.employees.total,
          totalPaid: prev.employees.active * 4000, // Example calculation
          pending: 5,
          completed: prev.employees.active - 5,
          averagePayment: 4000,
        },
        leave: {
          total: prev.employees.total * 3, // Example: each employee has ~3 leave requests
          pending: 8,
          approved: 124,
          rejected: 18,
          active: 6,
        }
      }));
    }, 100);

    return () => clearTimeout(timer);
  }, [employees]);

  const value = {
    stats,
    salesChartData,
    expenseBreakdown,
    recentActivity,
    refreshStats: () => {
      // This would trigger API calls to refresh all stats
      console.log('Refreshing dashboard stats...');
    }
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
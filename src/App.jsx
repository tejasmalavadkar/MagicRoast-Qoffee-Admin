import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HRMProvider } from './context/HRMContext';
import { DashboardProvider } from './context/DashboardContext';
import Layout from './components/Layout';
import LoginPage from './pages/Login';
import Dashboard from './pages/Dashboard';
import EmployeesPage from './pages/HRM/Employees';

import PayrollPage from './pages/HRM/Payroll';
import ProductsPage from './pages/Stock/Products';
import OrdersPage from './pages/Ecommerce/Orders';
import PlaceholderPage from './pages/Placeholder';
import EventsPage from './pages/HRM/Events';
import CalendarPage from './pages/Calendar';
import ApplyLeavePage from './pages/ApplyLeave';
import MyTasksPage from './pages/MyTasks';
import MyAttendancePage from './pages/MyAttendance';
import EmployeeManagementPage from './pages/HRM/EmployeeManagement';
import AddNewEmployeePage from './pages/HRM/AddNewEmployee';
import LeaveManagementPage from './pages/HRM/LeaveManagement';
import AttendancePage from './pages/HRM/Attendance';
import WarehouseManagementPage from './pages/WarehouseManagement';
import SalesInvoicesPage from './pages/SalesInvoices';
import PurchaseInvoicesPage from './pages/PurchaseInvoices';
import AccountsReceivablePage from './pages/AccountsReceivable';
import FinanceDashboardPage from './pages/FinanceDashboard';


function App() {
  return (
    <AuthProvider>
      <HRMProvider>
        <DashboardProvider>
          <BrowserRouter>
            <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/add-employee" element={<AddNewEmployeePage />} />

            {/* Protected Routes */}
            <Route element={<Layout />}>
            {/* Dashboard */}
            <Route path="/" element={<Dashboard />} />

            {/* HRM Module */}
            <Route path="/hrm/employees" element={<EmployeesPage />} />
            <Route path="/hrm/add-new-employee" element={<AddNewEmployeePage />} />
            <Route path="/hrm/employee-management" element={<EmployeeManagementPage />} />
            <Route path="/hrm/events" element={<EventsPage />} />
            <Route path="/hrm/attendance" element={<AttendancePage />} />
            <Route path="/hrm/payroll" element={<PayrollPage />} />
            <Route path="/hrm/leave" element={<LeaveManagementPage />} />
            <Route path="/hrm/tasks" element={<PlaceholderPage title="Task Management" description="Assign and track employee tasks" />} />

            {/* Personal Module */}
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/apply-leave" element={<ApplyLeavePage />} />
            <Route path="/my-tasks" element={<MyTasksPage />} />
            <Route path="/my-attendance" element={<MyAttendancePage />} />

            {/* Standalone Pages */}
            <Route path="/leave-management" element={<LeaveManagementPage />} />

            <Route path="/sales-invoices" element={<SalesInvoicesPage />} />
            <Route path="/purchase-invoices" element={<PurchaseInvoicesPage />} />
            <Route path="/accounts-receivable" element={<AccountsReceivablePage />} />
            <Route path="/finance-dashboard" element={<FinanceDashboardPage />} />


            {/* CRM Module */}
            <Route path="/crm/customers" element={<PlaceholderPage title="Customers" description="Manage customer database" />} />
            <Route path="/crm/leads" element={<PlaceholderPage title="Leads" description="Track sales leads" />} />
            <Route path="/crm/followups" element={<PlaceholderPage title="Follow-ups" description="Schedule and manage follow-ups" />} />

            {/* Stock Module */}
            <Route path="/stock/products" element={<ProductsPage />} />
            <Route path="/stock/transfer" element={<PlaceholderPage title="Stock Transfer" description="Transfer stock between warehouses" />} />
            <Route path="/stock/warehouse" element={<WarehouseManagementPage />} />

            {/* Invoice Module */}

            {/* Finance Module */}
            <Route path="/finance/expenses" element={<PlaceholderPage title="Expenses" description="Track business expenses" />} />
            <Route path="/finance/reports" element={<PlaceholderPage title="Financial Reports" description="View financial reports and analytics" />} />

            {/* E-Commerce Module */}
            <Route path="/ecommerce/products" element={<PlaceholderPage title="E-Commerce Products" description="Manage online store products" />} />
            <Route path="/ecommerce/coupons" element={<PlaceholderPage title="Coupon Management" description="Create and manage discount coupons" />} />
            <Route path="/ecommerce/orders" element={<OrdersPage />} />
            <Route path="/ecommerce/banners" element={<PlaceholderPage title="Admin Banners" description="Manage promotional banners" />} />

            {/* Website Admin Module */}
            <Route path="/website/carousel" element={<PlaceholderPage title="Carousel" description="Manage homepage carousel" />} />
            <Route path="/website/banners" element={<PlaceholderPage title="Website Banners" description="Manage website banners" />} />
            <Route path="/website/videos" element={<PlaceholderPage title="Videos" description="Manage video content" />} />
            <Route path="/website/blogs" element={<PlaceholderPage title="Blogs" description="Manage blog posts" />} />

            {/* Settings Module */}
            <Route path="/settings/users" element={<PlaceholderPage title="Users & Roles" description="Manage user accounts and permissions" />} />
            <Route path="/settings/taxes" element={<PlaceholderPage title="Taxes" description="Configure tax settings" />} />
            <Route path="/settings/payments" element={<PlaceholderPage title="Payment Methods" description="Manage payment options" />} />
            <Route path="/settings/branches" element={<PlaceholderPage title="Branches" description="Manage store locations" />} />
            <Route path="/settings/company" element={<PlaceholderPage title="Company Profile" description="Edit company information" />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </DashboardProvider>
    </HRMProvider>
  </AuthProvider>
  );
}

export default App;
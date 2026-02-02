// Current User (Super Admin)
export const currentUser = {
  id: '1',
  email: 'admin@magicroastqoffee.com',
  name: 'John Anderson',
  role: 'super_admin',
  avatar: '',
  department: 'Management',
  createdAt: '2024-01-01',
};

// Dashboard Statistics
export const dashboardStats = {
  employees: {
    total: 48,
    active: 42,
    inactive: 6,
    departments: 8,
    averageSalary: 4250,
  },
  payroll: {
    total: 48,
    totalPaid: 178500,
    pending: 12,
    completed: 36,
    averagePayment: 4125,
  },
  leave: {
    total: 156,
    pending: 8,
    approved: 124,
    rejected: 18,
    active: 6,
  },
  attendance: {
    totalRecords: 1248,
    present: 1089,
    absent: 67,
    late: 58,
    halfDay: 34,
    averageWorkingHours: 7.8,
  },
  purchases: {
    totalInvoices: 234,
    todayPurchases: 3,
    totalAmount: 456780,
    thisMonthPurchases: 28,
    topSupplier: 'Coffee Bean Co.',
  },
  salesInvoice: {
    totalInvoices: 1847,
    todayInvoices: 23,
    totalAmount: 892450,
  },
  invoice: {
    totalInvoices: 2081,
    totalSpent: 456780,
    currentBalance: 124680,
    averageValue: 485,
  },
  paymentMethods: {
    cash: 42,
    cheque: 8,
    online: 35,
    upi: 15,
  },
  financial: {
    employeeSalaryTotal: 178500,
    rawMaterialPurchases: 234560,
    otherExpenses: 45670,
  },
  receivables: {
    totalInvoices: 156,
    totalAmount: 234500,
    receivedAmount: 189200,
    pendingAmount: 45300,
    overdueInvoices: 12,
  },
};

// Employees
export const employees = [
  {
    id: '1',
    employeeId: 'EMP001',
    name: 'Sarah Johnson',
    email: 'sarah.j@magicroastqoffee.com',
    phone: '+1 (555) 123-4567',
    department: 'Operations',
    position: 'Store Manager',
    salary: 5500,
    status: 'active',
    joinDate: '2023-03-15',
  },
  {
    id: '2',
    employeeId: 'EMP002',
    name: 'Michael Chen',
    email: 'michael.c@magicroastqoffee.com',
    phone: '+1 (555) 234-5678',
    department: 'Kitchen',
    position: 'Head Barista',
    salary: 4200,
    status: 'active',
    joinDate: '2023-05-20',
  },
  {
    id: '3',
    employeeId: 'EMP003',
    name: 'Emily Davis',
    email: 'emily.d@magicroastqoffee.com',
    phone: '+1 (555) 345-6789',
    department: 'Finance',
    position: 'Accountant',
    salary: 4800,
    status: 'active',
    joinDate: '2023-02-10',
  },
  {
    id: '4',
    employeeId: 'EMP004',
    name: 'James Wilson',
    email: 'james.w@magicroastqoffee.com',
    phone: '+1 (555) 456-7890',
    department: 'Inventory',
    position: 'Warehouse Manager',
    salary: 4500,
    status: 'active',
    joinDate: '2023-04-01',
  },
  {
    id: '5',
    employeeId: 'EMP005',
    name: 'Lisa Martinez',
    email: 'lisa.m@magicroastqoffee.com',
    phone: '+1 (555) 567-8901',
    department: 'Marketing',
    position: 'Digital Marketing Lead',
    salary: 4600,
    status: 'active',
    joinDate: '2023-06-15',
  },
  {
    id: '6',
    employeeId: 'EMP006',
    name: 'Robert Brown',
    email: 'robert.b@magicroastqoffee.com',
    phone: '+1 (555) 678-9012',
    department: 'Kitchen',
    position: 'Barista',
    salary: 3200,
    status: 'active',
    joinDate: '2023-08-01',
  },
  {
    id: '7',
    employeeId: 'EMP007',
    name: 'Amanda Taylor',
    email: 'amanda.t@magicroastqoffee.com',
    phone: '+1 (555) 789-0123',
    department: 'HR',
    position: 'HR Specialist',
    salary: 4400,
    status: 'active',
    joinDate: '2023-01-20',
  },
  {
    id: '8',
    employeeId: 'EMP008',
    name: 'David Lee',
    email: 'david.l@magicroastqoffee.com',
    phone: '+1 (555) 890-1234',
    department: 'IT',
    position: 'System Administrator',
    salary: 5200,
    status: 'inactive',
    joinDate: '2023-07-10',
  },
];

// Departments
export const departments = [
  { id: '1', name: 'Operations', managerId: '1', employeeCount: 12 },
  { id: '2', name: 'Kitchen', managerId: '2', employeeCount: 15 },
  { id: '3', name: 'Finance', managerId: '3', employeeCount: 5 },
  { id: '4', name: 'Inventory', managerId: '4', employeeCount: 6 },
  { id: '5', name: 'Marketing', managerId: '5', employeeCount: 4 },
  { id: '6', name: 'HR', managerId: '7', employeeCount: 3 },
  { id: '7', name: 'IT', employeeCount: 2 },
  { id: '8', name: 'Customer Service', employeeCount: 8 },
];

// Attendance
export const attendanceRecords = [
  { id: '1', employeeId: '1', employeeName: 'Sarah Johnson', date: '2026-01-27', checkIn: '08:55', checkOut: '17:30', status: 'present', workingHours: 8.5 },
  { id: '2', employeeId: '2', employeeName: 'Michael Chen', date: '2026-01-27', checkIn: '09:15', checkOut: '18:00', status: 'late', workingHours: 8.75 },
  { id: '3', employeeId: '3', employeeName: 'Emily Davis', date: '2026-01-27', checkIn: '08:45', checkOut: '17:15', status: 'present', workingHours: 8.5 },
  { id: '4', employeeId: '4', employeeName: 'James Wilson', date: '2026-01-27', checkIn: '08:30', checkOut: '17:00', status: 'present', workingHours: 8.5 },
  { id: '5', employeeId: '5', employeeName: 'Lisa Martinez', date: '2026-01-27', checkIn: '09:00', status: 'late' },
  { id: '6', employeeId: '6', employeeName: 'Robert Brown', date: '2026-01-27', checkIn: '08:50', status: 'present' },
  { id: '7', employeeId: '7', employeeName: 'Amanda Taylor', date: '2026-01-27', checkIn: '08:30', checkOut: '12:30', status: 'half_day', workingHours: 4 },
  { id: '8', employeeId: '8', employeeName: 'David Lee', date: '2026-01-27', checkIn: '', status: 'absent' },
];

// Leave Requests
export const leaveRequests = [
  { id: '1', employeeId: '1', employeeName: 'Sarah Johnson', type: 'annual', startDate: '2026-02-01', endDate: '2026-02-05', status: 'approved', reason: 'Family vacation' },
  { id: '2', employeeId: '2', employeeName: 'Michael Chen', type: 'sick', startDate: '2026-01-28', endDate: '2026-01-29', status: 'pending', reason: 'Medical appointment' },
  { id: '3', employeeId: '3', employeeName: 'Emily Davis', type: 'personal', startDate: '2026-02-10', endDate: '2026-02-10', status: 'pending', reason: 'Personal matters' },
  { id: '4', employeeId: '5', employeeName: 'Lisa Martinez', type: 'annual', startDate: '2026-01-20', endDate: '2026-01-22', status: 'approved', reason: 'Short trip' },
  { id: '5', employeeId: '7', employeeName: 'Amanda Taylor', type: 'maternity', startDate: '2026-03-01', endDate: '2026-05-31', status: 'approved', reason: 'Maternity leave' },
  { id: '6', employeeId: '6', employeeName: 'Robert Brown', type: 'sick', startDate: '2026-01-15', endDate: '2026-01-15', status: 'rejected', reason: 'Flu symptoms' },
];

// Payroll
export const payrollRecords = [
  { id: '1', employeeId: '1', employeeName: 'Sarah Johnson', month: '2026-01', baseSalary: 5500, allowances: 500, deductions: 400, netSalary: 5600, status: 'completed', paidDate: '2026-01-25' },
  { id: '2', employeeId: '2', employeeName: 'Michael Chen', month: '2026-01', baseSalary: 4200, allowances: 300, deductions: 280, netSalary: 4220, status: 'completed', paidDate: '2026-01-25' },
  { id: '3', employeeId: '3', employeeName: 'Emily Davis', month: '2026-01', baseSalary: 4800, allowances: 400, deductions: 350, netSalary: 4850, status: 'pending' },
  { id: '4', employeeId: '4', employeeName: 'James Wilson', month: '2026-01', baseSalary: 4500, allowances: 350, deductions: 300, netSalary: 4550, status: 'pending' },
  { id: '5', employeeId: '5', employeeName: 'Lisa Martinez', month: '2026-01', baseSalary: 4600, allowances: 400, deductions: 320, netSalary: 4680, status: 'completed', paidDate: '2026-01-25' },
];

// Tasks
export const tasks = [
  { id: '1', title: 'Review Q1 inventory report', description: 'Analyze and compile Q1 inventory data', assigneeId: '4', assigneeName: 'James Wilson', priority: 'high', status: 'in_progress', dueDate: '2026-01-30', createdAt: '2026-01-20' },
  { id: '2', title: 'Prepare monthly sales presentation', description: 'Create slides for board meeting', assigneeId: '1', assigneeName: 'Sarah Johnson', priority: 'urgent', status: 'todo', dueDate: '2026-01-28', createdAt: '2026-01-25' },
  { id: '3', title: 'Update employee handbook', description: 'Include new policies', assigneeId: '7', assigneeName: 'Amanda Taylor', priority: 'medium', status: 'review', dueDate: '2026-02-05', createdAt: '2026-01-15' },
  { id: '4', title: 'Marketing campaign review', description: 'Review social media performance', assigneeId: '5', assigneeName: 'Lisa Martinez', priority: 'low', status: 'completed', dueDate: '2026-01-26', createdAt: '2026-01-18' },
];

// Events
export const events = [
  { id: '1', title: 'Monthly Team Meeting', description: 'All-hands meeting', date: '2026-01-28', time: '10:00', type: 'meeting' },
  { id: '2', title: 'Barista Training Workshop', description: 'Advanced latte art', date: '2026-02-01', time: '14:00', type: 'training' },
  { id: '3', title: 'Company Anniversary', description: 'Celebrating 5 years', date: '2026-02-15', time: '18:00', type: 'other' },
  { id: '4', title: 'Presidents Day', description: 'Federal holiday', date: '2026-02-17', time: '', type: 'holiday' },
];

// Products (Inventory)
export const products = [
  { id: '1', sku: 'CB001', name: 'Arabica Coffee Beans', category: 'Raw Materials', description: 'Premium arabica beans', price: 45, cost: 28, quantity: 250, minStock: 50, unit: 'kg', warehouseId: '1', status: 'in_stock' },
  { id: '2', sku: 'CB002', name: 'Robusta Coffee Beans', category: 'Raw Materials', description: 'Strong robusta beans', price: 35, cost: 22, quantity: 180, minStock: 40, unit: 'kg', warehouseId: '1', status: 'in_stock' },
  { id: '3', sku: 'MK001', name: 'Whole Milk', category: 'Dairy', description: 'Fresh whole milk', price: 4, cost: 2.5, quantity: 120, minStock: 50, unit: 'liter', warehouseId: '2', status: 'in_stock' },
  { id: '4', sku: 'MK002', name: 'Oat Milk', category: 'Dairy', description: 'Plant-based milk', price: 6, cost: 4, quantity: 35, minStock: 30, unit: 'liter', warehouseId: '2', status: 'low_stock' },
  { id: '5', sku: 'SY001', name: 'Vanilla Syrup', category: 'Syrups', description: 'Premium vanilla flavor', price: 12, cost: 7, quantity: 45, minStock: 20, unit: 'bottle', warehouseId: '1', status: 'in_stock' },
  { id: '6', sku: 'CP001', name: 'Paper Cups 12oz', category: 'Packaging', description: 'Branded paper cups', price: 0.15, cost: 0.08, quantity: 5000, minStock: 1000, unit: 'pcs', warehouseId: '3', status: 'in_stock' },
  { id: '7', sku: 'CP002', name: 'Cup Lids', category: 'Packaging', description: 'Sip lids', price: 0.05, cost: 0.02, quantity: 800, minStock: 1000, unit: 'pcs', warehouseId: '3', status: 'low_stock' },
  { id: '8', sku: 'SG001', name: 'Raw Sugar', category: 'Raw Materials', description: 'Organic raw sugar', price: 3, cost: 1.8, quantity: 0, minStock: 20, unit: 'kg', warehouseId: '1', status: 'out_of_stock' },
];

// Warehouses
export const warehouses = [
  { id: '1', name: 'Main Warehouse', location: '123 Coffee Street', capacity: 1000, usedCapacity: 650, managerId: '4' },
  { id: '2', name: 'Cold Storage', location: '125 Coffee Street', capacity: 200, usedCapacity: 155, managerId: '4' },
  { id: '3', name: 'Packaging Store', location: '127 Coffee Street', capacity: 500, usedCapacity: 320, managerId: '4' },
];

// Customers
export const customers = [
  { id: '1', name: 'Downtown Cafe', email: 'orders@downtowncafe.com', phone: '+1 (555) 111-2222', address: '456 Main St', type: 'business', totalOrders: 48, totalSpent: 12450, createdAt: '2024-06-15' },
  { id: '2', name: 'Jessica Smith', email: 'jessica.s@email.com', phone: '+1 (555) 222-3333', address: '789 Oak Ave', type: 'individual', totalOrders: 23, totalSpent: 890, createdAt: '2024-08-20' },
  { id: '3', name: 'Office Solutions Inc', email: 'procurement@officesolutions.com', phone: '+1 (555) 333-4444', address: '321 Business Park', type: 'business', totalOrders: 156, totalSpent: 45680, createdAt: '2024-01-10' },
  { id: '4', name: 'Mike Thompson', email: 'mike.t@email.com', phone: '+1 (555) 444-5555', address: '654 Pine St', type: 'individual', totalOrders: 12, totalSpent: 456, createdAt: '2025-01-05' },
];

// Leads
export const leads = [
  { id: '1', name: 'Corporate Catering Co', email: 'info@corpcatering.com', phone: '+1 (555) 666-7777', source: 'Website', status: 'qualified', assignedTo: 'Lisa Martinez', createdAt: '2026-01-20' },
  { id: '2', name: 'Startup Hub', email: 'admin@startuphub.com', phone: '+1 (555) 777-8888', source: 'Referral', status: 'new', assignedTo: 'Sarah Johnson', createdAt: '2026-01-25' },
  { id: '3', name: 'Hotel Grandview', email: 'purchasing@hotelgrand.com', phone: '+1 (555) 888-9999', source: 'Trade Show', status: 'contacted', assignedTo: 'Lisa Martinez', createdAt: '2026-01-22' },
];

// Follow-ups
export const followUps = [
  { id: '1', leadId: '1', leadName: 'Corporate Catering Co', type: 'meeting', scheduledDate: '2026-01-29', status: 'pending', notes: 'Present wholesale pricing' },
  { id: '2', leadId: '2', leadName: 'Startup Hub', type: 'call', scheduledDate: '2026-01-28', status: 'pending', notes: 'Initial discovery call' },
  { id: '3', leadId: '3', leadName: 'Hotel Grandview', type: 'email', scheduledDate: '2026-01-27', status: 'completed', notes: 'Sent product catalog' },
];

// Suppliers
export const suppliers = [
  { id: '1', name: 'Coffee Bean Co.', contactPerson: 'Robert Green', email: 'sales@coffeebeancompany.com', phone: '+1 (555) 100-2000', address: '100 Bean Valley', totalOrders: 89, totalAmount: 156780 },
  { id: '2', name: 'Fresh Dairy Farm', contactPerson: 'Anna White', email: 'orders@freshdairy.com', phone: '+1 (555) 200-3000', address: '200 Farm Road', totalOrders: 156, totalAmount: 23450 },
  { id: '3', name: 'Sweet Syrups Inc', contactPerson: 'Tom Baker', email: 'wholesale@sweetsyrups.com', phone: '+1 (555) 300-4000', address: '300 Sugar Lane', totalOrders: 34, totalAmount: 8920 },
  { id: '4', name: 'PackRight Solutions', contactPerson: 'Linda Park', email: 'b2b@packright.com', phone: '+1 (555) 400-5000', address: '400 Industrial Blvd', totalOrders: 67, totalAmount: 12340 },
];

// Sales Invoices
export const salesInvoices = [
  { id: '1', invoiceNumber: 'INV-2026-001', customerId: '1', customerName: 'Downtown Cafe', items: [{ id: '1', productId: '1', productName: 'Arabica Coffee Beans', quantity: 10, unitPrice: 45, total: 450 }], subtotal: 450, tax: 40.5, discount: 0, total: 490.5, status: 'paid', paymentMethod: 'bank_transfer', createdAt: '2026-01-25', dueDate: '2026-02-25' },
  { id: '2', invoiceNumber: 'INV-2026-002', customerId: '3', customerName: 'Office Solutions Inc', items: [{ id: '1', productId: '1', productName: 'Arabica Coffee Beans', quantity: 25, unitPrice: 45, total: 1125 }, { id: '2', productId: '5', productName: 'Vanilla Syrup', quantity: 10, unitPrice: 12, total: 120 }], subtotal: 1245, tax: 112.05, discount: 50, total: 1307.05, status: 'sent', createdAt: '2026-01-26', dueDate: '2026-02-26' },
  { id: '3', invoiceNumber: 'INV-2026-003', customerId: '2', customerName: 'Jessica Smith', items: [{ id: '1', productId: '2', productName: 'Robusta Coffee Beans', quantity: 2, unitPrice: 35, total: 70 }], subtotal: 70, tax: 6.3, discount: 0, total: 76.3, status: 'overdue', createdAt: '2026-01-10', dueDate: '2026-01-20' },
];

// Purchase Invoices
export const purchaseInvoices = [
  { id: '1', invoiceNumber: 'PO-2026-001', supplierId: '1', supplierName: 'Coffee Bean Co.', items: [{ id: '1', productId: '1', productName: 'Arabica Coffee Beans', quantity: 100, unitPrice: 28, total: 2800 }], subtotal: 2800, tax: 252, total: 3052, status: 'received', createdAt: '2026-01-20', dueDate: '2026-02-20' },
  { id: '2', invoiceNumber: 'PO-2026-002', supplierId: '2', supplierName: 'Fresh Dairy Farm', items: [{ id: '1', productId: '3', productName: 'Whole Milk', quantity: 50, unitPrice: 2.5, total: 125 }, { id: '2', productId: '4', productName: 'Oat Milk', quantity: 30, unitPrice: 4, total: 120 }], subtotal: 245, tax: 22.05, total: 267.05, status: 'pending', createdAt: '2026-01-26', dueDate: '2026-02-10' },
  { id: '3', invoiceNumber: 'PO-2026-003', supplierId: '4', supplierName: 'PackRight Solutions', items: [{ id: '1', productId: '6', productName: 'Paper Cups 12oz', quantity: 2000, unitPrice: 0.08, total: 160 }], subtotal: 160, tax: 14.4, total: 174.4, status: 'paid', createdAt: '2026-01-15', dueDate: '2026-01-30' },
];

// Expenses
export const expenses = [
  { id: '1', category: 'Utilities', description: 'Electricity bill - January', amount: 2450, date: '2026-01-25', paymentMethod: 'bank_transfer', status: 'approved', approvedBy: 'John Anderson' },
  { id: '2', category: 'Rent', description: 'Monthly rent - Main store', amount: 8500, date: '2026-01-01', paymentMethod: 'bank_transfer', status: 'approved', approvedBy: 'John Anderson' },
  { id: '3', category: 'Marketing', description: 'Social media ads', amount: 1200, date: '2026-01-20', paymentMethod: 'card', status: 'pending' },
  { id: '4', category: 'Maintenance', description: 'Equipment repair', amount: 450, date: '2026-01-22', paymentMethod: 'cash', status: 'approved', approvedBy: 'Sarah Johnson' },
  { id: '5', category: 'Supplies', description: 'Office supplies', amount: 180, date: '2026-01-24', paymentMethod: 'card', status: 'rejected' },
];

// Receivables
export const receivables = [
  { id: '1', invoiceId: 'INV-2026-002', customerName: 'Office Solutions Inc', amount: 1307.05, receivedAmount: 0, pendingAmount: 1307.05, dueDate: '2026-02-26', status: 'pending' },
  { id: '2', invoiceId: 'INV-2026-003', customerName: 'Jessica Smith', amount: 76.3, receivedAmount: 0, pendingAmount: 76.3, dueDate: '2026-01-20', status: 'overdue' },
  { id: '3', invoiceId: 'INV-2025-089', customerName: 'Downtown Cafe', amount: 890, receivedAmount: 500, pendingAmount: 390, dueDate: '2026-01-30', status: 'partial' },
];

// Payables
export const payables = [
  { id: '1', invoiceId: 'PO-2026-001', supplierName: 'Coffee Bean Co.', amount: 3052, paidAmount: 0, pendingAmount: 3052, dueDate: '2026-02-20', status: 'pending' },
  { id: '2', invoiceId: 'PO-2026-002', supplierName: 'Fresh Dairy Farm', amount: 267.05, paidAmount: 0, pendingAmount: 267.05, dueDate: '2026-02-10', status: 'pending' },
  { id: '3', invoiceId: 'PO-2025-156', supplierName: 'Sweet Syrups Inc', amount: 560, paidAmount: 280, pendingAmount: 280, dueDate: '2026-01-25', status: 'partial' },
];

// E-Commerce Products
export const ecomProducts = [
  { id: '1', sku: 'ECOM001', name: 'Premium Arabica Ground Coffee', description: 'Freshly roasted and ground arabica beans', category: 'Ground Coffee', price: 18.99, salePrice: 15.99, stock: 150, images: [], featured: true, status: 'active' },
  { id: '2', sku: 'ECOM002', name: 'Espresso Blend Whole Beans', description: 'Dark roast espresso blend', category: 'Whole Beans', price: 22.99, stock: 200, images: [], featured: true, status: 'active' },
  { id: '3', sku: 'ECOM003', name: 'Cold Brew Concentrate', description: 'Ready-to-drink cold brew', category: 'Ready to Drink', price: 12.99, stock: 80, images: [], featured: false, status: 'active' },
  { id: '4', sku: 'ECOM004', name: 'MagicRoast Branded Mug', description: 'Ceramic mug with logo', category: 'Merchandise', price: 14.99, stock: 50, images: [], featured: false, status: 'active' },
  { id: '5', sku: 'ECOM005', name: 'Decaf Colombian', description: 'Smooth decaf option', category: 'Ground Coffee', price: 16.99, stock: 0, images: [], featured: false, status: 'inactive' },
];

// E-Commerce Orders
export const ecomOrders = [
  { id: '1', orderNumber: 'ORD-2026-0001', customerId: 'c1', customerName: 'Alex Turner', customerEmail: 'alex.t@email.com', items: [{ id: '1', productId: '1', productName: 'Premium Arabica Ground Coffee', quantity: 2, price: 15.99, total: 31.98 }], subtotal: 31.98, shipping: 5.99, tax: 2.88, total: 40.85, status: 'delivered', paymentStatus: 'paid', shippingAddress: '123 Home St, City, ST 12345', createdAt: '2026-01-20' },
  { id: '2', orderNumber: 'ORD-2026-0002', customerId: 'c2', customerName: 'Maria Garcia', customerEmail: 'maria.g@email.com', items: [{ id: '1', productId: '2', productName: 'Espresso Blend Whole Beans', quantity: 3, price: 22.99, total: 68.97 }, { id: '2', productId: '4', productName: 'MagicRoast Branded Mug', quantity: 1, price: 14.99, total: 14.99 }], subtotal: 83.96, shipping: 7.99, tax: 7.56, total: 99.51, status: 'shipped', paymentStatus: 'paid', shippingAddress: '456 Oak Ave, Town, ST 67890', createdAt: '2026-01-25' },
  { id: '3', orderNumber: 'ORD-2026-0003', customerId: 'c3', customerName: 'John Doe', customerEmail: 'john.d@email.com', items: [{ id: '1', productId: '3', productName: 'Cold Brew Concentrate', quantity: 4, price: 12.99, total: 51.96 }], subtotal: 51.96, shipping: 5.99, tax: 4.68, total: 62.63, status: 'processing', paymentStatus: 'paid', shippingAddress: '789 Pine Rd, Village, ST 11111', createdAt: '2026-01-26' },
  { id: '4', orderNumber: 'ORD-2026-0004', customerId: 'c4', customerName: 'Emma Wilson', customerEmail: 'emma.w@email.com', items: [{ id: '1', productId: '1', productName: 'Premium Arabica Ground Coffee', quantity: 1, price: 15.99, total: 15.99 }], subtotal: 15.99, shipping: 5.99, tax: 1.44, total: 23.42, status: 'pending', paymentStatus: 'pending', shippingAddress: '321 Elm St, Metro, ST 22222', createdAt: '2026-01-27' },
];

// Coupons
export const coupons = [
  { id: '1', code: 'WELCOME20', description: 'Welcome discount for new customers', discountType: 'percentage', discountValue: 20, minOrder: 25, maxUses: 1000, usedCount: 234, validFrom: '2026-01-01', validTo: '2026-03-31', status: 'active' },
  { id: '2', code: 'FLAT10', description: 'Flat $10 off', discountType: 'fixed', discountValue: 10, minOrder: 50, maxUses: 500, usedCount: 89, validFrom: '2026-01-15', validTo: '2026-02-15', status: 'active' },
  { id: '3', code: 'HOLIDAY25', description: 'Holiday special', discountType: 'percentage', discountValue: 25, minOrder: 30, maxUses: 200, usedCount: 200, validFrom: '2025-12-20', validTo: '2026-01-05', status: 'expired' },
];

// Banners (E-commerce)
export const banners = [
  { id: '1', title: 'New Year Sale', image: '/banners/newyear.jpg', link: '/shop/sale', position: 1, status: 'active' },
  { id: '2', title: 'Free Shipping', image: '/banners/freeship.jpg', link: '/shop', position: 2, status: 'active' },
];

// Website Carousel
export const carouselItems = [
  { id: '1', title: 'Freshly Roasted Daily', subtitle: 'Premium coffee beans from around the world', image: '/carousel/hero1.jpg', link: '/shop', position: 1, status: 'active' },
  { id: '2', title: 'Visit Our Cafe', subtitle: 'Experience the MagicRoast difference', image: '/carousel/hero2.jpg', link: '/locations', position: 2, status: 'active' },
  { id: '3', title: 'Subscribe & Save', subtitle: 'Get 20% off your first subscription order', image: '/carousel/hero3.jpg', link: '/subscribe', position: 3, status: 'active' },
];

// Blogs
export const blogs = [
  { id: '1', title: 'The Art of Pour Over Coffee', slug: 'art-of-pour-over', excerpt: 'Master the technique of pour over brewing...', content: 'Full blog content here...', author: 'Sarah Johnson', category: 'Brewing Tips', tags: ['brewing', 'pour over', 'tips'], status: 'published', publishedAt: '2026-01-20', createdAt: '2026-01-18' },
  { id: '2', title: 'Understanding Coffee Origins', slug: 'coffee-origins', excerpt: 'Explore how geography affects flavor...', content: 'Full blog content here...', author: 'Michael Chen', category: 'Education', tags: ['origins', 'education', 'flavor'], status: 'published', publishedAt: '2026-01-15', createdAt: '2026-01-12' },
  { id: '3', title: 'Upcoming Spring Menu Preview', slug: 'spring-menu-preview', excerpt: 'Get a sneak peek at our new seasonal drinks...', content: 'Full blog content here...', author: 'Lisa Martinez', category: 'News', tags: ['menu', 'seasonal', 'new'], status: 'draft', createdAt: '2026-01-25' },
];

// Videos
export const videos = [
  { id: '1', title: 'How We Roast Our Beans', description: 'Behind the scenes at our roastery', url: 'https://youtube.com/watch?v=example1', status: 'active', createdAt: '2026-01-10' },
  { id: '2', title: 'Latte Art Tutorial', description: 'Learn basic latte art techniques', url: 'https://youtube.com/watch?v=example2', status: 'active', createdAt: '2026-01-15' },
];

// Branches
export const branches = [
  { id: '1', name: 'Main Store - Downtown', address: '123 Coffee Street, Downtown', phone: '+1 (555) 000-1111', email: 'downtown@magicroastqoffee.com', managerId: '1', status: 'active' },
  { id: '2', name: 'Uptown Location', address: '456 Bean Avenue, Uptown', phone: '+1 (555) 000-2222', email: 'uptown@magicroastqoffee.com', status: 'active' },
  { id: '3', name: 'Airport Kiosk', address: 'Terminal 2, City Airport', phone: '+1 (555) 000-3333', email: 'airport@magicroastqoffee.com', status: 'active' },
];

// Recent Activity for Dashboard
export const recentActivity = [
  { id: '1', type: 'order', message: 'New online order #ORD-2026-0004', time: '5 minutes ago' },
  { id: '2', type: 'employee', message: 'Sarah Johnson checked in', time: '15 minutes ago' },
  { id: '3', type: 'inventory', message: 'Low stock alert: Oat Milk', time: '1 hour ago' },
  { id: '4', type: 'invoice', message: 'Invoice INV-2026-002 sent', time: '2 hours ago' },
  { id: '5', type: 'leave', message: 'New leave request from Michael Chen', time: '3 hours ago' },
];

// Chart Data for Dashboard
export const salesChartData = [
  { month: 'Aug', sales: 42000, orders: 280 },
  { month: 'Sep', sales: 48000, orders: 320 },
  { month: 'Oct', sales: 55000, orders: 380 },
  { month: 'Nov', sales: 62000, orders: 420 },
  { month: 'Dec', sales: 78000, orders: 520 },
  { month: 'Jan', sales: 71000, orders: 480 },
];

export const expenseBreakdown = [
  { category: 'Salaries', value: 178500, color: '#6B4423' },
  { category: 'Raw Materials', value: 234560, color: '#8B5A2B' },
  { category: 'Utilities', value: 28500, color: '#A0522D' },
  { category: 'Rent', value: 51000, color: '#CD853F' },
  { category: 'Marketing', value: 15600, color: '#DEB887' },
  { category: 'Other', value: 12340, color: '#F5DEB3' },
];
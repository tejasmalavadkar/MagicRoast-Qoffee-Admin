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
};

// Employees
export const employees = [];

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
export const attendanceRecords = [];

// Leave Requests
export const leaveRequests = [];

// Payroll
export const payrollRecords = [];

// Tasks
export const tasks = [];

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
export const customers = [];

// Leads
export const leads = [];

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
export const salesInvoices = [];

// Purchase Invoices
export const purchaseInvoices = [];

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
export const ecomOrders = [];

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
export const recentActivity = [];

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
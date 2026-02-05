import {
  Users,
  DollarSign,
  CalendarOff,
  Clock,
  ShoppingCart,
  Receipt,
  FileText,
  CreditCard,
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertCircle,
  CheckCircle,
  XCircle,
  Timer,
  Building2,
  Package,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency, formatNumber } from '../../lib/utils';
import { cn } from '../../lib/utils';
import { useDashboard } from '../../context/DashboardContext';

function StatCard({ title, value, subtitle, icon: Icon, iconBg = 'bg-primary/10', iconColor = 'text-primary', trend, trendValue }) {
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div className={cn('p-2.5 rounded-xl', iconBg)}>
          <Icon className={cn('w-5 h-5', iconColor)} />
        </div>
        {trend && trendValue && (
          <div className={cn(
            'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
            trend === 'up' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
          )}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="kpi-value">{value}</p>
        <p className="kpi-label mt-1">{title}</p>
        {subtitle && <p className="text-xs text-muted-foreground/70 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}

function StatGroup({ title, icon: Icon, children, iconColor = 'text-primary' }) {
  return (
    <div className="space-y-4">
      <h3 className="section-title">
        <Icon className={cn('w-5 h-5', iconColor)} />
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {children}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { stats, salesChartData, expenseBreakdown, recentActivity, refreshStats } = useDashboard();
  const { employees, payroll, leave, attendance, purchases, salesInvoice, invoice, paymentMethods, financial, receivables } = stats;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="page-header mb-1">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Last updated:</span>
          <span className="text-sm font-medium">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Employee Statistics */}
      <StatGroup title="Employee Statistics" icon={Users} iconColor="text-info">
        <StatCard
          icon={Users}
          title="Total Employees"
          value={formatNumber(employees.total)}
          iconBg="bg-info/10"
          iconColor="text-info"
          trend="up"
          trendValue="+3"
        />
        <StatCard
          icon={CheckCircle}
          title="Active Employees"
          value={formatNumber(employees.active)}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          icon={XCircle}
          title="Inactive Employees"
          value={formatNumber(employees.inactive)}
          iconBg="bg-destructive/10"
          iconColor="text-destructive"
        />
        <StatCard
          icon={Building2}
          title="Departments"
          value={formatNumber(employees.departments)}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          icon={DollarSign}
          title="Average Salary"
          value={formatCurrency(employees.averageSalary)}
          iconBg="bg-caramel/10"
          iconColor="text-caramel"
        />
      </StatGroup>

      {/* Payroll Statistics */}
      <StatGroup title="Payroll Statistics" icon={DollarSign} iconColor="text-success">
        <StatCard
          icon={FileText}
          title="Total Payrolls"
          value={formatNumber(payroll.total)}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          icon={DollarSign}
          title="Total Salary Paid"
          value={formatCurrency(payroll.totalPaid)}
          iconBg="bg-success/10"
          iconColor="text-success"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          icon={Timer}
          title="Pending Salaries"
          value={formatNumber(payroll.pending)}
          iconBg="bg-warning/10"
          iconColor="text-warning"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed Salaries"
          value={formatNumber(payroll.completed)}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          icon={Wallet}
          title="Average Payment"
          value={formatCurrency(payroll.averagePayment)}
          iconBg="bg-info/10"
          iconColor="text-info"
        />
      </StatGroup>

      {/* Leave Statistics */}
      <StatGroup title="Leave Statistics" icon={CalendarOff} iconColor="text-warning">
        <StatCard
          icon={FileText}
          title="Total Leave Requests"
          value={formatNumber(leave.total)}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          icon={Timer}
          title="Pending Approvals"
          value={formatNumber(leave.pending)}
          iconBg="bg-warning/10"
          iconColor="text-warning"
        />
        <StatCard
          icon={CheckCircle}
          title="Approved Leaves"
          value={formatNumber(leave.approved)}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          icon={XCircle}
          title="Rejected Leaves"
          value={formatNumber(leave.rejected)}
          iconBg="bg-destructive/10"
          iconColor="text-destructive"
        />
        <StatCard
          icon={Users}
          title="Active Leaves"
          value={formatNumber(leave.active)}
          iconBg="bg-info/10"
          iconColor="text-info"
        />
      </StatGroup>

      {/* Attendance Statistics */}
      <StatGroup title="Attendance Statistics" icon={Clock} iconColor="text-primary">
        <StatCard
          icon={FileText}
          title="Total Records"
          value={formatNumber(attendance.totalRecords)}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          icon={CheckCircle}
          title="Present"
          value={formatNumber(attendance.present)}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          icon={XCircle}
          title="Absent"
          value={formatNumber(attendance.absent)}
          iconBg="bg-destructive/10"
          iconColor="text-destructive"
        />
        <StatCard
          icon={AlertCircle}
          title="Late"
          value={formatNumber(attendance.late)}
          iconBg="bg-warning/10"
          iconColor="text-warning"
        />
        <StatCard
          icon={Timer}
          title="Avg Working Hours"
          value={`${attendance.averageWorkingHours}h`}
          subtitle={`Half day: ${attendance.halfDay}`}
          iconBg="bg-info/10"
          iconColor="text-info"
        />
      </StatGroup>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="section-title">
            <TrendingUp className="w-5 h-5 text-success" />
            Sales Trend (Last 6 Months)
          </h3>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `$${value/1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="sales" fill="hsl(25 45% 35%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="bg-card rounded-xl border p-5">
          <h3 className="section-title">
            <CreditCard className="w-5 h-5 text-warning" />
            Expense Breakdown
          </h3>
          <div className="h-[300px] mt-4 flex items-center">
            <ResponsiveContainer width="50%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground flex-1">{item.category}</span>
                  <span className="text-sm font-medium">{formatCurrency(item.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Statistics */}
      <StatGroup title="Purchase Statistics" icon={ShoppingCart} iconColor="text-primary">
        <StatCard
          icon={FileText}
          title="Total Purchase Invoices"
          value={formatNumber(purchases.totalInvoices)}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          icon={ShoppingCart}
          title="Today's Purchases"
          value={formatNumber(purchases.todayPurchases)}
          iconBg="bg-info/10"
          iconColor="text-info"
        />
        <StatCard
          icon={DollarSign}
          title="Total Purchase Amount"
          value={formatCurrency(purchases.totalAmount)}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          icon={Package}
          title="This Month's Purchases"
          value={formatNumber(purchases.thisMonthPurchases)}
          iconBg="bg-warning/10"
          iconColor="text-warning"
        />
        <StatCard
          icon={Building2}
          title="Top Supplier"
          value={purchases.topSupplier}
          iconBg="bg-caramel/10"
          iconColor="text-caramel"
        />
      </StatGroup>

      {/* Sales & Invoice Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Invoice Statistics */}
        <div className="space-y-4">
          <h3 className="section-title">
            <Receipt className="w-5 h-5 text-success" />
            Sales Invoice Statistics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={FileText}
              title="Total Sales Invoices"
              value={formatNumber(salesInvoice.totalInvoices)}
              iconBg="bg-primary/10"
              iconColor="text-primary"
            />
            <StatCard
              icon={Receipt}
              title="Today's Invoices"
              value={formatNumber(salesInvoice.todayInvoices)}
              iconBg="bg-info/10"
              iconColor="text-info"
            />
            <StatCard
              icon={DollarSign}
              title="Total Sales Amount"
              value={formatCurrency(salesInvoice.totalAmount)}
              iconBg="bg-success/10"
              iconColor="text-success"
              trend="up"
              trendValue="+18%"
            />
          </div>
        </div>

        {/* Invoice Statistics */}
        <div className="space-y-4">
          <h3 className="section-title">
            <FileText className="w-5 h-5 text-info" />
            Invoice Statistics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              icon={FileText}
              title="Total Invoices"
              value={formatNumber(invoice.totalInvoices)}
              iconBg="bg-primary/10"
              iconColor="text-primary"
            />
            <StatCard
              icon={TrendingDown}
              title="Total Spent"
              value={formatCurrency(invoice.totalSpent)}
              iconBg="bg-destructive/10"
              iconColor="text-destructive"
            />
            <StatCard
              icon={Wallet}
              title="Current Balance"
              value={formatCurrency(invoice.currentBalance)}
              iconBg="bg-success/10"
              iconColor="text-success"
            />
            <StatCard
              icon={DollarSign}
              title="Average Value"
              value={formatCurrency(invoice.averageValue)}
              iconBg="bg-info/10"
              iconColor="text-info"
            />
          </div>
        </div>
      </div>

      {/* Payment Methods & Financial Statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="section-title">
            <CreditCard className="w-5 h-5 text-caramel" />
            Payment Methods Distribution
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              icon={Wallet}
              title="Cash"
              value={`${paymentMethods.cash}%`}
              iconBg="bg-success/10"
              iconColor="text-success"
            />
            <StatCard
              icon={FileText}
              title="Cheque"
              value={`${paymentMethods.cheque}%`}
              iconBg="bg-warning/10"
              iconColor="text-warning"
            />
            <StatCard
              icon={CreditCard}
              title="Online"
              value={`${paymentMethods.online}%`}
              iconBg="bg-info/10"
              iconColor="text-info"
            />
            <StatCard
              icon={DollarSign}
              title="UPI"
              value={`${paymentMethods.upi}%`}
              iconBg="bg-primary/10"
              iconColor="text-primary"
            />
          </div>
        </div>

        {/* Financial Statistics */}
        <div className="space-y-4">
          <h3 className="section-title">
            <DollarSign className="w-5 h-5 text-success" />
            Financial Statistics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              icon={Users}
              title="Employee Salary Total"
              value={formatCurrency(financial.employeeSalaryTotal)}
              iconBg="bg-info/10"
              iconColor="text-info"
            />
            <StatCard
              icon={Package}
              title="Raw Material Purchases"
              value={formatCurrency(financial.rawMaterialPurchases)}
              iconBg="bg-warning/10"
              iconColor="text-warning"
            />
            <StatCard
              icon={CreditCard}
              title="Other Expenses"
              value={formatCurrency(financial.otherExpenses)}
              iconBg="bg-destructive/10"
              iconColor="text-destructive"
            />
          </div>
        </div>
      </div>

      {/* Receivables Statistics */}
      <StatGroup title="Receivables Statistics" icon={TrendingUp} iconColor="text-success">
        <StatCard
          icon={FileText}
          title="Total Invoices"
          value={formatNumber(receivables.totalInvoices)}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatCard
          icon={DollarSign}
          title="Total Amount"
          value={formatCurrency(receivables.totalAmount)}
          iconBg="bg-info/10"
          iconColor="text-info"
        />
        <StatCard
          icon={CheckCircle}
          title="Received Amount"
          value={formatCurrency(receivables.receivedAmount)}
          iconBg="bg-success/10"
          iconColor="text-success"
        />
        <StatCard
          icon={Timer}
          title="Pending Amount"
          value={formatCurrency(receivables.pendingAmount)}
          iconBg="bg-warning/10"
          iconColor="text-warning"
        />
        <StatCard
          icon={AlertCircle}
          title="Overdue Invoices"
          value={formatNumber(receivables.overdueInvoices)}
          iconBg="bg-destructive/10"
          iconColor="text-destructive"
        />
      </StatGroup>

      {/* Recent Activity */}
      <div className="bg-card rounded-xl border p-5">
        <h3 className="section-title">
          <Clock className="w-5 h-5 text-info" />
          Recent Activity
        </h3>
        <div className="mt-4 space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                activity.type === 'order' && 'bg-success/10 text-success',
                activity.type === 'employee' && 'bg-info/10 text-info',
                activity.type === 'inventory' && 'bg-warning/10 text-warning',
                activity.type === 'invoice' && 'bg-primary/10 text-primary',
                activity.type === 'leave' && 'bg-caramel/10 text-caramel',
              )}>
                {activity.type === 'order' && <ShoppingCart className="w-5 h-5" />}
                {activity.type === 'employee' && <Users className="w-5 h-5" />}
                {activity.type === 'inventory' && <Package className="w-5 h-5" />}
                {activity.type === 'invoice' && <Receipt className="w-5 h-5" />}
                {activity.type === 'leave' && <CalendarOff className="w-5 h-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
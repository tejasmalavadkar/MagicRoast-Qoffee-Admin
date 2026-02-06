import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(num) {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function formatTime(time) {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const formattedHour = hour % 12 || 12;
  return `${formattedHour}:${minutes} ${ampm}`;
}

export function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function generateId() {
  return Math.random().toString(36).substring(2, 11);
}

export function getStatusColor(status) {
  const colors = {
    // General
    active: 'badge-success',
    inactive: 'badge-danger',
    pending: 'badge-warning',
    completed: 'badge-success',
    // Attendance
    present: 'badge-success',
    absent: 'badge-danger',
    late: 'badge-warning',
    half_day: 'badge-info',
    // Leave
    approved: 'badge-success',
    rejected: 'badge-danger',
    // Invoice
    paid: 'badge-success',
    overdue: 'badge-danger',
    sent: 'badge-info',
    draft: 'badge-warning',
    cancelled: 'badge-danger',
    // Task
    todo: 'badge-warning',
    in_progress: 'badge-info',
    review: 'badge-info',
    // Stock
    in_stock: 'badge-success',
    low_stock: 'badge-warning',
    out_of_stock: 'badge-danger',
    // Order
    processing: 'badge-info',
    shipped: 'badge-info',
    delivered: 'badge-success',
    // Lead
    new: 'badge-info',
    contacted: 'badge-warning',
    qualified: 'badge-success',
    converted: 'badge-success',
    lost: 'badge-danger',
    // Payable/Receivable
    partial: 'badge-warning',
    received: 'badge-success',
  };
  return colors[status] || 'badge-info';
}

export function calculatePercentage(value, total) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function debounce(func, wait) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export const roleLabels = {
  super_admin: 'Super Admin',
  manager: 'Manager',
  hr: 'HR',
  accountant: 'Accountant',
  inventory_staff: 'Inventory Staff',
  barista: 'Barista',
  ecommerce_manager: 'E-commerce Manager',
  website_admin: 'Website Admin',
};

export const priorityColors = {
  low: 'bg-success/10 text-success',
  medium: 'bg-info/10 text-info',
  high: 'bg-warning/10 text-warning',
  urgent: 'bg-destructive/10 text-destructive',
};
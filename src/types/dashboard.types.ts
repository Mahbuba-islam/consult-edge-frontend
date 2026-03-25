// -----------------------------
// NAVIGATION TYPES
// -----------------------------

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

// -----------------------------
// CHART TYPES
// -----------------------------

export interface PieChartData {
  label: string;     // e.g., "Completed", "Pending", "Cancelled"
  value: number;
}

export interface BarChartData {
  month: string;     // "Jan", "Feb", "Mar" OR full month name
  count: number;
}

// -----------------------------
// CONSULTEDGE DASHBOARD TYPES
// -----------------------------

export interface IAdminDashboardData {
  // High-level KPIs
  totalExperts: number;
  totalClients: number;
  totalBookings: number;
  totalIndustries: number;
  totalCategories: number;

  // Financial metrics
  totalRevenue: number;
  monthlyRevenue: number;
  averageBookingValue: number;

  // Engagement metrics
  activeExperts: number;
  activeClients: number;
  pendingVerifications: number;

  // Charts
  barChartData: BarChartData[];   // Monthly bookings or revenue
  pieChartData: PieChartData[];   // Booking status distribution
}

// -----------------------------
// EXPERT DASHBOARD TYPES
// -----------------------------

export interface IExpertDashboardData {
  totalBookings: number;
  completedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;

  totalEarnings: number;
  monthlyEarnings: number;

  rating: number;
  totalReviews: number;

  barChartData: BarChartData[];
  pieChartData: PieChartData[];
}

// -----------------------------
// CLIENT DASHBOARD TYPES
// -----------------------------

export interface IClientDashboardData {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  cancelledBookings: number;

  favoriteExperts: number;

  barChartData: BarChartData[];
  pieChartData: PieChartData[];
}
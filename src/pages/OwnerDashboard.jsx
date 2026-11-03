import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  CreditCard, 
  Calendar, 
  MessageSquare, 
  UtensilsCrossed, 
  Settings, 
  LogOut, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Search, 
  Download, 
  Plus, 
  Trash2, 
  Check, 
  X, 
  ChevronRight, 
  Eye, 
  Filter, 
  RefreshCw,
  Phone,
  Store,
  ExternalLink
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { 
  getOrders, 
  updateOrderStatus, 
  getPayments, 
  getReservations, 
  updateReservationStatus, 
  getMessages, 
  getMenuItems, 
  saveMenuItems, 
  getRestaurantSettings, 
  updateRestaurantSettings 
} from "../lib/storage";
import { RESTAURANT_INFO } from "../data/restaurant";

export default function OwnerDashboard() {
  const navigate = useNavigate();
  const { user, isOwner, logout } = useAuth();

  // Active Tab
  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'orders', 'payments', 'reservations', 'messages', 'menu', 'settings'

  // Data States
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Filters & Selected states
  const [orderSearch, setOrderSearch] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("all");
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);
  const [menuSearch, setMenuSearch] = useState("");
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    category: "meals",
    price: "",
    description: "",
    isVeg: true,
    isSpicy: false,
    image: "",
  });
  const [showAddMenuModal, setShowAddMenuModal] = useState(false);

  // Authentication check
  useEffect(() => {
    if (!isOwner) {
      navigate("/owner/login");
    }
  }, [isOwner, navigate]);

  // Load all dashboard data
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [ord, pay, res, msg, mnu, stg] = await Promise.all([
        getOrders(),
        getPayments(),
        getReservations(),
        getMessages(),
        getMenuItems(),
        getRestaurantSettings(),
      ]);
      setOrders(ord);
      setPayments(pay);
      setReservations(res);
      setMessages(msg);
      setMenuItems(mnu);
      setSettings(stg);
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  // Summary Metrics calculations
  const metrics = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Preparing").length;
    
    // Today's orders (orders created in last 24h)
    const now = Date.now();
    const todayOrdersList = orders.filter(o => {
      const orderDate = new Date(o.createdAt).getTime();
      return (now - orderDate) < 24 * 60 * 60 * 1000;
    });
    const todayOrdersCount = todayOrdersList.length;
    const todayRevenue = todayOrdersList.reduce((sum, o) => sum + (o.total || 0), 0);

    return {
      totalOrders,
      totalRevenue: Math.round(totalRevenue),
      pendingOrders,
      todayOrdersCount,
      todayRevenue: Math.round(todayRevenue),
      totalReservations: reservations.length,
      unreadMessages: messages.filter(m => !m.isRead).length
    };
  }, [orders, reservations, messages]);

  // Order status update handler
  const handleStatusChange = async (orderId, newStatus) => {
    const updated = await updateOrderStatus(orderId, newStatus);
    setOrders(updated);
    if (selectedOrderDetails && selectedOrderDetails.id === orderId) {
      setSelectedOrderDetails({ ...selectedOrderDetails, status: newStatus });
    }
  };

  // Reservation status update handler
  const handleReservationStatus = async (resId, newStatus) => {
    const updated = await updateReservationStatus(resId, newStatus);
    setReservations(updated);
  };

  // Menu item add / delete handler
  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    if (!newMenuItem.name || !newMenuItem.price) return;

    const itemToAdd = {
      id: `item-${Date.now()}`,
      name: newMenuItem.name.trim(),
      category: newMenuItem.category,
      price: parseFloat(newMenuItem.price),
      description: newMenuItem.description.trim() || "Authentic Kerala preparation cooked with native spices.",
      isVeg: newMenuItem.isVeg,
      isSpicy: newMenuItem.isSpicy,
      isPopular: false,
      image: newMenuItem.image.trim() || "https://images.unsplash.com/photo-1610057099433-2ba8c3664d95?auto=format&fit=crop&w=600&q=80",
      tags: ["Chef Special"]
    };

    const updatedMenu = [itemToAdd, ...menuItems];
    await saveMenuItems(updatedMenu);
    setMenuItems(updatedMenu);
    setShowAddMenuModal(false);
    setNewMenuItem({
      name: "",
      category: "meals",
      price: "",
      description: "",
      isVeg: true,
      isSpicy: false,
      image: "",
    });
  };

  const handleDeleteMenuItem = async (itemId) => {
    if (window.confirm("Are you sure you want to remove this dish from the menu?")) {
      const updatedMenu = menuItems.filter(item => item.id !== itemId);
      await saveMenuItems(updatedMenu);
      setMenuItems(updatedMenu);
    }
  };

  // Export payments to CSV
  const exportPaymentsCSV = () => {
    if (!payments || payments.length === 0) return;
    const headers = ["Payment ID", "Order ID", "Customer", "Method", "Amount (INR)", "Status", "Date"];
    const rows = payments.map(p => [
      p.id,
      p.orderId || "",
      `"${p.customerName || "Customer"}"`,
      `"${p.method || "Online"}"`,
      p.amount || 0,
      p.status || "Completed",
      `"${new Date(p.createdAt).toLocaleString()}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `maveli_payments_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Toggle ordering in settings
  const handleToggleOrdering = async () => {
    const newSettings = { ...settings, orderingEnabled: !settings?.orderingEnabled };
    await updateRestaurantSettings(newSettings);
    setSettings(newSettings);
  };

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesStatus = orderStatusFilter === "all" || order.status.toLowerCase() === orderStatusFilter.toLowerCase();
      const q = orderSearch.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        order.id.toLowerCase().includes(q) ||
        order.customer?.name?.toLowerCase().includes(q) ||
        order.customer?.phone?.includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [orders, orderStatusFilter, orderSearch]);

  const navTabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: `Live Orders (${metrics.pendingOrders})`, icon: ShoppingBag },
    { id: "payments", label: "Payments & CSV", icon: CreditCard },
    { id: "reservations", label: `Reservations (${metrics.totalReservations})`, icon: Calendar },
    { id: "messages", label: `Messages (${metrics.unreadMessages})`, icon: MessageSquare },
    { id: "menu", label: "Menu Manager", icon: UtensilsCrossed },
    { id: "settings", label: "Store Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 flex flex-col md:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo & Info */}
          <div className="p-5 border-b border-neutral-800/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center font-bold text-kerala-950">
                M
              </div>
              <div>
                <h1 className="font-serif font-bold text-base text-cream-50">Maveli Console</h1>
                <span className="text-[10px] text-gold-400 font-semibold block">RR Nagar, Bengaluru</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === tab.id
                      ? "bg-kerala-900 text-gold-400 font-bold shadow-sm"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.id === "orders" && metrics.pendingOrders > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-terracotta-600 text-white font-bold">
                      {metrics.pendingOrders}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-neutral-800/80 space-y-3">
          <div className="text-[11px] text-neutral-400">
            <span className="block text-neutral-500">Logged in as:</span>
            <span className="font-semibold text-neutral-300 truncate block">{user?.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-1.5 px-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-[11px] font-semibold flex items-center justify-center gap-1"
            >
              Customer Site <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={logout}
              className="p-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded-lg"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-neutral-900 min-h-screen">
        
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800 mb-6">
          <div>
            <h2 className="font-serif font-bold text-2xl text-cream-50 capitalize">
              {activeTab === "overview" ? "Restaurant Overview" : activeTab.replace("-", " ")}
            </h2>
            <span className="text-xs text-neutral-400">
              Maveli Restaurant Operations Desk &bull; 405 BHEL Main Road
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadDashboardData}
              className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 border border-neutral-700"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>

            {/* Quick Online Ordering Toggle */}
            <button
              onClick={handleToggleOrdering}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
                settings?.orderingEnabled
                  ? "bg-emerald-950/80 border-emerald-500 text-emerald-300"
                  : "bg-rose-950/80 border-rose-500 text-rose-300"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${settings?.orderingEnabled ? "bg-emerald-400" : "bg-rose-400"}`} />
              {settings?.orderingEnabled ? "Online Orders LIVE" : "Orders PAUSED"}
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: OVERVIEW METRICS                                   */}
        {/* ======================================================== */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            
            {/* 5 Summary Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* Card 1: Today's Orders */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>Today's Orders</span>
                  <ShoppingBag className="w-4 h-4 text-gold-400" />
                </div>
                <div className="text-2xl font-bold text-white">{metrics.todayOrdersCount}</div>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> Active kitchen shift
                </span>
              </div>

              {/* Card 2: Today's Revenue */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>Today's Revenue</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white">₹{metrics.todayRevenue}</div>
                <span className="text-[11px] text-neutral-400">Total collected today</span>
              </div>

              {/* Card 3: Pending Orders */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>Pending / Kitchen</span>
                  <Clock className="w-4 h-4 text-terracotta-400" />
                </div>
                <div className="text-2xl font-bold text-white">{metrics.pendingOrders}</div>
                <span className="text-[11px] text-amber-400">Needs attention</span>
              </div>

              {/* Card 4: Total Lifetime Orders */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>Total Orders</span>
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white">{metrics.totalOrders}</div>
                <span className="text-[11px] text-neutral-400">Recorded orders</span>
              </div>

              {/* Card 5: Total Lifetime Revenue */}
              <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>Total Revenue</span>
                  <CreditCard className="w-4 h-4 text-gold-400" />
                </div>
                <div className="text-2xl font-bold text-white">₹{metrics.totalRevenue}</div>
                <span className="text-[11px] text-neutral-400">Gross processed</span>
              </div>

            </div>

            {/* Quick Actions & Recent Orders Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Recent Orders (8 cols) */}
              <div className="lg:col-span-8 bg-neutral-950 p-6 rounded-2xl border border-neutral-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif font-bold text-lg text-cream-50">Recent Kitchen Orders</h3>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-xs text-gold-400 hover:underline font-semibold"
                  >
                    View All &rarr;
                  </button>
                </div>

                <div className="divide-y divide-neutral-800/80 overflow-x-auto">
                  {orders.slice(0, 5).map((ord) => (
                    <div key={ord.id} className="py-3 flex items-center justify-between text-xs gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="text-white">{ord.id}</strong>
                          <span className="text-neutral-400">&bull; {ord.customer?.name}</span>
                        </div>
                        <span className="text-neutral-500 text-[11px]">
                          {ord.items?.map(i => `${i.quantity}x ${i.name}`).join(", ")}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-white">₹{ord.total}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          ord.status === "Pending" ? "bg-amber-950 text-amber-300 border border-amber-600" :
                          ord.status === "Preparing" ? "bg-blue-950 text-blue-300 border border-blue-600" :
                          ord.status === "Completed" ? "bg-emerald-950 text-emerald-300 border border-emerald-600" :
                          "bg-neutral-800 text-neutral-300"
                        }`}>
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reservations & Messages summary (4 cols) */}
              <div className="lg:col-span-4 space-y-4">
                <div className="bg-neutral-950 p-5 rounded-2xl border border-neutral-800 space-y-3">
                  <h3 className="font-serif font-bold text-base text-cream-50">Upcoming Bookings</h3>
                  <div className="divide-y divide-neutral-800 text-xs">
                    {reservations.slice(0, 3).map(res => (
                      <div key={res.id} className="py-2.5 flex justify-between">
                        <div>
                          <strong className="text-white block">{res.name}</strong>
                          <span className="text-neutral-400 text-[11px]">{res.date} at {res.time} ({res.guests} guests)</span>
                        </div>
                        <span className="text-[10px] font-bold text-gold-400">{res.status}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab("reservations")}
                    className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 text-gold-400 rounded-xl text-xs font-semibold"
                  >
                    Manage Reservations
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: ORDERS MANAGEMENT                                 */}
        {/* ======================================================== */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            
            {/* Filter Controls */}
            <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center gap-4">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by Order ID, customer name or phone..."
                  className="w-full pl-9 pr-3 py-2 bg-neutral-900 border border-neutral-700 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                {["all", "Pending", "Preparing", "Out for Delivery", "Ready for Pickup", "Completed", "Cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      orderStatusFilter === st
                        ? "bg-gold-500 text-neutral-950 font-bold"
                        : "bg-neutral-900 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {st === "all" ? "All Orders" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider text-[10px] border-b border-neutral-800">
                    <tr>
                      <th className="p-4">Order ID</th>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="p-8 text-center text-neutral-500">
                          No orders found matching the filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-neutral-900/50 transition-colors">
                          <td className="p-4 font-bold text-white">{ord.id}</td>
                          <td className="p-4">
                            <span className="font-semibold text-neutral-200 block">{ord.customer?.name}</span>
                            <span className="text-[11px] text-neutral-500">{ord.customer?.phone}</span>
                          </td>
                          <td className="p-4 capitalize text-neutral-300">{ord.orderType}</td>
                          <td className="p-4 font-bold text-white">₹{ord.total}</td>
                          <td className="p-4">
                            <span className="text-neutral-300 block">{ord.payment?.method || "COD"}</span>
                            <span className={`text-[10px] font-bold ${
                              ord.payment?.status === "Paid" || ord.payment?.status === "Success" ? "text-emerald-400" : "text-amber-400"
                            }`}>
                              {ord.payment?.status || "Pending"}
                            </span>
                          </td>
                          <td className="p-4">
                            {/* Status Selector Dropdown */}
                            <select
                              value={ord.status}
                              onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                              className="bg-neutral-900 border border-neutral-700 text-neutral-200 rounded-lg px-2.5 py-1 text-xs focus:border-gold-500"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Ready for Pickup">Ready for Pickup</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button
                              onClick={() => setSelectedOrderDetails(ord)}
                              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                              title="View Order Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: PAYMENTS HISTORY & CSV EXPORT                     */}
        {/* ======================================================== */}
        {activeTab === "payments" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-cream-50">Transaction History</h3>
                <span className="text-xs text-neutral-400">All Razorpay and counter payments logged</span>
              </div>
              <button
                onClick={exportPaymentsCSV}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow"
              >
                <Download className="w-4 h-4" />
                Export Payments CSV
              </button>
            </div>

            <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider text-[10px] border-b border-neutral-800">
                  <tr>
                    <th className="p-4">Payment ID</th>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Method</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date & Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {payments.map(p => (
                    <tr key={p.id} className="hover:bg-neutral-900/50">
                      <td className="p-4 font-mono text-neutral-300">{p.id}</td>
                      <td className="p-4 font-bold text-white">{p.orderId}</td>
                      <td className="p-4 text-neutral-300">{p.customerName || "Customer"}</td>
                      <td className="p-4 text-neutral-300">{p.method}</td>
                      <td className="p-4 font-bold text-white">₹{p.amount}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-600">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 text-neutral-400 text-[11px]">
                        {new Date(p.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: RESERVATIONS                                      */}
        {/* ======================================================== */}
        {activeTab === "reservations" && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-lg text-cream-50">Table Bookings</h3>

            <div className="bg-neutral-950 rounded-2xl border border-neutral-800 overflow-hidden shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider text-[10px] border-b border-neutral-800">
                  <tr>
                    <th className="p-4">Guest Name</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Party Size</th>
                    <th className="p-4">Special Requests</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {reservations.map(r => (
                    <tr key={r.id} className="hover:bg-neutral-900/50">
                      <td className="p-4 font-bold text-white">{r.name}</td>
                      <td className="p-4 text-neutral-300">{r.phone}</td>
                      <td className="p-4 text-neutral-200">
                        {r.date} &bull; {r.time}
                      </td>
                      <td className="p-4 font-semibold text-white">{r.guests} guests</td>
                      <td className="p-4 text-neutral-400 italic max-w-xs">{r.notes || "None"}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          r.status === "Confirmed" ? "bg-emerald-950 text-emerald-300 border border-emerald-600" :
                          r.status === "Cancelled" ? "bg-rose-950 text-rose-300 border border-rose-600" :
                          "bg-amber-950 text-amber-300 border border-amber-600"
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {r.status !== "Confirmed" && (
                          <button
                            onClick={() => handleReservationStatus(r.id, "Confirmed")}
                            className="px-2.5 py-1 bg-emerald-800 hover:bg-emerald-700 text-white rounded text-[11px] font-bold"
                          >
                            Confirm
                          </button>
                        )}
                        {r.status !== "Cancelled" && (
                          <button
                            onClick={() => handleReservationStatus(r.id, "Cancelled")}
                            className="px-2.5 py-1 bg-neutral-800 hover:bg-rose-900 text-neutral-300 hover:text-white rounded text-[11px]"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 5: CONTACT INBOX                                     */}
        {/* ======================================================== */}
        {activeTab === "messages" && (
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-lg text-cream-50">Inquiries & Feedback</h3>

            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="p-8 bg-neutral-950 rounded-2xl text-center text-neutral-500 border border-neutral-800">
                  No contact messages received yet.
                </div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} className="p-5 bg-neutral-950 rounded-2xl border border-neutral-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm">{m.name}</strong>
                        <span className="text-neutral-400">&bull; {m.email}</span>
                        {m.phone && <span className="text-neutral-400">&bull; {m.phone}</span>}
                      </div>
                      <span className="text-neutral-500 text-[11px]">
                        {new Date(m.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="font-semibold text-gold-400 text-xs">Subject: {m.subject}</div>
                    <p className="text-neutral-300 text-xs leading-relaxed bg-neutral-900 p-3 rounded-xl border border-neutral-800">
                      {m.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 6: MENU MANAGER                                      */}
        {/* ======================================================== */}
        {activeTab === "menu" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif font-bold text-lg text-cream-50">Live Restaurant Menu ({menuItems.length} dishes)</h3>
                <span className="text-xs text-neutral-400">Add, edit pricing, or remove dishes instantly</span>
              </div>
              <button
                onClick={() => setShowAddMenuModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-950 rounded-xl text-xs font-bold flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" />
                Add New Dish
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map(item => (
                <div key={item.id} className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 flex gap-3 justify-between items-start">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-white truncate">{item.name}</h4>
                    <span className="text-xs font-bold text-gold-400 block">₹{item.price}</span>
                    <span className="text-[10px] text-neutral-400 capitalize">{item.category}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteMenuItem(item.id)}
                    className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 7: SETTINGS                                          */}
        {/* ======================================================== */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-neutral-950 p-6 sm:p-8 rounded-3xl border border-neutral-800 space-y-6">
            <h3 className="font-serif font-bold text-xl text-cream-50">Restaurant Store Settings</h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Phone Number</label>
                <input
                  type="text"
                  value={settings?.phone || RESTAURANT_INFO.contact.phone}
                  readOnly
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-neutral-300"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-semibold mb-1">Address on Receipts</label>
                <input
                  type="text"
                  value={settings?.address || RESTAURANT_INFO.location.fullAddress}
                  readOnly
                  className="w-full p-2.5 bg-neutral-900 border border-neutral-700 rounded-xl text-neutral-300"
                />
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Online Ordering Gateway</span>
                  <span className="text-neutral-400">Temporarily pause orders during kitchen peak hours</span>
                </div>
                <button
                  onClick={handleToggleOrdering}
                  className={`px-4 py-2 rounded-xl font-bold ${
                    settings?.orderingEnabled ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {settings?.orderingEnabled ? "Enabled" : "Paused"}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Modal for Order Details View */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 rounded-3xl max-w-lg w-full p-6 border border-neutral-700 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif font-bold text-lg text-white">Order Details: {selectedOrderDetails.id}</h3>
              <button onClick={() => setSelectedOrderDetails(null)} className="p-1 text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <p><strong>Customer:</strong> {selectedOrderDetails.customer?.name} ({selectedOrderDetails.customer?.phone})</p>
              <p><strong>Address:</strong> {selectedOrderDetails.customer?.address}</p>
              {selectedOrderDetails.customer?.notes && (
                <p><strong>Kitchen Note:</strong> {selectedOrderDetails.customer?.notes}</p>
              )}
            </div>

            <div className="divide-y divide-neutral-800 border-y border-neutral-800 py-2">
              {selectedOrderDetails.items?.map((it, idx) => (
                <div key={idx} className="py-1.5 flex justify-between">
                  <span>{it.quantity}x {it.name}</span>
                  <span className="font-bold">₹{it.price * it.quantity}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-baseline pt-2">
              <span className="font-bold">Total Bill:</span>
              <span className="font-serif font-bold text-lg text-gold-400">₹{selectedOrderDetails.total}</span>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex justify-end">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal to Add Menu Item */}
      {showAddMenuModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddMenuItem} className="bg-neutral-900 rounded-3xl max-w-md w-full p-6 border border-neutral-700 shadow-2xl space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="font-serif font-bold text-base text-white">Add Dish to Menu</h3>
              <button type="button" onClick={() => setShowAddMenuModal(false)} className="p-1 text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-neutral-300 font-semibold mb-1">Dish Name *</label>
              <input
                type="text"
                required
                value={newMenuItem.name}
                onChange={e => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                placeholder="e.g. Malabar Fish Fry"
                className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Category</label>
                <select
                  value={newMenuItem.category}
                  onChange={e => setNewMenuItem({ ...newMenuItem, category: e.target.value })}
                  className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                >
                  <option value="meals">Banana Leaf Meals</option>
                  <option value="breakfast">Weekend Breakfast</option>
                  <option value="starters">Starters & Roasts</option>
                  <option value="curries">Kerala Curries</option>
                  <option value="seafood">Seafood Delicacies</option>
                  <option value="biryani">Biryani & Rice</option>
                  <option value="breads">Kerala Breads</option>
                  <option value="desserts">Desserts & Drinks</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-semibold mb-1">Price (INR) *</label>
                <input
                  type="number"
                  required
                  value={newMenuItem.price}
                  onChange={e => setNewMenuItem({ ...newMenuItem, price: e.target.value })}
                  placeholder="240"
                  className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-300 font-semibold mb-1">Description</label>
              <textarea
                rows="2"
                value={newMenuItem.description}
                onChange={e => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                placeholder="Fresh catch marinated in roasted shallot paste and lemon..."
                className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-semibold mb-1">Image URL (Optional)</label>
              <input
                type="url"
                value={newMenuItem.image}
                onChange={e => setNewMenuItem({ ...newMenuItem, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full p-2.5 bg-neutral-800 border border-neutral-700 rounded-xl text-white"
              />
            </div>

            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newMenuItem.isVeg}
                  onChange={e => setNewMenuItem({ ...newMenuItem, isVeg: e.target.checked })}
                />
                <span>Vegetarian</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newMenuItem.isSpicy}
                  onChange={e => setNewMenuItem({ ...newMenuItem, isSpicy: e.target.checked })}
                />
                <span>Spicy Naadan</span>
              </label>
            </div>

            <div className="pt-3 border-t border-neutral-800 flex gap-2">
              <button
                type="button"
                onClick={() => setShowAddMenuModal(false)}
                className="flex-1 py-2 bg-neutral-800 text-neutral-300 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 bg-gradient-to-r from-gold-500 to-gold-600 text-neutral-950 font-bold rounded-xl"
              >
                Add Dish
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

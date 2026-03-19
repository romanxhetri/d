import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, 
  Package, 
  Users, 
  ShoppingBag, 
  Settings, 
  Bell, 
  Search, 
  Filter, 
  ArrowUpRight, 
  Truck, 
  CheckCircle2, 
  Clock, 
  X, 
  Zap, 
  BarChart, 
  TrendingUp, 
  DollarSign, 
  Layers, 
  LayoutDashboard, 
  MoreHorizontal, 
  ChevronRight, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard 
} from 'lucide-react';
import { Order, Product } from '../../types';

export const AdminDashboard = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'settings'>('overview');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('wcetas_orders') || '[]');
    setOrders(savedOrders.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  }, []);

  const stats = [
    { label: 'Total Revenue', value: '$128,430', change: '+12.5%', icon: <DollarSign className="text-emerald-400" />, color: 'emerald' },
    { label: 'Active Orders', value: orders.length.toString(), change: '+4.2%', icon: <Package className="text-indigo-400" />, color: 'indigo' },
    { label: 'New Customers', value: '1,240', change: '+8.1%', icon: <Users className="text-pink-400" />, color: 'pink' },
    { label: 'Success Rate', value: '99.2%', change: '+0.4%', icon: <TrendingUp className="text-orange-400" />, color: 'orange' }
  ];

  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-vibrant text-white text-[10px] font-black tracking-[0.2em] uppercase mb-6 shadow-2xl glow-pink border border-white/20"
            >
              <Zap className="w-3.5 h-3.5 animate-pulse" />
              <span>System Administrator</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-none text-vibrant">Control<br />Center.</h1>
          </div>
          
          <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            <div className="glass p-1.5 sm:p-2 rounded-2xl border-white/10 flex items-center gap-1 sm:gap-2">
              {['overview', 'orders', 'products', 'settings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-[10px] sm:text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeTab === tab ? 'bg-white text-black glow-white' : 'text-white/40 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -5 }}
                    className="glass p-6 sm:p-8 rounded-[32px] sm:rounded-[40px] border-white/10 relative overflow-hidden group"
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}-500/10 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700`}></div>
                    <div className="flex items-center justify-between mb-4 sm:mb-6 relative z-10">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                        {stat.icon}
                      </div>
                      <span className="text-[10px] font-black text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">{stat.change}</span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1 sm:mb-2 relative z-10">{stat.label}</p>
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tighter relative z-10">{stat.value}</h3>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 glass rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border-white/10">
                  <div className="flex items-center justify-between mb-8 sm:mb-10">
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight">Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} className="text-[10px] font-black uppercase tracking-widest text-vibrant hover:underline">View All</button>
                  </div>
                  
                  <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-white/5">
                          <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Order ID</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Customer</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Total</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Status</th>
                          <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                            <td className="py-6">
                              <span className="font-mono text-xs font-bold text-indigo-400">{order.id}</span>
                            </td>
                            <td className="py-6">
                              <div className="flex flex-col">
                                <span className="font-bold">{order.shippingDetails.name}</span>
                                <span className="text-xs text-white/30">{order.shippingDetails.email}</span>
                              </div>
                            </td>
                            <td className="py-6 font-bold">${order.total.toLocaleString()}</td>
                            <td className="py-6">
                              <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                                order.status === 'pending' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-6">
                              <button 
                                onClick={() => setSelectedOrder(order)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                              >
                                <ChevronRight className="w-5 h-5 text-white/40" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {orders.length === 0 && (
                          <tr>
                            <td colSpan={5} className="py-20 text-center text-white/20 font-bold italic">No orders placed yet.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Quick Actions / Activity */}
                <div className="glass rounded-[40px] p-10 border-white/10">
                  <h3 className="text-2xl font-black tracking-tight mb-10">System Status</h3>
                  <div className="space-y-6">
                    {[
                      { label: 'Logistics Engine', status: 'Optimal', icon: <Zap className="text-emerald-400" /> },
                      { label: 'Marketplace API', status: 'Healthy', icon: <Layers className="text-indigo-400" /> },
                      { label: 'Payment Gateway', status: 'Online', icon: <CreditCard className="text-pink-400" /> },
                      { label: 'Global Hubs', status: 'Active', icon: <MapPin className="text-orange-400" /> }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center">
                            {item.icon}
                          </div>
                          <span className="font-bold text-sm">{item.label}</span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{item.status}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-10 p-6 rounded-3xl bg-vibrant/10 border border-vibrant/20 glow-pink">
                    <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Bell className="w-4 h-4" /> System Alert
                    </h4>
                    <p className="text-xs text-white/60 leading-relaxed">
                      New global hub opening in Berlin next week. Prepare logistics routing updates.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="glass rounded-[32px] sm:rounded-[40px] p-6 sm:p-10 border-white/10"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">Global Orders List</h3>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input 
                      type="text" 
                      placeholder="Search orders..." 
                      className="glass w-full sm:w-64 py-3 pl-12 pr-6 rounded-2xl border-white/5 outline-none focus:border-vibrant/50 transition-colors text-sm"
                    />
                  </div>
                  <button className="glass w-full sm:w-auto p-3 rounded-2xl border-white/5 hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                    <Filter className="w-5 h-5 text-white/40" />
                    <span className="sm:hidden text-xs font-bold uppercase tracking-widest">Filter</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto no-scrollbar">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="text-left border-b border-white/5">
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Order ID</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Customer Details</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Products</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Payment</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Total</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Status</th>
                      <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-white/30">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.map((order) => (
                      <tr key={order.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-6 sm:py-8">
                          <span className="font-mono text-xs font-bold text-indigo-400">{order.id}</span>
                          <p className="text-[10px] text-white/20 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </td>
                        <td className="py-6 sm:py-8">
                          <div className="flex flex-col">
                            <span className="font-bold text-sm">{order.shippingDetails.name}</span>
                            <span className="text-[10px] sm:text-xs text-white/40">{order.shippingDetails.email}</span>
                            <span className="text-[10px] sm:text-xs text-white/40">{order.shippingDetails.phone}</span>
                          </div>
                        </td>
                        <td className="py-6 sm:py-8">
                          <div className="flex flex-col gap-1">
                            {order.items.map((item, i) => (
                              <span key={i} className="text-[10px] sm:text-xs font-medium text-white/60">
                                {item.quantity}x {item.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-6 sm:py-8">
                          <span className="text-[10px] font-black uppercase tracking-widest text-pink-400 bg-pink-400/10 px-3 py-1 rounded-full">
                            {order.paymentMethod}
                          </span>
                        </td>
                        <td className="py-6 sm:py-8 font-bold text-base sm:text-lg">${order.total.toLocaleString()}</td>
                        <td className="py-6 sm:py-8">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                            order.status === 'pending' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-6 sm:py-8">
                          <button 
                            onClick={() => setSelectedOrder(order)}
                            className="bg-white/5 hover:bg-vibrant text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="glass w-full max-w-4xl rounded-[32px] sm:rounded-[40px] border-white/10 overflow-hidden relative my-auto"
            >
              <div className="p-6 sm:p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center border border-indigo-500/30">
                    <Package className="w-5 h-5 sm:w-6 h-6 text-indigo-400" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-3xl font-black tracking-tighter">Order {selectedOrder.id}</h2>
                    <p className="text-[8px] sm:text-xs text-white/40 uppercase tracking-widest font-black">Placed on {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="p-2 sm:p-3 hover:bg-white/5 rounded-full transition-colors">
                  <X className="w-6 h-6 sm:w-8 sm:h-8 text-white/40" />
                </button>
              </div>

              <div className="p-6 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                <div className="space-y-8 sm:space-y-10">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-vibrant mb-4 sm:mb-6">Customer Information</h4>
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center"><Users className="w-5 h-5 text-white/40" /></div>
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">Full Name</p>
                          <p className="font-bold text-base sm:text-lg">{selectedOrder.shippingDetails.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center"><Mail className="w-5 h-5 text-white/40" /></div>
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">Email</p>
                          <p className="font-bold text-base sm:text-lg break-all">{selectedOrder.shippingDetails.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center"><Phone className="w-5 h-5 text-white/40" /></div>
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">Phone</p>
                          <p className="font-bold text-base sm:text-lg">{selectedOrder.shippingDetails.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center"><MapPin className="w-5 h-5 text-white/40" /></div>
                        <div>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">Location</p>
                          <p className="font-bold text-base sm:text-lg">{selectedOrder.shippingDetails.deliveryLocation}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-vibrant mb-4 sm:mb-6">Payment Method</h4>
                    <div className="flex items-center gap-4 p-4 sm:p-6 rounded-3xl bg-white/5 border border-white/5">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500/20 rounded-2xl flex items-center justify-center border border-pink-500/30">
                        <CreditCard className="w-5 h-5 sm:w-6 h-6 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-base sm:text-lg font-bold uppercase tracking-widest">{selectedOrder.paymentMethod}</p>
                        <p className="text-[10px] text-white/30">Transaction ID: TXN-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 sm:space-y-10">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-vibrant mb-4 sm:mb-6">Order Items</h4>
                    <div className="space-y-4 max-h-[250px] sm:max-h-[300px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-3 sm:p-4 rounded-2xl bg-white/5 border border-white/5">
                          <div className="flex items-center gap-3 sm:gap-4">
                            <img src={item.image} alt={item.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover" />
                            <div>
                              <p className="font-bold text-xs sm:text-sm">{item.name}</p>
                              <p className="text-[10px] sm:text-xs text-white/30">{item.quantity} x ${item.price}</p>
                            </div>
                          </div>
                          <span className="font-bold text-sm sm:text-base">${(item.quantity * item.price).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xl sm:text-2xl font-black tracking-tighter">Total Amount</span>
                      <span className="text-2xl sm:text-3xl font-black tracking-tighter text-vibrant">${selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="w-full sm:flex-1 bg-emerald-500 text-white py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-all glow-emerald">
                      <CheckCircle2 className="w-5 h-5 sm:w-6 h-6" /> Mark as Shipped
                    </button>
                    <button className="w-full sm:flex-1 glass py-4 sm:py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-white/5 transition-colors text-sm sm:text-base">
                      <Truck className="w-5 h-5 sm:w-6 h-6" /> Track Hub
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Search, Package, MapPin, Clock, CheckCircle2, Truck, ShieldCheck, BarChart3, Bell, FileText, MessageSquare, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom component to handle map center updates
const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, 13);
  return null;
};

export const TrackingView = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Mock tracking data
  const mockShipment = {
    id: 'WC-8829-X92',
    status: 'In Transit',
    origin: 'Singapore Hub',
    destination: 'New York, USA',
    currentLocation: [1.3521, 103.8198] as [number, number], // Singapore
    estimatedDelivery: 'March 22, 2026',
    weight: '12.5 kg',
    type: 'Express Air Freight',
    history: [
      { status: 'Delivered', location: 'New York Office', time: 'Pending', completed: false },
      { status: 'Out for Delivery', location: 'Local Distribution Center', time: 'Pending', completed: false },
      { status: 'Arrived at Destination Country', location: 'JFK Airport, NY', time: 'March 19, 04:20 AM', completed: false },
      { status: 'In Transit', location: 'International Transit Hub', time: 'March 18, 10:15 PM', completed: true },
      { status: 'Departed Origin Hub', location: 'Singapore Changi Hub', time: 'March 18, 02:30 PM', completed: true },
      { status: 'Picked Up', location: 'Warehouse A-12', time: 'March 17, 09:00 AM', completed: true },
    ]
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber) return;
    
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyber-blue text-black text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-2xl glow-cyber border border-white/20"
          >
            <Zap className="w-3.5 h-3.5 animate-pulse" />
            <span>Real-Time Intelligence</span>
          </motion.div>
          <h1 className="text-5xl md:text-9xl font-black tracking-tighter mb-6 leading-[0.85] text-cyber uppercase">TRACK <br />SHIPMENT.</h1>
          <p className="text-xl text-white/40 max-w-2xl mx-auto font-medium leading-relaxed">
            Instant telemetry for your global assets. Powered by the WCETAS Neural Logistics Engine.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-20">
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-emerald-500 rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass rounded-[28px] p-2 flex items-center border-white/10">
              <div className="flex-1 relative">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-white/30" />
                <input 
                  type="text" 
                  placeholder="Enter Tracking Number (e.g. WC-8829-X92)" 
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full bg-transparent py-6 pl-16 pr-8 text-xl font-bold outline-none placeholder:text-white/20"
                />
              </div>
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-cyber-pink text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-[1.02] transition-all active:scale-95 shadow-2xl glow-cyber border border-white/20 flex items-center gap-3 uppercase tracking-widest"
              >
                {isSearching ? (
                  <div className="w-6 h-6 border-4 border-black/30 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>Initiate Scan <Truck className="w-6 h-6" /></>
                )}
              </button>
            </div>
          </form>
        </div>

        {showResult && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Map Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="glass rounded-[40px] overflow-hidden border-white/10 h-[500px] relative glow-indigo">
                <MapContainer center={mockShipment.currentLocation} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <ChangeView center={mockShipment.currentLocation} />
                  <Marker position={mockShipment.currentLocation}>
                    <Popup>
                      <div className="p-2">
                        <p className="font-bold text-black">Current Location</p>
                        <p className="text-xs text-gray-600">{mockShipment.origin}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
                
                {/* Map Overlay Info */}
                <div className="absolute top-6 left-6 z-[1000] glass p-6 rounded-3xl border-white/10 max-w-xs">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
                      <Zap className="w-5 h-5 text-emerald-400 fill-current" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Live Status</p>
                      <p className="text-lg font-bold text-emerald-400">In Transit</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">Next Stop:</span>
                      <span className="font-bold">JFK Airport</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/40">ETA:</span>
                      <span className="font-bold">2.5 Hours</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipment Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-8 rounded-[32px] border-white/10">
                  <Package className="w-8 h-8 text-indigo-400 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Package Type</p>
                  <p className="text-xl font-bold">{mockShipment.type}</p>
                </div>
                <div className="glass p-8 rounded-[32px] border-white/10">
                  <Clock className="w-8 h-8 text-pink-400 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Estimated Delivery</p>
                  <p className="text-xl font-bold">{mockShipment.estimatedDelivery}</p>
                </div>
                <div className="glass p-8 rounded-[32px] border-white/10">
                  <BarChart3 className="w-8 h-8 text-emerald-400 mb-4" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">Weight</p>
                  <p className="text-xl font-bold">{mockShipment.weight}</p>
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="space-y-8">
              <div className="glass rounded-[40px] p-10 border-white/10 h-full">
                <h3 className="text-2xl font-bold mb-10 tracking-tight">Shipment History</h3>
                <div className="space-y-10 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-4 top-2 bottom-2 w-px bg-white/10"></div>
                  
                  {mockShipment.history.map((step, i) => (
                    <div key={i} className="flex gap-6 relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        step.completed ? 'bg-emerald-500 glow-emerald' : 'bg-white/5 border border-white/10'
                      }`}>
                        {step.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        ) : (
                          <div className="w-2 h-2 bg-white/20 rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h4 className={`font-bold text-lg ${step.completed ? 'text-white' : 'text-white/30'}`}>
                          {step.status}
                        </h4>
                        <p className="text-sm text-white/40 mb-1">{step.location}</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400/60">{step.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Detailed Plan & Features Section */}
        <div className="mt-40">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">Courier Excellence Plan.</h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto font-light">
              Our comprehensive suite of tools and capabilities designed for the modern global trade professional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Zap className="text-indigo-400" />,
                title: "Real-Time GPS",
                desc: "Live tracking with 1-meter precision using satellite telemetry."
              },
              {
                icon: <ShieldCheck className="text-emerald-400" />,
                title: "Proof of Delivery",
                desc: "Digital signatures and photo verification at every drop-off point."
              },
              {
                icon: <Bell className="text-pink-400" />,
                title: "Smart Alerts",
                desc: "Automated SMS, Email, and Push notifications for every status change."
              },
              {
                icon: <BarChart3 className="text-blue-400" />,
                title: "Route Optimization",
                desc: "AI-driven pathfinding to minimize fuel and maximize speed."
              },
              {
                icon: <FileText className="text-orange-400" />,
                title: "Customs Automation",
                desc: "Instant digital documentation for international trade compliance."
              },
              {
                icon: <MessageSquare className="text-purple-400" />,
                title: "24/7 Support",
                desc: "Direct access to our logistics experts via encrypted chat."
              },
              {
                icon: <Package className="text-yellow-400" />,
                title: "Inventory Sync",
                desc: "Real-time warehouse management system (WMS) integration."
              },
              {
                icon: <Truck className="text-cyan-400" />,
                title: "Fleet Management",
                desc: "Comprehensive monitoring of vehicle health and driver performance."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="glass p-10 rounded-[40px] border-white/10 group hover:border-indigo-500/30 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 border border-white/5">
                  {React.cloneElement(feature.icon as React.ReactElement, { className: "w-8 h-8" })}
                </div>
                <h4 className="text-2xl font-black mb-4 group-hover:text-cyber transition-colors tracking-tight uppercase">{feature.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

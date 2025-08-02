import React, { useState, useEffect } from 'react';
import { Package, Truck, MapPin, Clock, Search, Filter, Plus, Eye, MoreVertical, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const ShippingDashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [shipments, setShipments] = useState([
    {
      id: 'SH001',
      trackingNumber: 'TRK123456789',
      recipient: 'John Smith',
      destination: 'New York, NY',
      origin: 'Los Angeles, CA',
      status: 'in-transit',
      estimatedDelivery: '2025-07-27',
      currentLocation: 'Chicago, IL',
      weight: '2.5 kg',
      value: '$150.00',
      carrier: 'FedEx',
      progress: 65
    },
    {
      id: 'SH002',
      trackingNumber: 'TRK987654321',
      recipient: 'Sarah Johnson',
      destination: 'Miami, FL',
      origin: 'Seattle, WA',
      status: 'delivered',
      estimatedDelivery: '2025-07-25',
      currentLocation: 'Miami, FL',
      weight: '1.2 kg',
      value: '$89.50',
      carrier: 'UPS',
      progress: 100
    },
    {
      id: 'SH003',
      trackingNumber: 'TRK456789123',
      recipient: 'Mike Davis',
      destination: 'Austin, TX',
      origin: 'Boston, MA',
      status: 'pending',
      estimatedDelivery: '2025-07-28',
      currentLocation: 'Boston, MA',
      weight: '3.8 kg',
      value: '$275.00',
      carrier: 'DHL',
      progress: 15
    },
    {
      id: 'SH004',
      trackingNumber: 'TRK789123456',
      recipient: 'Emily Chen',
      destination: 'Portland, OR',
      origin: 'Atlanta, GA',
      status: 'exception',
      estimatedDelivery: '2025-07-26',
      currentLocation: 'Denver, CO',
      weight: '0.8 kg',
      value: '$45.00',
      carrier: 'USPS',
      progress: 40
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50 border-green-200';
      case 'in-transit': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'exception': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'in-transit': return <Truck className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'exception': return <AlertCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shipment.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || shipment.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const stats = [
    { label: 'Total Shipments', value: shipments.length, icon: Package, color: 'bg-blue-500' },
    { label: 'In Transit', value: shipments.filter(s => s.status === 'in-transit').length, icon: Truck, color: 'bg-orange-500' },
    { label: 'Delivered', value: shipments.filter(s => s.status === 'delivered').length, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Exceptions', value: shipments.filter(s => s.status === 'exception').length, icon: AlertCircle, color: 'bg-red-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Shipping
                </h1>
                <p className="text-sm text-gray-500">Manage your shipments and track deliveries</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Shipment</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'in-transit', 'delivered', 'exception'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                </button>
              ))}
            </div>
            <div className="flex gap-3 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search shipments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
                />
              </div>
              <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 bg-white/70">
                <Filter className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Shipments Grid */}
        <div className="grid gap-6">
          {filteredShipments.map((shipment) => (
            <div key={shipment.id} className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{shipment.trackingNumber}</h3>
                        <p className="text-gray-600">{shipment.recipient}</p>
                      </div>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(shipment.status)}`}>
                        {getStatusIcon(shipment.status)}
                        <span className="capitalize">{shipment.status.replace('-', ' ')}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <span>{shipment.origin} → {shipment.destination}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-orange-500" />
                        <span>Est. {new Date(shipment.estimatedDelivery).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Package className="w-4 h-4 text-green-500" />
                        <span>{shipment.weight} • {shipment.value}</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-500">{shipment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${shipment.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Truck className="w-4 h-4" />
                        <span>Current: {shipment.currentLocation}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{shipment.carrier}</span>
                        <button
                          onClick={() => setSelectedShipment(selectedShipment === shipment.id ? null : shipment.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedShipment === shipment.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 animate-in slide-in-from-top duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Tracking Timeline</h4>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <div className="text-sm">
                              <span className="font-medium">Package picked up</span>
                              <p className="text-gray-500">Boston, MA - Jul 23, 10:30 AM</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="text-sm">
                              <span className="font-medium">In transit</span>
                              <p className="text-gray-500">Chicago, IL - Jul 24, 2:15 PM</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <div className="text-sm">
                              <span className="font-medium text-gray-500">Out for delivery</span>
                              <p className="text-gray-400">Estimated Jul 25, 9:00 AM</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Shipment Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Service Type:</span>
                            <span className="font-medium">Express</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Insurance:</span>
                            <span className="font-medium">$500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Signature Required:</span>
                            <span className="font-medium">Yes</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reference:</span>
                            <span className="font-medium">ORD-2024-7891</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredShipments.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No shipments found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingDashboard;
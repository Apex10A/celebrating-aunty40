import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { Search, Download, Eye, Users, Calendar, Mail, Phone, Camera } from 'lucide-react';

interface RSVP {
  id: string;
  name: string;
  email: string;
  phone?: string;
  numberOfGuests: number;
  dietaryRestrictions?: string;
  message?: string;
  attending: boolean;
  hasDriver: boolean;
  guestCode?: string;
  photoUrls: string[];
  createdAt: any;
}

const AdminDashboard = () => {
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'attending' | 'not-attending'>('all');
  const [selectedRsvp, setSelectedRsvp] = useState<RSVP | null>(null);
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    try {
      const response = await fetch('/api/admin/rsvps');
      if (response.ok) {
        const data = await response.json();
        setRsvps(data.rsvps);
      }
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRsvps = rsvps.filter(rsvp => {
    const matchesSearch = rsvp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rsvp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (rsvp.guestCode && rsvp.guestCode.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'attending' && rsvp.attending) ||
                         (filter === 'not-attending' && !rsvp.attending);
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: rsvps.length,
    attending: rsvps.filter(r => r.attending).length,
    notAttending: rsvps.filter(r => !r.attending).length,
    totalGuests: rsvps.filter(r => r.attending).reduce((sum, r) => sum + r.numberOfGuests, 0),
    withPhotos: rsvps.filter(r => r.photoUrls && r.photoUrls.length > 0).length
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Attending', 'Guests', 'Guest Code', 'Has Driver', 'Dietary Restrictions', 'Message', 'Date'];
    const csvData = filteredRsvps.map(rsvp => [
      rsvp.name,
      rsvp.email,
      rsvp.phone || '',
      rsvp.attending ? 'Yes' : 'No',
      rsvp.attending ? rsvp.numberOfGuests : 0,
      rsvp.guestCode || '',
      rsvp.hasDriver ? 'Yes' : 'No',
      rsvp.dietaryRestrictions || '',
      rsvp.message || '',
      new Date(rsvp.createdAt.seconds * 1000).toLocaleDateString()
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rsvps-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const PhotoModal = ({ rsvp }: { rsvp: RSVP }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-black via-[#1a1a1a] to-black p-6 rounded-xl border border-[#FFD700]/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-decorative text-[#FFD700]">Photos from {rsvp.name}</h3>
          <button
            onClick={() => setSelectedRsvp(null)}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
        
        {rsvp.photoUrls && rsvp.photoUrls.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rsvp.photoUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Photo ${index + 1} from ${rsvp.name}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg"
                >
                  <Eye className="w-6 h-6 text-white" />
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No photos uploaded</p>
        )}
      </motion.div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black flex items-center justify-center">
        <div className="text-[#FFD700] text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - 40 & 15 Years Celebration</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-black via-[#1a1a1a] to-black p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-decorative text-4xl text-[#FFD700] mb-2">Admin Dashboard</h1>
            <p className="text-gray-300">Manage RSVPs and Event Data</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-[#FFD700]/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#FFD700]/70 text-sm">Total RSVPs</p>
                  <p className="text-2xl font-bold text-[#FFD700]">{stats.total}</p>
                </div>
                <Users className="w-8 h-8 text-[#FFD700]/50" />
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-green-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400/70 text-sm">Attending</p>
                  <p className="text-2xl font-bold text-green-400">{stats.attending}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-400/50" />
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-red-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400/70 text-sm">Not Attending</p>
                  <p className="text-2xl font-bold text-red-400">{stats.notAttending}</p>
                </div>
                <Mail className="w-8 h-8 text-red-400/50" />
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-blue-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400/70 text-sm">Total Guests</p>
                  <p className="text-2xl font-bold text-blue-400">{stats.totalGuests}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400/50" />
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-purple-500/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-400/70 text-sm">With Photos</p>
                  <p className="text-2xl font-bold text-purple-400">{stats.withPhotos}</p>
                </div>
                <Camera className="w-8 h-8 text-purple-400/50" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD700]/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, email, or guest code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 bg-black/50 border border-[#FFD700]/20 rounded-lg text-white focus:border-[#FFD700] focus:ring-1 focus:ring-[#FFD700] transition-all"
            >
              <option value="all">All RSVPs</option>
              <option value="attending">Attending</option>
              <option value="not-attending">Not Attending</option>
            </select>

            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFD700]/90 transition-all"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          {/* RSVP Table */}
          <div className="bg-black/50 backdrop-blur-sm rounded-xl border border-[#FFD700]/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FFD700]/10">
                  <tr>
                    <th className="text-left p-4 text-[#FFD700] font-medium">Name</th>
                    <th className="text-left p-4 text-[#FFD700] font-medium">Email</th>
                    <th className="text-left p-4 text-[#FFD700] font-medium">Status</th>
                    <th className="text-left p-4 text-[#FFD700] font-medium">Guests</th>
                    <th className="text-left p-4 text-[#FFD700] font-medium">Code</th>
                    <th className="text-left p-4 text-[#FFD700] font-medium">Photos</th>
                    <th className="text-left p-4 text-[#FFD700] font-medium">Date</th>
                    <th className="text-left p-4 text-[#FFD700] font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="border-t border-[#FFD700]/10 hover:bg-[#FFD700]/5">
                      <td className="p-4 text-white">{rsvp.name}</td>
                      <td className="p-4 text-gray-300">{rsvp.email}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          rsvp.attending 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {rsvp.attending ? 'Attending' : 'Not Attending'}
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">{rsvp.attending ? rsvp.numberOfGuests : '-'}</td>
                      <td className="p-4 text-[#FFD700] font-mono text-sm">{rsvp.guestCode || '-'}</td>
                      <td className="p-4">
                        {rsvp.photoUrls && rsvp.photoUrls.length > 0 ? (
                          <span className="text-purple-400">{rsvp.photoUrls.length} photos</span>
                        ) : (
                          <span className="text-gray-500">No photos</span>
                        )}
                      </td>
                      <td className="p-4 text-gray-300">
                        {new Date(rsvp.createdAt.seconds * 1000).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => setSelectedRsvp(rsvp)}
                          className="text-[#FFD700] hover:text-[#FFD700]/80 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRsvps.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No RSVPs found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedRsvp && <PhotoModal rsvp={selectedRsvp} />}
    </>
  );
};

export default AdminDashboard;
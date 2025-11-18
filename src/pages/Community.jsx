import React, { useState } from 'react'
import { Trophy, Users, Calendar, Gamepad2, X, Check, MapPin, Zap, Crown, ChevronDown, ChevronUp, DollarSign } from 'lucide-react'

export default function Community() {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState('')
  const [showCreateEventModal, setShowCreateEventModal] = useState(false)
  const [eventType, setEventType] = useState('')
  const [joinedEvents, setJoinedEvents] = useState(new Set())
  const [showAllEvents, setShowAllEvents] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    sport: '',
    date: '',
    location: '',
    maxParticipants: '',
    entryFee: '', // Tambah field biaya masuk
    prize: ''
  })

  // State untuk events yang dibuat user
  const [userCreatedEvents, setUserCreatedEvents] = useState([])

  const defaultEvents = [
    {
      id: 1,
      title: "Liga Futsal Mingguan",
      sport: "Futsal",
      date: "Nov 22, 2024",
      participants: 24,
      maxParticipants: 32,
      prize: "Trophy + Rp 2.000.000",
      location: "GOR Senayan, Jakarta",
      entryFee: "Rp 100.000", // Biaya per orang
      feeType: "tournament",
      color: "from-green-500 to-emerald-500",
      createdBy: "system"
    },
    {
      id: 2,
      title: "Badminton Championship",
      sport: "Badminton",
      date: "Nov 23, 2024",
      participants: 45,
      maxParticipants: 64,
      prize: "Trophy + Rp 5.000.000",
      location: "Istora Senayan, Jakarta",
      entryFee: "Rp 150.000",
      feeType: "tournament",
      color: "from-emerald-500 to-teal-500",
      createdBy: "system"
    },
    {
      id: 3,
      title: "Basketball 3x3 Tournament",
      sport: "Basketball",
      date: "Nov 25, 2024",
      participants: 16,
      maxParticipants: 16,
      prize: "Trophy + Rp 3.000.000",
      location: "Lapangan Basket Gelora Bung Karno",
      entryFee: "Rp 200.000",
      feeType: "tournament",
      color: "from-teal-500 to-cyan-500",
      createdBy: "system"
    },
    {
      id: 4,
      title: "Tennis Open Series",
      sport: "Tennis",
      date: "Nov 30, 2024",
      participants: 28,
      maxParticipants: 32,
      prize: "Trophy + Rp 4.000.000",
      location: "Senayan Tennis Court",
      entryFee: "Rp 250.000",
      feeType: "tournament",
      color: "from-cyan-500 to-blue-500",
      createdBy: "system"
    },
    {
      id: 5,
      title: "Weekend Badminton Gathering",
      sport: "Badminton",
      date: "Nov 24, 2024",
      participants: 12,
      maxParticipants: 20,
      prize: "Fun & Networking",
      location: "Badminton Court Kemang",
      entryFee: "Rp 75.000",
      feeType: "gathering",
      color: "from-blue-500 to-indigo-500",
      createdBy: "system"
    }
  ]

  // Gabungkan default events dengan user created events
  const allEvents = [...defaultEvents, ...userCreatedEvents]

  // Tampilkan hanya 2 event pertama, kecuali jika showAllEvents true
  const displayedEvents = showAllEvents ? allEvents : allEvents.slice(0, 2)

  const handleJoinEvent = (event) => {
    if (event.participants >= event.maxParticipants) {
      setNotificationMessage('Event sudah penuh!')
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 2000)
      return
    }

    setJoinedEvents(prev => new Set([...prev, event.id]))
    setNotificationMessage(`Berhasil join ${event.title}! Biaya: ${event.entryFee}`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  const handleCreateEvent = (type) => {
    setEventType(type)
    setShowCreateEventModal(true)
  }

  const handleSubmitEvent = () => {
    if (!formData.name || !formData.sport || !formData.date || !formData.location || !formData.maxParticipants || !formData.entryFee) {
      setNotificationMessage('Harap isi semua field yang wajib!')
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 2000)
      return
    }

    // Validasi biaya masuk
    if (!formData.entryFee.match(/^Rp\s?\d+\.?\d*/)) {
      setNotificationMessage('Format biaya masuk harus seperti: Rp 100.000')
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 2000)
      return
    }

    // Generate ID baru untuk event
    const newEventId = Date.now()
    
    // Format date untuk display
    const formattedDate = new Date(formData.date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })

    // Tentukan warna berdasarkan sport
    const getColorBySport = (sport) => {
      const colorMap = {
        'futsal': 'from-green-500 to-emerald-500',
        'badminton': 'from-emerald-500 to-teal-500',
        'basketball': 'from-teal-500 to-cyan-500',
        'tennis': 'from-cyan-500 to-blue-500',
        'voli': 'from-blue-500 to-indigo-500',
        'Tenis Meja': 'from-indigo-500 to-purple-500',
        'Padel': 'from-purple-500 to-pink-500',
        'Golf': 'from-pink-500 to-rose-500',
        'Renang': 'from-rose-500 to-red-500',
        'Sepak Bola': 'from-red-500 to-orange-500',
        'Rock Climbing': 'from-orange-500 to-amber-500'
      }
      return colorMap[sport.toLowerCase()] || 'from-green-500 to-emerald-500'
    }

    // Buat event object baru
    const newEvent = {
      id: newEventId,
      title: formData.name,
      sport: formData.sport.charAt(0).toUpperCase() + formData.sport.slice(1),
      date: formattedDate,
      participants: 1, // Creator otomatis join
      maxParticipants: parseInt(formData.maxParticipants),
      prize: eventType === 'tournament' ? (formData.prize || "Trophy + Hadiah Menarik") : "Fun & Networking",
      location: formData.location,
      entryFee: formData.entryFee,
      feeType: eventType,
      color: getColorBySport(formData.sport),
      createdBy: "user",
      isUserCreated: true,
      rawDate: formData.date // Simpan untuk sorting
    }

    // Tambahkan event baru ke state
    setUserCreatedEvents(prev => [newEvent, ...prev])
    
    // Auto join event yang dibuat
    setJoinedEvents(prev => new Set([...prev, newEventId]))

    // Reset form dan close modal
    setShowCreateEventModal(false)
    setFormData({ name: '', sport: '', date: '', location: '', maxParticipants: '', entryFee: '', prize: '' })
    
    // Show success notification
    setNotificationMessage(`${eventType === 'tournament' ? 'Tournament' : 'Gathering'} "${formData.name}" berhasil dibuat!`)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  // Format biaya untuk placeholder
  const getFeePlaceholder = (sport, type) => {
    const feeMap = {
      'futsal': type === 'tournament' ? 'Rp 100.000' : 'Rp 50.000',
      'badminton': type === 'tournament' ? 'Rp 150.000' : 'Rp 75.000',
      'basketball': type === 'tournament' ? 'Rp 200.000' : 'Rp 100.000',
      'tennis': type === 'tournament' ? 'Rp 250.000' : 'Rp 125.000',
      'voli': type === 'tournament' ? 'Rp 120.000' : 'Rp 60.000',
      'Tenis Meja': type === 'tournament' ? 'Rp 80.000' : 'Rp 40.000',
      'Padel': type === 'tournament' ? 'Rp 180.000' : 'Rp 90.000',
      'Golf': type === 'tournament' ? 'Rp 300.000' : 'Rp 150.000',
      'Renang': type === 'tournament' ? 'Rp 100.000' : 'Rp 50.000',
      'Sepak Bola': type === 'tournament' ? 'Rp 250.000' : 'Rp 125.000',
      'Rock Climbing': type === 'tournament' ? 'Rp 120.000' : 'Rp 60.000'
    }
    return feeMap[sport] || (type === 'tournament' ? 'Rp 100.000' : 'Rp 50.000')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-4 md:p-8">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in slide-in-from-top">
            <div className="bg-white/20 p-2 rounded-full">
              <Check className="h-5 w-5" />
            </div>
            <p className="font-medium">{notificationMessage}</p>
          </div>
        </div>
      )}

      {showCreateEventModal && (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="w-full max-w-md max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
      <div className="flex-shrink-0 bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Buat {eventType === 'tournament' ? 'Tournament' : 'Gathering'}</h3>
          <button 
            onClick={() => setShowCreateEventModal(false)}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Nama Event *</label>
            <input
              type="text"
              placeholder="Masukkan nama event"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Olahraga *</label>
            <select 
              value={formData.sport}
              onChange={(e) => setFormData({...formData, sport: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
            >
              <option value="">Pilih olahraga</option>
              <option value="futsal">Futsal</option>
              <option value="badminton">Badminton</option>
              <option value="basketball">Basketball</option>
              <option value="tennis">Tennis</option>
              <option value="voli">Voli</option>
              <option value="Tenis Meja">Tenis Meja</option>
              <option value="Padel">Padel</option>
              <option value="Golf">Golf</option>
              <option value="Renang">Renang</option>
              <option value="Sepak Bola">Sepak Bola</option>
              <option value="Rock Climbing">Rock Climbing</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Tanggal *</label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Lokasi *</label>
            <input
              type="text"
              placeholder="Masukkan lokasi"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Maksimal Peserta *</label>
            <input
              type="number"
              min="4"
              max="100"
              placeholder="16"
              value={formData.maxParticipants}
              onChange={(e) => setFormData({...formData, maxParticipants: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
            />
          </div>
          
          {/* Biaya Masuk */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Biaya Masuk per Orang *
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={getFeePlaceholder(formData.sport, eventType)}
                value={formData.entryFee}
                onChange={(e) => setFormData({...formData, entryFee: e.target.value})}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Format: Rp 100.000 (per orang)
            </p>
          </div>

          {eventType === 'tournament' && (
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Prize Pool *</label>
              <input
                type="text"
                placeholder="Trophy + Rp 1.000.000"
                value={formData.prize}
                onChange={(e) => setFormData({...formData, prize: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
              />
            </div>
          )}
        </div>
      </div>
      
      <div className="flex-shrink-0 border-t border-gray-200 p-6 bg-white">
        <div className="flex gap-3">
          <button 
            onClick={handleSubmitEvent}
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg transition-all"
          >
            Buat Event
          </button>
          <button 
            onClick={() => setShowCreateEventModal(false)} 
            className="flex-1 border-2 border-gray-300 hover:bg-gray-50 font-semibold py-3 rounded-xl transition-all"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  </div>
)}

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
              <div className="p-8 md:p-12 relative">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Community & Events 🏆</h1>
                <p className="text-white/90 text-lg md:text-xl mb-6">Bergabung dengan turnamen dan event seru di Jakarta!</p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                    <p className="text-white font-semibold">{allEvents.length} Active Events</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                    <p className="text-white font-semibold">12.5K Members</p>
                  </div>
                  {userCreatedEvents.length > 0 && (
                    <div className="bg-yellow-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-yellow-300/30">
                      <p className="text-yellow-200 font-semibold">{userCreatedEvents.length} Event Anda</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Events */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Active Events {!showAllEvents && `(${displayedEvents.length}/${allEvents.length})`}
                </h3>
                <button 
                  className="text-green-600 hover:text-green-700 font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                  onClick={() => setShowAllEvents(!showAllEvents)}
                >
                  {showAllEvents ? 'Show Less' : `View All Events (${allEvents.length})`}
                  {showAllEvents ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {displayedEvents.map(event => {
                  const isFull = event.participants >= event.maxParticipants
                  const isJoined = joinedEvents.has(event.id)
                  const progress = (event.participants / event.maxParticipants) * 100
                  const isUserCreated = event.isUserCreated
                  const isTournament = event.feeType === 'tournament'
                  
                  return (
                    <div key={event.id} className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:scale-[1.02] overflow-hidden group border-2 ${
                      isUserCreated ? 'border-yellow-300' : 'border-gray-100'
                    } relative`}>
                      {isUserCreated && (
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-gradient-to-r from-yellow-400 to-amber-400 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            Event Anda
                          </div>
                        </div>
                      )}
                      <div className={`h-2 bg-gradient-to-r ${event.color}`}></div>
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className={`hidden md:block w-24 h-24 bg-gradient-to-br ${event.color} rounded-2xl flex-shrink-0 relative overflow-hidden group-hover:scale-110 transition-transform`}>
                            <div className="absolute inset-0 flex items-center justify-center">
                              {isTournament ? (
                                <Trophy className="w-12 h-12 text-white" />
                              ) : (
                                <Users className="w-12 h-12 text-white" />
                              )}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
                              <div>
                                <h4 className="text-2xl font-bold mb-2 text-gray-800">{event.title}</h4>
                                <div className="flex items-center gap-2">
                                  <span className={`inline-block px-4 py-1.5 bg-gradient-to-r ${event.color} text-white rounded-full text-sm font-semibold shadow-md`}>
                                    {event.sport}
                                  </span>
                                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                    isTournament 
                                      ? 'bg-gradient-to-r from-yellow-400 to-amber-400 text-white' 
                                      : 'bg-gradient-to-r from-blue-400 to-indigo-400 text-white'
                                  }`}>
                                    {isTournament ? '🏆 Tournament' : '👥 Gathering'}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                                <Calendar className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-semibold text-green-600">{event.date}</span>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl">
                                <MapPin className="w-5 h-5 text-green-500" />
                                <span className="font-medium">{event.location}</span>
                              </div>
                              
                              <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-gray-600 font-medium">Participants</span>
                                  <span className={`font-bold text-lg ${isFull ? 'text-red-600' : 'text-green-600'}`}>
                                    {event.participants}/{event.maxParticipants}
                                  </span>
                                </div>
                                <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className={`absolute left-0 top-0 h-full bg-gradient-to-r ${event.color} rounded-full transition-all duration-1000`}
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              {/* Event Type Section */}
                              <div className={`rounded-xl p-4 border-2 ${
                                isTournament 
                                  ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200' 
                                  : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                              }`}>
                                <div className="flex items-center gap-2 mb-1">
                                  {isTournament ? (
                                    <Trophy className="w-5 h-5 text-yellow-600" />
                                  ) : (
                                    <Users className="w-5 h-5 text-blue-600" />
                                  )}
                                  <span className={`font-bold ${
                                    isTournament ? 'text-yellow-900' : 'text-blue-900'
                                  }`}>
                                    {isTournament ? 'Prize Pool' : 'Event Type'}
                                  </span>
                                </div>
                                <p className={`font-bold text-lg ${
                                  isTournament ? 'text-yellow-800' : 'text-blue-800'
                                }`}>
                                  {event.prize}
                                </p>
                              </div>
                              
                              {/* Biaya Masuk Section */}
                              <div className="flex items-center justify-between bg-green-50 p-3 rounded-xl border border-green-200">
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-green-600" />
                                  <span className="text-gray-700 font-medium">Biaya Masuk:</span>
                                </div>
                                <span className="font-bold text-green-600 text-lg">{event.entryFee} / orang</span>
                              </div>
                            </div>
                            
                            <button 
                              className={`w-full mt-4 py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                                isJoined 
                                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                                  : isFull 
                                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                                    : `bg-gradient-to-r ${event.color} text-white hover:shadow-xl hover:scale-[1.02]`
                              }`}
                              disabled={isFull || isJoined}
                              onClick={() => handleJoinEvent(event)}
                            >
                              {isJoined ? '✓ Sudah Terdaftar' : isFull ? 'Event Penuh' : `Join Event - ${event.entryFee}`}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Create Event */}
            <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-2xl shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-24 -mt-24"></div>
              <div className="p-8 relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/20 p-2 rounded-full">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Buat Event Sendiri</h3>
                </div>
                <p className="text-white/90 mb-6 text-lg">Organize your own tournament and invite the community!</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    className="h-14 bg-white text-green-600 hover:bg-green-50 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:scale-105"
                    onClick={() => handleCreateEvent('tournament')}
                  >
                    <Gamepad2 className="w-6 h-6" />
                    Buat Tournament
                  </button>
                  <button 
                    className="h-14 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 rounded-xl font-bold text-lg border-2 border-white/30 transition-all flex items-center justify-center gap-2 hover:scale-105"
                    onClick={() => handleCreateEvent('gathering')}
                  >
                    <Users className="w-6 h-6" />
                    Buat Gathering
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Community Activity */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="border-b bg-gradient-to-r from-gray-50 to-white p-6">
                <h3 className="flex items-center gap-3 text-2xl font-bold">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  Recent Activity
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { user: "Ahmad", action: "won Liga Futsal Mingguan", time: "2 hours ago", avatar: "A", color: "from-green-500 to-emerald-500" },
                    { user: "Sarah", action: "joined Badminton Gathering", time: "4 hours ago", avatar: "S", color: "from-emerald-500 to-teal-500" },
                    { user: "Kevin", action: "created new Basketball Tournament", time: "6 hours ago", avatar: "K", color: "from-teal-500 to-cyan-500" },
                    { user: "Diana", action: "achieved 'Community Builder' badge", time: "8 hours ago", avatar: "D", color: "from-cyan-500 to-blue-500" }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border-2 border-gray-100 rounded-xl hover:shadow-md hover:border-green-200 transition-all group">
                      <div className={`w-12 h-12 bg-gradient-to-br ${activity.color} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-110 transition-transform`}>
                        {activity.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          <span className="text-green-600">{activity.user}</span> {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 p-6">
                <h3 className="flex items-center gap-3 text-2xl font-bold text-white">
                  <Crown className="w-7 h-7" />
                  Weekly Leaderboard
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {[
                    { rank: 1, name: "SEBA", points: 2450, avatar: "SD", medal: "🥇" },
                    { rank: 2, name: "Jemes", points: 2280, avatar: "JT", medal: "🥈" },
                    { rank: 3, name: "Jose Austin", points: 2100, avatar: "JA", medal: "🥉" },
                    { rank: 4, name: "You (Fred K.)", points: 1750, avatar: "FK", isYou: true }
                  ].map(player => (
                    <div key={player.rank} className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                      player.isYou 
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 shadow-md' 
                        : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                    }`}>
                      <div className="text-2xl">
                        {player.medal || `#${player.rank}`}
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md ${
                        player.isYou 
                          ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
                          : 'bg-gradient-to-br from-gray-500 to-gray-600'
                      }`}>
                        {player.avatar}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold ${player.isYou ? 'text-green-600' : 'text-gray-800'}`}>{player.name}</p>
                      </div>
                      <p className="font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{player.points} pts</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community Stats */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="border-b bg-gradient-to-r from-gray-50 to-white p-6">
                <h3 className="flex items-center gap-3 text-xl font-bold">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  Community Stats
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Total Members</span>
                  <span className="font-bold text-xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">12,547</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-emerald-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Active Events</span>
                  <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">{allEvents.length}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-teal-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Games This Week</span>
                  <span className="font-bold text-xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">1,432</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-amber-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Your Rank</span>
                  <span className="px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full">#142</span>
                </div>
              </div>
            </div>

            {/* My Events */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="border-b bg-gradient-to-r from-gray-50 to-white p-6">
                <h3 className="flex items-center gap-3 text-xl font-bold">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  My Events
                </h3>
              </div>
              <div className="p-6 space-y-3">
                {userCreatedEvents.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500">Belum ada event yang dibuat</p>
                    <button 
                      onClick={() => handleCreateEvent('tournament')}
                      className="mt-2 text-green-600 hover:text-green-700 font-medium"
                    >
                      Buat event pertama Anda!
                    </button>
                  </div>
                ) : (
                  userCreatedEvents.slice(0, 3).map((event, index) => (
                    <div key={event.id} className="p-4 border-2 border-green-200 rounded-xl hover:shadow-md hover:border-green-300 transition-all bg-green-50">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold text-gray-800">{event.title}</p>
                        <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-xs font-bold">
                          Creator
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-green-500" />
                        {event.date}
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">{event.participants}/{event.maxParticipants} peserta</span>
                        <span className="text-green-600 font-semibold">{event.entryFee}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
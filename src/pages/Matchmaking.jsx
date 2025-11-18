import React, { useState, useRef, useEffect } from "react"
import PreferencesEditor from "../components/MatchingPreference/PreferencesEditor"
import { MessageCircle, User, Zap, Trophy, Calendar, MapPin, Star } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { matchProfiles } from '../data/mockData'

// ChatModal Component
function ChatModal({ open, onClose, match, messages, onSendMessage }) {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)

  // Auto scroll ke bawah ketika ada pesan baru
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Function untuk kirim pesan
  const sendMessage = () => {
    if (inputMessage.trim() === '') return

    onSendMessage(inputMessage)
    setInputMessage('')
  }

  // Function untuk handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  // Format waktu
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!open || !match) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md h-[600px] flex flex-col shadow-2xl border-0">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold text-lg">{match.name[0]}</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">{match.name}</h3>
                <p className="text-green-100 text-sm">Online • {match.sport}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors backdrop-blur-sm"
            >
              <span className="text-white text-lg">✕</span>
            </button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-green-50 to-emerald-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-green-500" />
              </div>
              <p className="font-medium text-gray-600">Mulai percakapan dengan {match.name}</p>
              <p className="text-sm text-gray-500 mt-1">Kirim pesan untuk memulai chat</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                      message.isUser
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-br-none'
                        : 'bg-white border border-green-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.isUser ? 'text-green-100' : 'text-gray-400'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Input Message */}
        <div className="p-6 border-t bg-white rounded-b-2xl">
          <div className="flex space-x-3">
            <input 
              type="text" 
              placeholder="Ketik pesan..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
            />
            <button 
              onClick={sendMessage}
              disabled={inputMessage.trim() === ''}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-emerald-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
            >
              Kirim
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Matchmaking Component
export default function Matchmaking() {
  const [chatOpen, setChatOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [selectedSports, setSelectedSports] = useState(["Futsal", "Badminton", "Basketball"])
  const [selectedLevel, setSelectedLevel] = useState("intermediate")
  const [maxDistance, setMaxDistance] = useState(5)
  
  // State untuk simpan semua chat history per user
  const [chatHistories, setChatHistories] = useState({})

  const formatDistance = (km) => {
    if (km < 1) {
      return `${Math.round(km * 1000)} m`
    }
    return `${km} km`
  }

  const openChatWithMatch = (match) => {
    console.log('opening chat with:', match.name)
    setSelectedMatch(match)
    setChatOpen(true)
    
    // Initialize chat history kalo belum ada
    if (!chatHistories[match.id]) {
      setChatHistories(prev => ({
        ...prev,
        [match.id]: []
      }))
    }
  }

  const handleSendMessage = (messageText) => {
    if (!selectedMatch) return

    const newMessage = {
      id: Date.now(),
      text: messageText,
      timestamp: new Date(),
      isUser: true
    }

    // Update chat history untuk user yang sedang dipilih
    setChatHistories(prev => ({
      ...prev,
      [selectedMatch.id]: [...(prev[selectedMatch.id] || []), newMessage]
    }))

    // Auto reply dari match setelah 1 detik
    setTimeout(() => {
      const autoReply = {
        id: Date.now() + 1,
        text: `Halo! Terima kasih sudah menghubungi ${selectedMatch?.name}. Saya akan membalas pesan Anda segera.`,
        timestamp: new Date(),
        isUser: false
      }
      
      setChatHistories(prev => ({
        ...prev,
        [selectedMatch.id]: [...(prev[selectedMatch.id] || []), autoReply]
      }))
    }, 1000)
  }

  const viewProfile = (match) => {
    window.location.href = `/profile/${match.id}`
  }

  // Dapatkan messages untuk user yang sedang dipilih
  const currentMessages = selectedMatch ? chatHistories[selectedMatch.id] || [] : []

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-8 text-white shadow-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Cari Teman Sparing 🤝</h1>
                <p className="text-green-100 text-lg max-w-2xl mx-auto">
                  Temukan lawan atau partner olahraga yang sesuai dengan preferensi dan jadwal Anda!
                </p>
              </div>
            </div>

            {/* Current Match */}
            {matchProfiles.length > 0 && (
              <Card className="overflow-hidden rounded-2xl shadow-2xl border-0 max-w-4xl mx-auto">
                <div className="relative">
                  <div className="h-72 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Avatar className="w-36 h-36 border-6 border-white shadow-2xl">
                      <AvatarImage src={matchProfiles[0].avatar} />
                      <AvatarFallback className="text-3xl bg-gradient-to-br from-yellow-400 to-amber-400 text-white">
                        {matchProfiles[0].name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <Badge className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-amber-400 text-white text-lg px-5 py-2.5 rounded-full shadow-lg border-0">
                    {matchProfiles[0].matchScore}% Match
                  </Badge>
                </div>
                <CardContent className="p-8 mt-3 text-center">
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {matchProfiles[0].name}, {matchProfiles[0].age}
                  </h2>
                  <p className="text-gray-600 mb-3 text-lg font-medium">{matchProfiles[0].sport} • {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</p>
                  <p className="text-gray-500 mb-4 flex items-center justify-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Jakarta Barat • {formatDistance(2.5)} dari Anda
                  </p>
                  <p className="mb-6 text-gray-700 text-lg italic">"Play hard, stay humble. Because when you trust the pass, you trust the team!"</p>
                  <div className="flex gap-4 justify-center">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="rounded-xl px-8 py-3 border-2 border-green-300 hover:border-green-400 hover:bg-green-50 transition-all"
                      onClick={() => viewProfile(matchProfiles[0])}
                    >
                      <User className="w-6 h-6 mr-2" />
                      Lihat Detail
                    </Button>
                    <Button 
                      size="lg" 
                      className="rounded-xl px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all"
                      onClick={() => openChatWithMatch(matchProfiles[0])}
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Chat Sekarang
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Match Queue */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Matches Selanjutnya
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {matchProfiles.slice(1).map(profile => (
                  <Card key={profile.id} className="text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-green-300 rounded-2xl">
                    <CardContent className="p-6">
                      <Avatar className="w-20 h-20 mx-auto mb-4 border-4 border-green-100">
                        <AvatarImage src={profile.avatar} />
                        <AvatarFallback className="text-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                          {profile.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="text-lg font-bold mb-1">{profile.name}</h4>
                      <p className="text-gray-600 mb-2">{profile.sport} • {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</p>
                      <Badge className="mb-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                        {profile.matchScore}% Match
                      </Badge>
                      <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Jakarta
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 transition-all"
                        onClick={() => viewProfile(profile)}
                      >
                        Lihat Profile
                      </Button>
                    </CardContent>
                  </Card>
                ))}
                
                {[
                  { 
                    id: "kael-1",
                    name: "Kael", 
                    sport: "Badminton", 
                    date: "21 Nov 2024", 
                    day: "Jumat", 
                    time: "19:00 WIB",
                    matchScore: 78,
                    avatar: null
                  },
                  { 
                    id: "edward-1",
                    name: "Edward", 
                    sport: "Futsal", 
                    date: "22 Nov 2024", 
                    day: "Sabtu", 
                    time: "16:30 WIB",
                    matchScore: 85,
                    avatar: null
                  },
                  { 
                    id: "dustin-1", 
                    name: "Dustin", 
                    sport: "Basketball", 
                    date: "23 Nov 2024", 
                    day: "Minggu", 
                    time: "14:00 WIB",
                    matchScore: 72,
                    avatar: null
                  },
                ].map((match) => (
                  <Card key={match.id} className="text-center hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-green-200 rounded-2xl">
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <Avatar className="w-20 h-20 mx-auto border-4 border-green-100">
                          {match.avatar ? (
                            <AvatarImage src={match.avatar} />
                          ) : (
                            <AvatarFallback className="text-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                              {match.name[0]}
                            </AvatarFallback>
                          )}
                        </Avatar>
                      </div>
                      
                      <h4 className="text-lg font-bold mb-1">{match.name}</h4>
                      <p className="text-gray-600 mb-2">{match.sport} • Intermediate</p>
                      <Badge className="mb-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                        {match.matchScore}% Match
                      </Badge>
                      
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 mb-4 border border-green-200">
                        <p className="text-sm font-bold text-green-800">{match.day}</p>
                        <p className="text-sm text-green-600">{match.date}</p>
                        <p className="text-sm font-semibold text-green-800">{match.time}</p>
                      </div>
                      
                      <p className="text-sm text-gray-500 mb-4 flex items-center justify-center gap-1">
                        <MapPin className="w-3 h-3" />
                        Jakarta
                      </p>
                      
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full border-green-300 text-green-600 hover:bg-green-50 hover:border-green-400 transition-all"
                          onClick={() => viewProfile(match)}
                        >
                          Lihat Detail
                        </Button>
                        <Button 
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all"
                          onClick={() => openChatWithMatch(match)}
                        >
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Chat
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preferences */}
            <Card className="rounded-2xl shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-t-2xl">
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Preferensi Matching
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 mt-3 space-y-6">
                <div>
                  <label className="text-sm font-semibold mb-3 block text-gray-700">Olahraga Favorit</label>
                  <div className="flex gap-2 flex-wrap">
                    {selectedSports.map(sport => (
                      <Badge key={sport} variant="outline" className="py-2 px-3 bg-green-50 text-green-700 border-green-200 font-medium">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-3 block text-gray-700">Level Skill</label>
                  <Badge className="py-2 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 font-medium capitalize">
                    {selectedLevel}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-3 block text-gray-700">Jarak Maksimal</label>
                  <Badge className="py-2 px-4 bg-green-100 text-green-700 border-green-200 font-medium">
                    {formatDistance(maxDistance)}
                  </Badge>
                </div>
                <PreferencesEditor 
                  selectedSports={selectedSports}
                  setSelectedSports={setSelectedSports}
                  selectedLevel={selectedLevel}
                  setSelectedLevel={setSelectedLevel}
                  maxDistance={maxDistance}
                  setMaxDistance={setMaxDistance}
                />
              </CardContent>
            </Card>

            {/* Match History */}
            <Card className="rounded-2xl shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-500" />
                  Recent Matches
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 mt-4 space-y-4">
                {[
                  { name: "Hasta", sport: "Futsal", status: "Played", score: "85%" },
                  { name: "Kael", sport: "Badminton", status: "Scheduled", score: "78%" },
                  { name: "Dustin", sport: "Basketball", status: "Cancelled", score: "65%" }
                ]
                .filter(match => match.status !== 'Scheduled')
                .map((match, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-2 border-green-100 rounded-xl bg-white hover:bg-green-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{match.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{match.name}</p>
                        <p className="text-xs text-gray-600">{match.sport} • {match.score}</p>
                      </div>
                    </div>
                    <Badge 
                      className={`font-medium ${
                        match.status === 'Played' 
                          ? 'bg-green-500 hover:bg-green-600 text-white' 
                          : 'bg-red-500 hover:bg-red-600 text-white'
                      }`}
                    >
                      {match.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="rounded-2xl shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-white border-b">
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Match Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 mt-4 space-y-4">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Total Matches</span>
                  <span className="text-2xl font-bold text-green-600">24</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Success Rate</span>
                  <span className="text-2xl font-bold text-blue-600">85%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl">
                  <span className="text-gray-700 font-medium">Avg. Match Score</span>
                  <span className="text-2xl font-bold text-purple-600">78%</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Modal */}
          <ChatModal 
            open={chatOpen} 
            onClose={() => {
              setChatOpen(false)
              setSelectedMatch(null)
            }} 
            match={selectedMatch}
            messages={currentMessages}
            onSendMessage={handleSendMessage}
          />
        </div>
      </div>
    </div>
  )
}
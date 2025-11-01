import React, { useState, useRef, useEffect } from "react"
import PreferencesEditor from "../components/MatchingPreference/PreferencesEditor"
import { MessageCircle, User } from 'lucide-react'
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">{match.name[0]}</span>
              </div>
              <div>
                <h3 className="font-semibold">{match.name}</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p>Mulai percakapan dengan {match.name}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isUser
                        ? 'bg-green-500 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
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
        <div className="p-4 border-t bg-white">
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Ketik pesan..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button 
              onClick={sendMessage}
              disabled={inputMessage.trim() === ''}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
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
    window.location.href = `/profile/${match.name.toLowerCase()}`
  }

  // Dapatkan messages untuk user yang sedang dipilih
  const currentMessages = selectedMatch ? chatHistories[selectedMatch.id] || [] : []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-3">Cari Teman Sparing 🤝</h1>
          <p className="text-gray-600 text-lg">Temukan lawan atau partner olahraga yang sesuai!</p>
        </div>

        {/* Current Match */}
        {matchProfiles.length > 0 && (
          <Card className="overflow-hidden max-w-2xl mx-auto">
            <div className="relative">
              <div className="h-64 bg-gradient-to-b from-green-400 to-green-600"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Avatar className="w-32 h-32 border-6 border-white">
                  <AvatarImage src={matchProfiles[0].avatar} />
                  <AvatarFallback className="text-2xl">{matchProfiles[0].name[0]}</AvatarFallback>
                </Avatar>
              </div>
              <Badge className="absolute top-6 right-6 bg-green-500 text-lg px-4 py-2">
                {matchProfiles[0].matchScore}% Match
              </Badge>
            </div>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl mb-2">{matchProfiles[0].name}, {matchProfiles[0].age}</h2>
              <p className="text-gray-600 mb-3 text-lg">{matchProfiles[0].sport} • {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</p>
              <p className="text-gray-500 mb-3">📍 Jakarta</p>
              <p className="mb-6 text-gray-700">Play hard, stay humble. Because when you trust the pass, you trust the team!</p>
              <div className="flex gap-4 justify-center">
                {/* GANTI HEART DENGAN LIHAT DETAIL */}
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-8"
                  onClick={() => viewProfile(matchProfiles[0])}
                >
                  <User className="w-6 h-6 mr-2" />
                  Lihat Detail
                </Button>
                <Button 
                  size="lg" 
                  className="rounded-full px-8" 
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
        <div>
          <h3 className="text-xl mb-6">Matches Selanjutnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {matchProfiles.slice(1).map(profile => (
              <Card key={profile.id} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <Avatar className="w-20 h-20 mx-auto mb-4">
                    <AvatarImage src={profile.avatar} />
                    <AvatarFallback className="text-lg">{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <h4 className="text-lg mb-1">{profile.name}</h4>
                  <p className="text-gray-600 mb-2">{profile.sport} • {selectedLevel.charAt(0).toUpperCase() + selectedLevel.slice(1)}</p>
                  <Badge variant="outline" className="mb-3">
                    {profile.matchScore}% Match
                  </Badge>
                  <p className="text-sm text-gray-500 mb-4">📍 Jakarta</p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => viewProfile(profile)}
                  >
                    Lihat Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
            
            {/* Scheduled Matches dengan tanggal & jam */}
            {[
              { 
                id: "kael-1",
                name: "Kael", 
                sport: "Badminton", 
                date: "15 Nov 2024", 
                day: "Jumat", 
                time: "19:00 WIB",
                matchScore: 78,
                avatar: "/api/placeholder/80/80"
              },
              { 
                id: "rizky-1",
                name: "Rizky", 
                sport: "Futsal", 
                date: "16 Nov 2024", 
                day: "Sabtu", 
                time: "16:30 WIB",
                matchScore: 85,
                avatar: null
              },
              { 
                id: "andi-1", 
                name: "Andi", 
                sport: "Basketball", 
                date: "17 Nov 2024", 
                day: "Minggu", 
                time: "14:00 WIB",
                matchScore: 72,
                avatar: null
              }
            ].map((match) => (
              <Card key={match.id} className="text-center hover:shadow-lg transition-shadow cursor-pointer border-blue-200">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <Avatar className="w-20 h-20 mx-auto">
                      {match.avatar ? (
                        <AvatarImage src={match.avatar} />
                      ) : (
                        <AvatarFallback className="text-lg bg-blue-100 text-blue-600">
                          {match.name[0]}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>
                  
                  <h4 className="text-lg mb-1">{match.name}</h4>
                  <p className="text-gray-600 mb-2">{match.sport} • Intermediate</p>
                  <Badge variant="secondary" className="mb-3">
                    {match.matchScore}% Match
                  </Badge>
                  
                  <div className="bg-blue-50 rounded-lg p-3 mb-4">
                    <p className="text-sm font-medium text-blue-800">{match.day}</p>
                    <p className="text-sm text-blue-600">{match.date}</p>
                    <p className="text-sm font-semibold text-blue-800">{match.time}</p>
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-4">📍 Jakarta</p>
                  
                  {/* Dua Button: Lihat Detail dan Chat */}
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
                      onClick={() => viewProfile(match)}
                    >
                      Lihat Detail
                    </Button>
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600 text-white"
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
        <Card>
          <CardHeader>
            <CardTitle>Preferensi Matching</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm mb-3 block">Olahraga Favorit</label>
              <div className="flex gap-2 flex-wrap">
                {selectedSports.map(sport => (
                  <Badge key={sport} variant="outline" className="py-1 px-3">{sport}</Badge>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm mb-3 block">Level Skill</label>
              <Badge className="py-1 px-3 capitalize">{selectedLevel}</Badge>
            </div>
            <div>
              <label className="text-sm mb-3 block">Jarak Maksimal</label>
              <Badge className="py-1 px-3">{formatDistance(maxDistance)}</Badge>
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
        <Card>
          <CardHeader>
            <CardTitle>Recent Matches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Hasta", sport: "Futsal", status: "Played" },
              { name: "Kael", sport: "Badminton", status: "Scheduled" },
              { name: "Dustin", sport: "Basketball", status: "Cancelled" }
            ]
            .filter(match => match.status !== 'Scheduled')
            .map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm">{match.name}</p>
                  <p className="text-xs text-gray-600">{match.sport}</p>
                </div>
                <Badge 
                  variant={match.status === 'Played' ? 'default' : 'destructive'}
                  className={match.status === 'Played' ? 'bg-green-500 hover:bg-green-600' : ''}
                >
                  {match.status}
                </Badge>
              </div>
            ))}
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
  )
}
import React, { useState } from 'react'
import { Search, Filter, ChevronRight, MapPin, Zap, Star, Calendar, Heart, Trophy } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Progress } from '../components/ui/progress'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { venues } from '../data/mockData'

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSport, setSelectedSport] = useState('all')
  
  const userPoints = 1750
  const userLevel = 12
  const sports = ['all', 'Futsal', 'Badminton', 'Basketball', 'Tennis', 'Voli', 'Tenis Meja']

  const filteredVenues = venues.filter(venue => {
    const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venue.sport.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSport = selectedSport === 'all' || venue.sport === selectedSport
    return matchesSearch && matchesSport
  })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl mb-3">Selamat datang di SePang! 🏆</h1>
          <p className="opacity-90 mb-6 text-lg">Temukan lapangan olahraga terbaik di sekitar Anda</p>
          <div className="flex items-center gap-3 bg-white/20 rounded-lg p-4 max-w-sm">
            <MapPin className="w-5 h-5" />
            <span>Jakarta Selatan</span>
            <Zap className="w-5 h-5 ml-auto" />
          </div>
        </div>

        {/* Quick Search */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-3 mb-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-4 top-3 text-gray-400" />
                <Input
                  placeholder="Cari lapangan atau olahraga..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>
              <Button variant="outline" size="lg">
                <Filter className="w-5 h-5 mr-2" />
                Filter
              </Button>
            </div>
            <div className="flex gap-3 flex-wrap">
              {sports.map(sport => (
                <Badge
                  key={sport}
                  variant={selectedSport === sport ? "default" : "outline"}
                  className="cursor-pointer py-2 px-4 text-sm"
                  onClick={() => setSelectedSport(sport)}
                >
                  {sport === 'all' ? 'Semua' : sport}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Venues */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl">Lapangan Terpopuler</h2>
            <Button variant="ghost">
              Lihat Semua <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredVenues.map(venue => (
              <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <div className="h-48 relative">
                    <ImageWithFallback
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-cover"
                    />
                    {venue.promo && (
                      <Badge className="absolute top-3 right-3 bg-red-500">Hot</Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg mb-1">{venue.name}</h3>
                        <p className="text-gray-600">{venue.sport}</p>
                      </div>
                      <Badge variant={venue.available ? "default" : "secondary"} className="px-3 py-1">
                        {venue.available ? "Tersedia" : "Penuh"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{venue.rating}</span>
                      </div>
                      <span className="text-gray-600">{venue.distance}</span>
                      <span className="text-lg text-blue-600">{venue.price}</span>
                    </div>
                    {venue.promo && (
                      <p className="text-sm text-red-600 mb-3">{venue.promo}</p>
                    )}
                    <Button className="w-full" disabled={!venue.available}>
                      {venue.available ? 'Book Sekarang' : 'Tidak Tersedia'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* AI Smart Scheduler */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-500" />
              AI Smart Scheduler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <p className="text-sm mb-2">🤖 AI merekomendasikan:</p>
              <p className="mb-1">Badminton Arena Kemang</p>
              <p className="text-blue-600">Hari ini 19:00</p>
              <p className="text-xs text-gray-600 mt-2">Berdasarkan jadwal kosong & promo tersedia</p>
            </div>
            <Button className="w-full">
              <Calendar className="w-4 h-4 mr-2" />
              Lihat Rekomendasi
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Level</span>
              <Badge>{userLevel}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Points</span>
              <span className="text-green-600">{userPoints.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Games This Week</span>
              <span>2/3</span>
            </div>
            <Progress value={66} />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Heart className="w-4 h-4 mr-2" />
              Find Match Partner
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Trophy className="w-4 h-4 mr-2" />
              Join Tournament
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
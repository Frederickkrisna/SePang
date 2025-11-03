import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Filter, ChevronRight, MapPin, Zap, Star, Calendar, Heart, Trophy, X} from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Progress } from '../components/ui/progress'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { Modal } from '../components/ui/modal'
import { LoadingSpinner, AILoadingScheduler } from '../components/ui/loading'
import { aiSchedulerService } from '../services/aiScheduler'
import { venues } from '../data/mockData'

export default function Home() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSport, setSelectedSport] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [favoriteVenues, setFavoriteVenues] = useState(new Set())
  const [isViewAllOpen, setIsViewAllOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedVenue, setSelectedVenue] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiRecommendations, setAiRecommendations] = useState(null)
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0)
  const [isRefreshingAI, setIsRefreshingAI] = useState(false)

  const [userLocation, setUserLocation] = useState('Mencari lokasi...')
  const [isRefreshingLocation, setIsRefreshingLocation] = useState(false)

  const [maxDistance, setMaxDistance] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [minRating, setMinRating] = useState('all')
  const [isFilterActive, setIsFilterActive] = useState(false)

  const userPoints = 1750
  const userLevel = 12
  const gamesThisWeek = { completed: 2, total: 3 }

  const sports = [
    { id: 'all', name: 'Semua' },
    { id: 'Futsal', name: 'Futsal' },
    { id: 'Badminton', name: 'Badminton' },
    { id: 'Basketball', name: 'Basketball' },
    { id: 'Tennis', name: 'Tennis' },
    { id: 'Voli', name: 'Voli' },
    { id: 'Tenis Meja', name: 'Tenis Meja' },
    { id: 'Padel', name: 'Padel' },
    { id: 'Golf', name: 'Golf' },
    { id: 'Renang', name: 'Renang' },
    { id: 'Sepak Bola', name: 'Sepak Bola' },
    { id: 'Rock Climbing', name: 'Rock Climbing' },
  ]

const extractPrice = (priceString) => {
    if (!priceString) return 0
    const numeric = priceString.replace(/[^\d]/g, '')
    return parseInt(numeric) || 0
  }

  const extractDistance = (distanceString) => {
    if (!distanceString) return 0
    const numeric = distanceString.replace(/[^\d.]/g, '')
    return parseFloat(numeric) || 0
  }

  const filteredVenues = useMemo(() => {
    let filtered = venues.filter(venue => {
      const matchesSearch = venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           venue.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           venue.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSport = selectedSport === 'all' || venue.sport === selectedSport
      
      // Filter jarak
      const venueDistance = extractDistance(venue.distance)
      const matchesDistance = maxDistance === 'all' || 
                            (maxDistance === '5' && venueDistance < 5) ||
                            (maxDistance === '10' && venueDistance < 10) ||
                            (maxDistance === '15' && venueDistance < 15)
      
      // Filter harga
      const venuePrice = extractPrice(venue.price)
      const matchesPrice = priceRange === 'all' ||
                          (priceRange === '100' && venuePrice < 100000) ||
                          (priceRange === '100-200' && venuePrice >= 100000 && venuePrice <= 200000) ||
                          (priceRange === '200' && venuePrice > 200000)
      
      // Filter rating
      const matchesRating = minRating === 'all' ||
                           (minRating === '4.0' && venue.rating >= 4.0) ||
                           (minRating === '4.5' && venue.rating >= 4.5) ||
                           (minRating === '5.0' && venue.rating === 5.0)

      return matchesSearch && matchesSport && matchesDistance && matchesPrice && matchesRating
    })

    const hasActiveFilters = maxDistance !== 'all' || priceRange !== 'all' || minRating !== 'all'
    setIsFilterActive(hasActiveFilters)

    return filtered
  }, [searchQuery, selectedSport, maxDistance, priceRange, minRating])

  useEffect(() => {
    const detectLocation = () => {
      setTimeout(() => {
        setUserLocation('Palmerah, Jakarta Barat')
      }, 1500)
    }

    detectLocation()
  }, [])

  const handleRefreshLocation = () => {
    setIsRefreshingLocation(true)
    setUserLocation('Mencari lokasi...')
    
    setTimeout(() => {
      setUserLocation('Palmerah, Jakarta Barat')
      setIsRefreshingLocation(false)
    }, 2000)
  }

  const loadAIRecommendations = async () => {
    setAiLoading(true)
    try {
      console.log('🔄 Loading AI recommendations...')
      
      await aiSchedulerService.initializeModel(userLocation)
      
      const recommendations = await aiSchedulerService.getRecommendations('user123', {
        timeRange: 'auto',
        sportType: 'all',
        userLocation: userLocation
      })
      
      setAiRecommendations(recommendations)
      setCurrentRecommendationIndex(0)
      console.log('AI recommendations loaded')
    } catch (error) {
      console.error('Error loading AI recommendations:', error)
    } finally {
      setAiLoading(false)
    }
  }

  useEffect(() => {
    if (userLocation === 'Palmerah, Jakarta Barat') {
      loadAIRecommendations()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLocation])

  const handleViewOtherRecommendations = async () => {
    if (!aiRecommendations || aiRecommendations.recommendations.length <= 1) return
    
    setIsRefreshingAI(true)
    
    setTimeout(() => {
      const nextIndex = (currentRecommendationIndex + 1) % Math.min(aiRecommendations.recommendations.length, 3)
      setCurrentRecommendationIndex(nextIndex)
      setIsRefreshingAI(false)
    }, 800)
  }

  const handleRefreshAllRecommendations = async () => {
    setIsRefreshingAI(true)
    await loadAIRecommendations()
    setIsRefreshingAI(false)
  }

  const getCurrentRecommendation = () => {
    if (!aiRecommendations || !aiRecommendations.recommendations.length) return null
    return aiRecommendations.recommendations[currentRecommendationIndex]
  }

  const handleBookVenue = (venue) => {
    setSelectedVenue(venue)
    setIsBookingOpen(true)
  }

  const handleViewAllVenues = () => {
    setIsViewAllOpen(true)
  }

  const handleConfirmBooking = (bookingData) => {
    console.log('Booking confirmed:', bookingData)
    alert(`Booking berhasil! ${selectedVenue.name} pada ${bookingData.date} ${bookingData.time}`)
    setIsBookingOpen(false)
    setSelectedVenue(null)
  }

  const handleToggleFavorite = (venueId, e) => {
    e?.stopPropagation()
    setFavoriteVenues(prev => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(venueId)) {
        newFavorites.delete(venueId)
      } else {
        newFavorites.add(venueId)
      }
      return newFavorites
    })
  }

  const handleQuickAction = (action) => {
    switch(action) {
      case 'match-partner':
        navigate('/matchmaking')
        break;
      case 'tournament':
        navigate('/community')
        break;
      case 'bookings':
        navigate('/profile')
        break;
      default:
        break;
    }
  }

  const clearAllFilters = () => {
    setMaxDistance('all')
    setPriceRange('all')
    setMinRating('all')
    setSearchQuery('')
    setSelectedSport('all')
    setIsFilterActive(false)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const getActiveFilterCount = () => {
    let count = 0
    if (maxDistance !== 'all') count++
    if (priceRange !== 'all') count++
    if (minRating !== 'all') count++
    if (selectedSport !== 'all') count++
    if (searchQuery) count++
    return count
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      <div className="lg:col-span-2 space-y-6">

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white">
          <h1 className="text-3xl font-bold mb-3">Selamat datang di SePang! 🏆</h1>
          <p className="opacity-90 mb-6 text-lg">Temukan lapangan olahraga terbaik di sekitar Anda</p>

          <div className="flex items-center gap-3 bg-white/20 rounded-lg p-4 max-w-md cursor-pointer hover:bg-white/30 transition-colors group">
            <MapPin className="w-5 h-5" />
            <span className="flex-1 text-sm font-medium">
              {userLocation}
            </span>
            <button 
              onClick={handleRefreshLocation}
              disabled={isRefreshingLocation}
              className={`p-1 rounded transition-all ${
                isRefreshingLocation 
                  ? 'animate-spin opacity-50' 
                  : 'opacity-0 group-hover:opacity-100 hover:bg-white/20'
              }`}
              title="Refresh lokasi"
            >
              <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Search */}
        <Card className="p-6">
          <CardContent className="p-0">
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-4 top-3 text-gray-400" />
                <Input
                  placeholder="Cari lapangan atau olahraga..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base border-2 border-gray-200 focus:border-green-500 transition-colors pr-12"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-3 p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                )}
              </div>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className={`h-12 px-6 transition-all relative ${
                  showFilters 
                    ? 'bg-green-500 text-white border-green-500 hover:bg-green-600' 
                    : 'border-gray-200 hover:border-green-500'
                }`}
              >
                <Filter className="w-5 h-5 mr-2" />
                Filter
                {getActiveFilterCount() > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center p-0"
                  >
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </div>
            
            {/* Sports Filter */}
            <div className="flex gap-3 flex-wrap">
              {sports.map(sport => (
                <Badge
                  key={sport.id}
                  variant={selectedSport === sport.id ? "default" : "outline"}
                  className={`cursor-pointer py-3 px-5 text-sm transition-all ${
                    selectedSport === sport.id 
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-md' 
                      : 'hover:bg-gray-100 border-2 border-gray-200 hover:border-green-300'
                  }`}
                  onClick={() => setSelectedSport(sport.id)}
                >
                  {sport.name}
                </Badge>
              ))}
            </div>

            {/* Additional Filters */}
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showFilters ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'
            }`}>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700">Filter Lanjutan</h3>
                  <div className="flex gap-2">
                    {isFilterActive && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={clearAllFilters}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 text-sm"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Hapus Semua
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">Jarak Maksimal</label>
                    <select 
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all cursor-pointer"
                    >
                      <option value="all">Semua Jarak</option>
                      <option value="5">{"< 5 km"}</option>
                      <option value="10">{"< 10 km"}</option>
                      <option value="15">{"< 15 km"}</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">Range Harga</label>
                    <select 
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all cursor-pointer"
                    >
                      <option value="all">Semua Harga</option>
                      <option value="100">{"< Rp 100.000"}</option>
                      <option value="100-200">Rp 100.000 - 200.000</option>
                      <option value="200">{"> Rp 200.000"}</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-600">Rating Minimal</label>
                    <select 
                      value={minRating}
                      onChange={(e) => setMinRating(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all cursor-pointer"
                    >
                      <option value="all">Semua Rating</option>
                      <option value="4.0">⭐ 4.0+</option>
                      <option value="4.5">⭐ 4.5+</option>
                      <option value="5.0">⭐ 5.0</option>
                    </select>
                  </div>
                </div>
                
                {/* Filter Status */}
                {isFilterActive && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-green-200 animate-pulse">
                    <p className="text-sm font-medium text-green-800 mb-2">Filter Aktif:</p>
                    <div className="flex flex-wrap gap-2">
                      {maxDistance !== 'all' && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                          Jarak: {maxDistance} km
                          <button 
                            onClick={() => setMaxDistance('all')}
                            className="ml-1 hover:text-green-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {priceRange !== 'all' && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                          {priceRange === '100' ? '< Rp 100k' : 
                           priceRange === '100-200' ? 'Rp 100-200k' : 
                           '> Rp 200k'}
                          <button 
                            onClick={() => setPriceRange('all')}
                            className="ml-1 hover:text-green-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {minRating !== 'all' && (
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200">
                          Rating: {minRating}+
                          <button 
                            onClick={() => setMinRating('all')}
                            className="ml-1 hover:text-yellow-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {selectedSport !== 'all' && (
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 border-purple-200">
                          {sports.find(s => s.id === selectedSport)?.name}
                          <button 
                            onClick={() => setSelectedSport('all')}
                            className="ml-1 hover:text-purple-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className={`mt-4 transition-all duration-300 ${
              filteredVenues.length > 0 || searchQuery || isFilterActive ? 'opacity-100' : 'opacity-0'
            }`}>
              <p className="text-sm text-gray-600">
                Menampilkan <span className="font-semibold text-green-600">{filteredVenues.length}</span> lapangan
                {(searchQuery || isFilterActive) && ' berdasarkan filter yang dipilih'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Featured Venues */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery || isFilterActive ? 'Hasil Pencarian' : 'Lapangan Terpopuler'}
            </h2>
            <Button variant="ghost" onClick={handleViewAllVenues} className="group">
              Lihat Semua 
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          {filteredVenues.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak ada hasil</h3>
              <p className="text-gray-500 mb-4">Coba ubah filter atau kata kunci pencarian</p>
              <Button variant="outline" onClick={clearAllFilters}>
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVenues.slice(0, 4).map(venue => (
                <VenueCard 
                  key={venue.id}
                  venue={venue}
                  isFavorite={favoriteVenues.has(venue.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onBook={handleBookVenue}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-4">
          </CardHeader>
          <CardContent className="p-4">
            {aiLoading ? (
              <AILoadingScheduler />
            ) : aiRecommendations ? (
              <AISchedulerContent 
                recommendation={getCurrentRecommendation()}
                onViewOtherRecommendations={handleViewOtherRecommendations}
                onRefreshAll={handleRefreshAllRecommendations}
                isRefreshing={isRefreshingAI}
                currentIndex={currentRecommendationIndex}
                totalRecommendations={Math.min(aiRecommendations.recommendations.length, 3)}
              />
            ) : (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-3"></div>
                <p className="text-gray-600">Menyiapkan rekomendasi...</p>
              </div>
            )}
          </CardContent>
        </Card>

        <QuickStats 
          userLevel={userLevel}
          userPoints={userPoints}
          gamesThisWeek={gamesThisWeek}
        />

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 hover:bg-red-50 hover:border-red-200 transition-colors group"
              onClick={() => handleQuickAction('match-partner')}
            >
              <Heart className="w-4 h-4 mr-2 text-red-500 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Find Match Partner</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 hover:bg-yellow-50 hover:border-yellow-200 transition-colors group"
              onClick={() => handleQuickAction('tournament')}
            >
              <Trophy className="w-4 h-4 mr-2 text-yellow-500 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Join Tournament</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-12 hover:bg-blue-50 hover:border-blue-200 transition-colors group"
              onClick={() => handleQuickAction('bookings')}
            >
              <Calendar className="w-4 h-4 mr-2 text-blue-500 group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">My Bookings</div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      <ViewAllModal 
        isOpen={isViewAllOpen}
        onClose={() => setIsViewAllOpen(false)}
        venues={filteredVenues}
        favoriteVenues={favoriteVenues}
        onToggleFavorite={handleToggleFavorite}
        onBook={handleBookVenue}
      />

      <BookingModal 
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false)
          setSelectedVenue(null)
        }}
        venue={selectedVenue}
        onConfirm={handleConfirmBooking}
      />
    </div>
  )
}

function VenueCard({ venue, isFavorite, onToggleFavorite, onBook }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-green-200">
      <div className="relative">
        <div className="h-48 relative overflow-hidden">
          <ImageWithFallback
            src={venue.image}
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3 flex gap-2">
            {venue.promo && (
              <Badge className="bg-red-500 hover:bg-red-600 border-0">Hot</Badge>
            )}
            <Badge 
              variant="secondary" 
              className="cursor-pointer hover:bg-red-50 border-2 border-white bg-white/90 backdrop-blur-sm"
              onClick={(e) => onToggleFavorite(venue.id, e)}
            >
              <Heart className={`w-3 h-3 mr-1 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Badge>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1 group-hover:text-green-600 transition-colors">{venue.name}</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{venue.location}</span>
              </div>
              <Badge variant="outline" className="mt-2 bg-green-50 text-green-700 border-green-200">
                {venue.sport}
              </Badge>
            </div>
            <Badge variant={venue.available ? "default" : "secondary"} className="px-3 py-1 ml-2">
              {venue.available ? "Tersedia" : "Penuh"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{venue.rating}</span>
            </div>
            <span className="text-gray-600 text-sm">{venue.distance}</span>
            <span className="text-lg font-bold text-green-600">{venue.price}</span>
          </div>
          
          {venue.promo && (
            <p className="text-sm text-red-600 font-medium mb-3">{venue.promo}</p>
          )}
          
          <Button 
            className="w-full group-hover:bg-green-600 group-hover:scale-105 transition-all" 
            disabled={!venue.available}
            onClick={() => onBook(venue)}
          >
            {venue.available ? 'Book Sekarang' : 'Tidak Tersedia'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

function AISchedulerContent({ recommendation, onViewOtherRecommendations, onRefreshAll, isRefreshing, totalRecommendations }) {
  if (!recommendation) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500">Tidak ada rekomendasi saat ini</p>
      </div>
    )
  }
  
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-green-900">AI Smart Recommendation</p>
            <p className="text-xs text-green-600">Personalized for you</p>
          </div>
        </div>
        <button 
          onClick={onRefreshAll}
          disabled={isRefreshing}
          className="p-1 rounded hover:bg-green-100 transition-colors"
          title="Refresh rekomendasi"
        >
        </button>
      </div>

      {isRefreshing ? (
        <AILoadingScheduler />
      ) : (
        <>
          {/* Venue Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{recommendation.venueName}</h3>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {recommendation.sport}
                </Badge>
                <span className="text-sm text-gray-600">{recommendation.distance}</span>
              </div>
            </div>

            {/* Time and Date */}
            <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">{recommendation.date}</p>
                <p className="text-lg font-bold text-green-600">{recommendation.time}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">{recommendation.price}</p>
                {recommendation.originalPrice && (
                  <p className="text-sm text-gray-500 line-through">{recommendation.originalPrice}</p>
                )}
              </div>
            </div>

            {/* Reasons */}
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm font-semibold text-green-800 mb-3">✨ Kenapa kami rekomendasikan:</p>
              <ul className="space-y-2">
                {recommendation.reasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* View Other Recommendations Button */}
          {totalRecommendations > 1 && (
            <Button 
              className="w-full bg-green-500 hover:bg-green-600 text-white border-0 transition-all mt-4"
              onClick={onViewOtherRecommendations}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menganalisis preferensi dan ketersediaan...
                </div>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Lihat Rekomendasi Lain
                </>
              )}
            </Button>
          )}
        </>
      )}
    </div>
  )
}

function QuickStats({ userLevel, userPoints, gamesThisWeek }) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Level</span>
          <Badge variant="default" className="bg-green-500 border-0">
            Level {userLevel}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Points</span>
          <span className="text-green-600 font-bold">{userPoints.toLocaleString()}</span>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Games This Week</span>
            <span className="font-medium">{gamesThisWeek.completed}/{gamesThisWeek.total}</span>
          </div>
          <Progress value={(gamesThisWeek.completed / gamesThisWeek.total) * 100} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

function ViewAllModal({ isOpen, onClose, venues, favoriteVenues, onToggleFavorite, onBook }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Semua Lapangan" size="xl">
      <div className="p-6">
        <div className="mb-6">
          <p className="text-gray-600">
            Menampilkan <span className="font-semibold text-green-600">{venues.length}</span> lapangan
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map(venue => (
            <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="h-40 relative">
                <ImageWithFallback
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <Badge 
                    variant="secondary" 
                    className="cursor-pointer hover:bg-red-50 p-1 bg-white/90 backdrop-blur-sm"
                    onClick={(e) => onToggleFavorite(venue.id, e)}
                  >
                    <Heart className={`w-3 h-3 ${favoriteVenues.has(venue.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Badge>
                </div>
                
                {/* Status Available */}
                <div className="absolute top-2 left-2">
                  <Badge variant={venue.available ? "default" : "secondary"} className="text-xs">
                    {venue.available ? "Tersedia" : "Penuh"}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Nama dan Lokasi */}
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-green-600 transition-colors">
                      {venue.name}
                    </h3>
                    <div className="flex items-center gap-1 text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="text-sm">{venue.location}</span>
                    </div>
                  </div>

                  {/* Sport Badge */}
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {venue.sport}
                  </Badge>

                  {/* Rating dan Jarak */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{venue.rating}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-sm text-gray-600">{venue.distance}</span>
                      </div>
                    </div>
                    
                    {/* Harga */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">{venue.price}</p>
                      {venue.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">{venue.originalPrice}</p>
                      )}
                    </div>
                  </div>

                  {/* Promo */}
                  {venue.promo && (
                    <p className="text-xs text-red-600 font-medium bg-red-50 px-2 py-1 rounded">
                      {venue.promo}
                    </p>
                  )}

                  {/* Facilities */}
                  {venue.facilities && venue.facilities.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {venue.facilities.slice(0, 2).map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-gray-50">
                          {facility}
                        </Badge>
                      ))}
                      {venue.facilities.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-gray-50">
                          +{venue.facilities.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Button Book */}
                  <Button 
                    size="sm" 
                    className="w-full group-hover:bg-green-600 transition-colors"
                    onClick={() => onBook(venue)}
                    disabled={!venue.available}
                  >
                    {venue.available ? 'Book Sekarang' : 'Tidak Tersedia'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {venues.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak ada lapangan</h3>
            <p className="text-gray-500 mb-4">Coba ubah filter pencarian</p>
          </div>
        )}
      </div>
    </Modal>
  )
}

function BookingModal({ isOpen, onClose, venue, onConfirm }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [duration, setDuration] = useState(1)

  if (!venue) return null

  const availableTimes = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']

  const handleSubmit = (e) => {
    e.preventDefault()
    onConfirm({
      venueId: venue.id,
      venueName: venue.name,
      date: selectedDate,
      time: selectedTime,
      duration,
      totalPrice: duration * parseInt(venue.price.replace(/\D/g, '')) / 1000
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Booking ${venue.name}`}>
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="flex gap-6">
          <div className="w-32 h-32 flex-shrink-0">
            <ImageWithFallback
              src={venue.image}
              alt={venue.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{venue.name}</h3>
            <p className="text-gray-600 mb-2">{venue.location}</p>
            <div className="flex items-center gap-4">
              <Badge>{venue.sport}</Badge>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{venue.rating}</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-green-600 mt-3">{venue.price}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Tanggal</label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Waktu</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Pilih Waktu</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Durasi (jam): {duration}
          </label>
          <Input
            type="range"
            min="1"
            max="4"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>1 jam</span>
            <span>2 jam</span>
            <span>3 jam</span>
            <span>4 jam</span>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between mb-2">
            <span>Harga per jam:</span>
            <span>{venue.price}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Durasi:</span>
            <span>{duration} jam</span>
          </div>
          <div className="flex justify-between font-semibold text-lg border-t pt-2">
            <span>Total:</span>
            <span className="text-green-600">
              Rp {(duration * parseInt(venue.price.replace(/\D/g, '')) / 1000).toLocaleString()}k
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="button" variant="outline" className="flex-1" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" className="flex-1" disabled={!selectedDate || !selectedTime}>
            Konfirmasi Booking
          </Button>
        </div>
      </form>
    </Modal>
  )
}
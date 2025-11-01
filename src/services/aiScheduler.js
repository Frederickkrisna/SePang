// aiScheduler.js - Optimized for Palmerah, Jakarta Barat
export class AISchedulerService {
  constructor() {
    this.isInitialized = false
    this.model = null
    this.userLocation = 'Palmerah, Jakarta Barat'
    this.userTime = null
    
    // Initialize methods
    this.predict = this.predict.bind(this)
    this.getRecommendations = this.getRecommendations.bind(this)
    this.analyzePreferences = this.analyzePreferences.bind(this)
    this.getTimeBasedSuggestions = this.getTimeBasedSuggestions.bind(this)
  }

  // Initialize dengan location dan time
  async initializeModel(userLocation = 'Palmerah, Jakarta Barat') {
    console.log('🔄 Initializing AI Model for Palmerah...')
    
    this.userLocation = userLocation
    this.userTime = new Date()
    
    return new Promise((resolve) => {
      setTimeout(() => {
        this.isInitialized = true
        console.log('✅ AI Model initialized for Palmerah!')
        resolve(true)
      }, 800)
    })
  }

  // Update user location secara real-time
  updateUserLocation(location) {
    this.userLocation = location
    console.log('📍 Location updated:', location)
  }

  // Get current time context
  getCurrentTimeContext() {
    const now = new Date()
    const hour = now.getHours()
    const minutes = now.getMinutes()
    const day = now.getDay()
    const isWeekend = day === 0 || day === 6
    const timeOfDay = this.getTimeOfDay(hour)
    
    return {
      currentTime: now,
      hour,
      minutes,
      day,
      isWeekend,
      timeOfDay,
      nextAvailableSlots: this.getNextAvailableSlots(hour, minutes),
      bestTimeForSport: this.getBestTimeForSport(timeOfDay),
      trafficConditions: this.getTrafficConditions(hour, day)
    }
  }

  // Helper methods untuk time analysis
  getTimeOfDay(hour) {
    if (hour >= 5 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 17) return 'afternoon'
    if (hour >= 17 && hour < 21) return 'evening'
    return 'night'
  }

  // Get traffic conditions berdasarkan waktu
  getTrafficConditions(hour, day) {
    const isWeekend = day === 0 || day === 6
    const isRushHour = (!isWeekend && ((hour >= 7 && hour <= 9) || (hour >= 16 && hour <= 19)))
    
    if (isRushHour) return 'high'
    if (isWeekend && hour >= 10 && hour <= 18) return 'medium'
    return 'low'
  }

  // Dapatkan beberapa slot available berikutnya
  getNextAvailableSlots(currentHour, currentMinutes) {
    const allSlots = [
      '08:00', '09:00', '10:00', '11:00', 
      '12:00', '13:00', '14:00', '15:00', '16:00',
      '17:00', '18:00', '19:00', '20:00', '21:00'
    ]
    
    const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`
    
    // Cari 3 slot terdekat setelah waktu sekarang
    const availableSlots = allSlots.filter(slot => slot > currentTime).slice(0, 3)
    
    return availableSlots.length > 0 ? availableSlots : ['08:00', '09:00', '10:00']
  }

  getBestTimeForSport(timeOfDay) {
    const sportPreferences = {
      morning: ['Tennis', 'Badminton', 'Tenis Meja'],
      afternoon: ['Basketball', 'Futsal', 'Voli'],
      evening: ['Badminton', 'Futsal', 'Basketball'],
      night: ['Badminton', 'Tenis Meja']
    }
    
    return sportPreferences[timeOfDay] || ['Badminton', 'Futsal']
  }

  calculatePalmerahDistance(venueLocation) {
    const palmerahDistances = {
      // VENUE DI JAKARTA BARAT (TERDEKAT)
      'Palmerah, Jakarta Barat': 0.5,
      'Slipi, Jakarta Barat': 1.2,
      'Grogol, Jakarta Barat': 2.8,
      'Tomang, Jakarta Barat': 3.1,
      'Kebon Jeruk, Jakarta Barat': 4.5,
      
      // VENUE DI JAKARTA PUSAT (SANGAT DEKAT)
      'Senayan, Jakarta Pusat': 2.3,
      'Merdeka Square, Jakarta Pusat': 5.2,
      'Menteng, Jakarta Pusat': 6.8,
      'Cempaka Putih, Jakarta Pusat': 5.9,
      'Tanah Abang, Jakarta Pusat': 3.8,
      
      // VENUE DI JAKARTA SELATAN (DEKAT)
      'Kebayoran Lama, Jakarta Selatan': 4.2,
      'Kebayoran Baru, Jakarta Selatan': 6.5,
      'Kemang, Jakarta Selatan': 8.2,
      'Pondok Indah, Jakarta Selatan': 9.8,
      'Kuningan, Jakarta Selatan': 7.3,
      'SCBD, Jakarta Selatan': 6.1,
      'Cilandak, Jakarta Selatan': 10.2,
      'Pasar Minggu, Jakarta Selatan': 8.7,
      
      // VENUE DI JAKARTA UTARA (MENENGAH)
      'Pluit, Jakarta Utara': 12.5,
      'Kelapa Gading, Jakarta Utara': 15.8,
      'Ancol, Jakarta Utara': 16.2,
      
      // VENUE DI TANGERANG (JAUH)
      'BSD City, Tangerang': 22.8,
      'Ciledug, Tangerang': 14.3,
      
      // Default untuk venue yang tidak ada di mapping
      'default': 8.0
    }
    
    // Cari lokasi yang cocok
    for (const [key, distance] of Object.entries(palmerahDistances)) {
      if (venueLocation.includes(key)) {
        return distance
      }
    }
    
    return palmerahDistances['default']
  }

  // Extract harga numerik dari string price
  extractPrice(priceString) {
    if (!priceString) return 0
    const numeric = priceString.replace(/[^\d]/g, '')
    return parseInt(numeric) || 0
  }

  // Main method untuk mendapatkan rekomendasi
  async getRecommendations(userId, constraints = {}) {
    console.log(`🤖 Getting AI recommendations for Palmerah user: ${userId}`)
    
    if (!this.isInitialized) {
      await this.initializeModel(this.userLocation)
    }

    const timeContext = this.getCurrentTimeContext()
    const userLocation = this.userLocation

    // Import venues data dari mockData
    const { venues } = await import('../data/mockData.js')
    
    // Simulasi AI processing
    await new Promise(resolve => setTimeout(resolve, 600))

    const recommendations = this.generatePalmerahRecommendations(venues, timeContext, userLocation, constraints)
    
    console.log('✅ Palmerah AI recommendations generated!')
    return recommendations
  }

  // Generate recommendations khusus Palmerah
  generatePalmerahRecommendations(venues, timeContext, userLocation, constraints) {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const formatDate = (date, isTomorrow = false) => {
      if (!isTomorrow && date.toDateString() === today.toDateString()) return 'Hari ini'
      if (isTomorrow || date.toDateString() === tomorrow.toDateString()) return 'Besok'
      return date.toLocaleDateString('id-ID', { weekday: 'long' })
    }

    // Filter venues yang available
    const availableVenues = venues.filter(venue => venue.available)

    // Calculate distances dan scores untuk semua venue
    const venuesWithScores = availableVenues.map(venue => {
      const distance = this.calculatePalmerahDistance(venue.location)
      const priceValue = this.extractPrice(venue.price)
      const traffic = timeContext.trafficConditions
      
      // PRIORITAS: JAKARTA BARAT > JAKARTA PUSAT TERDEKAT > JAKARTA SELATAN TERDEKAT
      let locationPriority = 1
      if (venue.location.includes('Palmerah') || venue.location.includes('Slipi')) locationPriority = 4
      else if (venue.location.includes('Jakarta Barat')) locationPriority = 3
      else if (venue.location.includes('Senayan') || venue.location.includes('Kebayoran Lama')) locationPriority = 2.5
      else if (venue.location.includes('Jakarta Pusat') && distance < 6) locationPriority = 2
      else if (venue.location.includes('Jakarta Selatan') && distance < 8) locationPriority = 1.5
      
      // Traffic multiplier - hindari venue jauh saat rush hour
      let trafficMultiplier = 1
      if (traffic === 'high' && distance > 8) trafficMultiplier = 0.7
      if (traffic === 'medium' && distance > 12) trafficMultiplier = 0.8
      
      // Score formula: 45% distance, 30% location priority, 20% price, 5% rating
      const distanceScore = Math.max(0, 100 - (distance * 8)) // Weight tinggi untuk distance
      const locationScore = locationPriority * 22 // Weight untuk lokasi preferred
      const priceScore = Math.max(0, 100 - (priceValue / 2000)) // Weight untuk harga
      const ratingScore = (venue.rating - 3) * 20 // Convert 3-5 star to 0-40 points
      
      const totalScore = ((distanceScore * 0.45) + (locationScore * 0.3) + (priceScore * 0.2) + (ratingScore * 0.05)) * trafficMultiplier
      
      return {
        ...venue,
        distance,
        priceValue,
        totalScore,
        locationPriority,
        isPalmerahArea: venue.location.includes('Palmerah') || venue.location.includes('Slipi'),
        isJakartaBarat: venue.location.includes('Jakarta Barat'),
        isNearPalmerah: distance < 5
      }
    })

    // Sort by: 1. Palmerah/Slipi, 2. Jakarta Barat, 3. Near Palmerah, 4. Total Score
    const sortedVenues = venuesWithScores.sort((a, b) => {
      // Prioritas 1: Palmerah & Slipi area
      if (a.isPalmerahArea && !b.isPalmerahArea) return -1
      if (!a.isPalmerahArea && b.isPalmerahArea) return 1
      
      // Prioritas 2: Jakarta Barat lainnya
      if (a.isJakartaBarat && !b.isJakartaBarat) return -1
      if (!a.isJakartaBarat && b.isJakartaBarat) return 1
      
      // Prioritas 3: Dekat Palmerah (<5km)
      if (a.isNearPalmerah && !b.isNearPalmerah) return -1
      if (!a.isNearPalmerah && b.isNearPalmerah) return 1
      
      // Prioritas 4: Total score
      return b.totalScore - a.totalScore
    })

    // Ambil 6 venue terbaik
    const bestVenues = sortedVenues.slice(0, 6)

    // Generate recommendations
    const allRecommendations = []
    
    bestVenues.forEach((venue, index) => {
      const timeSlots = timeContext.nextAvailableSlots
      const slotIndex = index % timeSlots.length
      const timeSlot = timeSlots[slotIndex]
      
      // Match score berdasarkan lokasi dan distance
      let matchScore
      if (venue.isPalmerahArea) {
        matchScore = 98 // Maximum score untuk venue di Palmerah/Slipi
      } else if (venue.isJakartaBarat) {
        if (venue.distance < 3) matchScore = 95
        else if (venue.distance < 6) matchScore = 90
        else matchScore = 85
      } else if (venue.isNearPalmerah) {
        if (venue.distance < 5) matchScore = 92
        else matchScore = 87
      } else {
        if (venue.distance < 8) matchScore = 85
        else if (venue.distance < 12) matchScore = 78
        else matchScore = 72
      }
      
      // Bonus untuk harga murah dan rating tinggi
      if (venue.priceValue < 100000) matchScore += 5
      if (venue.rating >= 4.5) matchScore += 4
      if (venue.rating >= 4.7) matchScore += 2
      
      // Bonus untuk fasilitas lengkap
      if (venue.facilities && venue.facilities.length >= 5) matchScore += 3
      
      matchScore = Math.min(98, Math.max(70, matchScore))

      const recommendation = {
        id: `rec${index + 1}`,
        venueId: venue.id,
        venueName: venue.name,
        sport: venue.sport,
        time: timeSlot,
        date: formatDate(today),
        confidence: (matchScore / 100) * 0.9 + 0.1,
        reasons: this.generatePalmerahReasons(venue, venue.distance, timeContext),
        price: venue.price,
        originalPrice: venue.originalPrice,
        discount: venue.promo ? this.extractDiscount(venue.promo) : null,
        distance: venue.distance.toFixed(1) + ' km',
        rating: venue.rating,
        matchScore: matchScore,
        popularity: venue.popularity,
        isAlternative: index > 0,
        timeAdvantage: this.getTimeAdvantage(timeSlot, timeContext.hour),
        image: venue.image,
        facilities: venue.facilities,
        estimatedTravelTime: this.getEstimatedTravelTime(venue.distance, timeContext.trafficConditions)
      }
      
      allRecommendations.push(recommendation)
    })

    return {
      success: true,
      timestamp: now.toISOString(),
      timeContext: {
        currentTime: `${timeContext.hour.toString().padStart(2, '0')}:${timeContext.minutes.toString().padStart(2, '0')}`,
        timeOfDay: timeContext.timeOfDay,
        isWeekend: timeContext.isWeekend,
        bestSportsNow: timeContext.bestTimeForSport,
        availableSlots: timeContext.nextAvailableSlots,
        trafficConditions: timeContext.trafficConditions
      },
      userLocation: 'Palmerah, Jakarta Barat',
      constraints,
      recommendations: allRecommendations,
      alternatives: allRecommendations.slice(1, 5),
      locationInsights: this.getPalmerahLocationInsights(),
      modelVersion: '5.0.0-palmerah'
    }
  }

  // Generate reasons khusus Palmerah
  generatePalmerahReasons(venue, distance, timeContext) {
    const reasons = []
    
    // Priority 1: Location reasons
    if (venue.location.includes('Palmerah') || venue.location.includes('Slipi')) {
      reasons.push('🏠 SESAMA PALMERAH AREA - Super deket!')
      reasons.push('🚶‍♂️ Bisa jalan kaki atau ojek 5 menit')
    } 
    else if (venue.location.includes('Jakarta Barat')) {
      reasons.push('📍 MASIH JAKARTA BARAT - Area terdekat!')
      if (distance < 3) {
        reasons.push('🏃‍♂️ Cuma 5-10 menit dari Palmerah')
      } else {
        reasons.push(`🚗 ${Math.round(distance * 3)}-${Math.round(distance * 4)} menit dari Palmerah`)
      }
    }
    else if (venue.location.includes('Senayan') || venue.location.includes('Kebayoran Lama')) {
      reasons.push('🌟 DEKAT DARI PALMERAH - Akses mudah')
      reasons.push(`⏱ ${Math.round(distance * 2.5)}-${Math.round(distance * 3.5)} menit perjalanan`)
    }
    else if (distance < 5) {
      reasons.push('🗺 Sangat dekat dari Palmerah')
    }
    
    // Priority 2: Distance & traffic reasons
    reasons.push(`📏 ${distance.toFixed(1)} km dari Palmerah`)
    
    if (timeContext.trafficConditions === 'high') {
      reasons.push('🚦 Hindari macet - venue dekat recommended')
    }
    
    // Priority 3: Price reasons
    if (venue.priceValue < 80000) {
      reasons.push('💰 HARGA SUPER MURAH - hemat banget!')
    }
    else if (venue.priceValue < 120000) {
      reasons.push('💵 Harga terjangkau - value for money')
    }
    
    // Priority 4: Rating & Facilities
    if (venue.rating >= 4.7) {
      reasons.push('⭐⭐⭐⭐⭐ Rating bintang 5!')
    }
    else if (venue.rating >= 4.5) {
      reasons.push('⭐ Rating tinggi - recommended banget!')
    }
    
    if (venue.promo) {
      reasons.push(`🎁 ${venue.promo}`)
    }

    // Priority 5: Facilities
    if (venue.facilities && venue.facilities.includes('AC')) {
      reasons.push('❄️ Ber-AC - nyaman buat olahraga')
    }

    return reasons.slice(0, 4)
  }

  // Get estimated travel time
  getEstimatedTravelTime(distance, traffic) {
    const baseTime = distance * 3 // 3 menit per km normal
    let multiplier = 1
    
    if (traffic === 'high') multiplier = 1.8
    else if (traffic === 'medium') multiplier = 1.3
    
    const totalMinutes = Math.round(baseTime * multiplier)
    return `${totalMinutes} menit`
  }

  // Extract discount dari promo text
  extractDiscount(promo) {
    if (promo.includes('20%')) return '20%'
    if (promo.includes('10%')) return '10%'
    if (promo.includes('Diskon')) return 'Diskon'
    if (promo.includes('Free')) return 'Free'
    return 'Promo'
  }

  // Get time advantage description
  getTimeAdvantage(slotTime, currentHour) {
    const slotHour = parseInt(slotTime.split(':')[0])
    const hoursDifference = slotHour - currentHour
    
    if (hoursDifference <= 1) {
      return 'Segera'
    } else if (hoursDifference <= 3) {
      return 'Beberapa jam lagi'
    } else {
      return 'Nanti'
    }
  }

  // Get Palmerah location insights
  getPalmerahLocationInsights() {
    return {
      advantage: "Lokasi strategis di pusat Jakarta Barat",
      access: "Akses mudah ke Jakarta Pusat & Selatan",
      trafficTip: "Hindari jam 7-9 pagi & 4-7 sore untuk perjalanan jauh",
      bestAreas: ["Palmerah sendiri", "Slipi", "Senayan", "Kebayoran Lama"],
      note: "Venue di Jakarta Barat lebih menghemat waktu perjalanan"
    }
  }

  // Get time-based suggestions untuk Palmerah
  async getTimeBasedSuggestions() {
    const timeContext = this.getCurrentTimeContext()
    
    const suggestions = {
      now: `Sekarang jam ${timeContext.hour}:${timeContext.minutes.toString().padStart(2, '0')} - Waktu perfect buat olahraga!`,
      bestTime: `Rekomendasi: ${timeContext.bestTimeForSport.join(', ')}`,
      locationTip: '💡 Prioritaskan venue di Palmerah & Slipi untuk hemat waktu',
      trafficAlert: timeContext.trafficConditions === 'high' ? '🚦 Sedang rush hour, pilih venue dekat!' : '✅ Kondisi lancar, bisa explore venue agak jauh'
    }

    return suggestions
  }

  // Method untuk analyze user preferences
  async analyzePreferences(userId) {
    const timeContext = this.getCurrentTimeContext()
    
    await new Promise(resolve => setTimeout(resolve, 500))

    return {
      userId,
      currentTime: `${timeContext.hour}:${timeContext.minutes.toString().padStart(2, '0')}`,
      locationInsight: 'Berdasarkan lokasi Anda di Palmerah, Jakarta Barat',
      recommendation: 'Fokus pada venue di Palmerah, Slipi, dan Jakarta Barat terdekat',
      advantage: 'Akses mudah ke Senayan & Kebayoran Lama',
      priority: ['Palmerah/Slipi', 'Jakarta Barat', 'Senayan', 'Kebayoran Lama']
    }
  }

  // Prediction method
  async predict() {
    await new Promise(resolve => setTimeout(resolve, 400))
    
    return {
      score: 0.92,
      confidence: 0.95,
      recommended: true,
      reasoning: "Lokasi Palmerah strategis dengan akses ke banyak venue berkualitas"
    }
  }
}

// Export singleton instance
export const aiSchedulerService = new AISchedulerService()
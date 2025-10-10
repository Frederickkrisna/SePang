export const venues = [
  {
    id: 1,
    name: "SportCenter Jakarta Selatan",
    sport: "Futsal",
    price: "Rp 150.000/jam",
    rating: 4.8,
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1712325485668-6b6830ba814e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXRzYWwlMjBjb3VydCUyMGluZG9vcnxlbnwxfHx8fDE3NTg1NTgxOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    available: true,
    promo: "Diskon 20% untuk 3 jam ke depan!"
  },
  // ... data venues lainnya
]

export const matchProfiles = [
  {
    id: 1,
    name: "Ahmad",
    age: 25,
    sport: "Futsal",
    level: "Intermediate",
    distance: "1.2 km",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    bio: "Suka main futsal setiap weekend. Cari tim yang solid!",
    matchScore: 92
  },
  // ... data match profiles lainnya
]

export const achievements = [
  { id: 1, name: "First Booking", icon: "Target", completed: true, points: 100 },
  { id: 2, name: "3 Days Streak", icon: "Medal", completed: true, points: 250 },
  { id: 3, name: "10x Badminton", icon: "Trophy", completed: false, points: 500, progress: 70 },
  { id: 4, name: "Community Builder", icon: "Users", completed: false, points: 750, progress: 30 }
]

export const events = [
  {
    id: 1,
    title: "Liga Futsal Mingguan",
    date: "Setiap Sabtu",
    participants: 24,
    maxParticipants: 32,
    prize: "Trophy + Voucher 500k",
    sport: "Futsal"
  },
  {
    id: 2,
    title: "Tournament Badminton",
    date: "25 Sep 2024",
    participants: 16,
    maxParticipants: 16,
    prize: "Raket Victor + Medal",
    sport: "Badminton"
  }
]
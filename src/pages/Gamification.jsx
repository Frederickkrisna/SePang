import React, { useState } from 'react'
import { Target, Medal, Trophy, Users, Zap, ArrowRight, Gift, Star, Crown, Flame, X, Calendar, Award } from 'lucide-react'

export default function Gamification() {
  const [userPoints, setUserPoints] = useState(1750)
  const [userLevel] = useState(12)
  const [showAllAchievements, setShowAllAchievements] = useState(false)
  const [showAllRewards, setShowAllRewards] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [showRedeemModal, setShowRedeemModal] = useState(false)
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false)
  const [showGoalModal, setShowGoalModal] = useState(false)
  const [weeklyGoal, setWeeklyGoal] = useState(3)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [selectedFriends, setSelectedFriends] = useState([])

  const nextLevelPoints = 2000
  const pointsToNextLevel = nextLevelPoints - userPoints

  const achievements = [
    { id: 1, name: "First Win", icon: "Trophy", points: 50, description: "Win your first match", completed: true, progress: 100 },
    { id: 2, name: "Weekly Warrior", icon: "Trophy", points: 50, description: "Play 5 times in one week", completed: true, progress: 100 },
    { id: 3, name: "Speed Demon", icon: "Zap", points: 100, description: "Complete 10 matches in a week", completed: false, progress: 60 },
    { id: 4, name: "Social Butterfly", icon: "Users", points: 75, description: "Play with 10 different friends", completed: false, progress: 40 },
    { id: 5, name: "Marathon Runner", icon: "Medal", points: 150, description: "Play for 50 hours total", completed: true, progress: 100 },
    { id: 6, name: "Sharpshooter", icon: "Target", points: 200, description: "Win 20 matches in a row", completed: false, progress: 25 },
    { id: 7, name: "Team Player", icon: "Star", points: 100, description: "Join 10 team events", completed: false, progress: 70 },
    { id: 8, name: "Early Bird", icon: "Award", points: 50, description: "Book before 8 AM", completed: true, progress: 100 }
  ]

  const rewards = [
    { id: 1, name: "Free Court Hour", icon: "Trophy", pointsRequired: 500, description: "1 jam gratis booking lapangan" },
    { id: 2, name: "Sports Drink", icon: "Gift", pointsRequired: 200, description: "Minuman isotonik gratis" },
    { id: 3, name: "Equipment Discount", icon: "Medal", pointsRequired: 1000, description: "Diskon 20% pembelian equipment" },
    { id: 4, name: "VIP Lounge Access", icon: "Crown", pointsRequired: 2000, description: "Akses VIP lounge 1 bulan" },
    { id: 5, name: "Private Coaching", icon: "Star", pointsRequired: 1500, description: "1 sesi coaching gratis" }
  ]

  const friends = [
    { id: 1, name: "Ahmad Rizki", skillLevel: "Advanced", lastActive: "Online now" },
    { id: 2, name: "Sarah Putri", skillLevel: "Intermediate", lastActive: "2h ago" },
    { id: 3, name: "Kevin Tan", skillLevel: "Beginner", lastActive: "1d ago" },
    { id: 4, name: "Diana Sari", skillLevel: "Advanced", lastActive: "3h ago" }
  ]

  const getIconComponent = (iconName) => {
    const icons = {
      Target: Target,
      Medal: Medal,
      Trophy: Trophy,
      Users: Users,
      Zap: Zap,
      Gift: Gift,
      Star: Star,
      Crown: Crown,
      Flame: Flame,
      Award: Award,
      Calendar: Calendar
    }
    return icons[iconName] || Target
  }

  const handleRedeemReward = (reward) => {
    if (userPoints >= reward.pointsRequired) {
      setSelectedReward(reward)
      setShowRedeemModal(true)
    }
  }

  const confirmRedeem = () => {
    if (selectedReward) {
      setUserPoints(prev => prev - selectedReward.pointsRequired)
      setShowRedeemModal(false)
      setSelectedReward(null)
    }
  }

  const handleDailyCheckIn = () => {
    if (!hasCheckedInToday) {
      setUserPoints(prev => prev + 10)
      setHasCheckedInToday(true)
    }
  }

  const toggleFriendSelection = (friendId) => {
    setSelectedFriends(prev => 
      prev.includes(friendId) 
        ? prev.filter(id => id !== friendId)
        : [...prev, friendId]
    )
  }

  const sendInvitations = () => {
    if (selectedFriends.length > 0) {
      setShowInviteModal(false)
      setSelectedFriends([])
    }
  }

  const displayedAchievements = showAllAchievements ? achievements : achievements.slice(0, 4)
  const displayedRewards = showAllRewards ? rewards : rewards.slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Card */}
            <div className="bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-3xl shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-10 rounded-full -ml-24 -mb-24"></div>
              <div className="p-8 md:p-10 relative">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="relative">
                    <div className="w-28 h-28 border-4 border-white shadow-2xl rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white text-3xl font-bold">
                      FK
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold text-white shadow-lg border-2 border-white">
                      {userLevel}
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-1">Frederick Krisna</h2>
                    <div className="space-y-4 mt-4">
                      <div className="flex justify-between items-center bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                        <span className="text-white/90 font-medium">Total Points</span>
                        <span className="text-3xl font-bold text-white">{userPoints.toLocaleString()}</span>
                      </div>
                      <div className="space-y-2 bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
                        <div className="relative h-4 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full transition-all duration-1000"
                            style={{ width: `${(userPoints / nextLevelPoints) * 100}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-white/90">
                          <span>{userPoints} points</span>
                          <span className="font-semibold">{pointsToNextLevel} to Level {userLevel + 1}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">Achievements</h3>
                  <p className="text-gray-600">Selesaikan misi dan dapatkan poin bonus!</p>
                </div>
                <button 
                  onClick={() => setShowAllAchievements(!showAllAchievements)}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-all hover:gap-3"
                >
                  {showAllAchievements ? 'Show Less' : 'View All'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedAchievements.map(achievement => {
                  const IconComponent = getIconComponent(achievement.icon)
                  return (
                    <div 
                      key={achievement.id} 
                      className={`rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                        achievement.completed 
                          ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300' 
                          : 'bg-white border-2 border-gray-200'
                      }`}
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`p-4 rounded-xl shadow-lg ${
                            achievement.completed 
                              ? 'bg-gradient-to-br from-emerald-500 to-teal-500' 
                              : 'bg-gradient-to-br from-gray-300 to-gray-400'
                          }`}>
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-bold text-gray-900 text-lg">{achievement.name}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                achievement.completed 
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white' 
                                  : 'bg-gray-200 text-gray-600'
                              }`}>
                                +{achievement.points} pts
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
                            
                            {!achievement.completed && achievement.progress && (
                              <div className="space-y-2">
                                <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                                    style={{ width: `${achievement.progress}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>Progress</span>
                                  <span className="font-semibold">{achievement.progress}%</span>
                                </div>
                              </div>
                            )}
                            
                            {achievement.completed && (
                              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                                <div className="w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                                  <span className="text-white text-xs">✓</span>
                                </div>
                                <span>Completed</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Points Store */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">Points Store</h3>
                    <p className="text-white/90">Tukar poin Anda dengan hadiah menarik</p>
                  </div>
                  <button 
                    onClick={() => setShowAllRewards(!showAllRewards)}
                    className="flex items-center gap-2 text-white hover:text-white/80 font-semibold transition-all hover:gap-3 bg-white/20 px-4 py-2 rounded-full"
                  >
                    {showAllRewards ? 'Show Less' : 'View All'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedRewards.map(reward => {
                    const IconComponent = getIconComponent(reward.icon)
                    const canRedeem = userPoints >= reward.pointsRequired
                    
                    return (
                      <div 
                        key={reward.id}
                        className={`border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl ${
                          canRedeem 
                            ? 'border-green-300 hover:border-green-400 bg-gradient-to-br from-white to-green-50' 
                            : 'border-gray-200 bg-gray-50 opacity-75'
                        }`}
                      >
                        <div className="text-center mb-4">
                          <div className={`inline-flex p-4 rounded-2xl mb-4 shadow-lg ${
                            canRedeem ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gray-300'
                          }`}>
                            <IconComponent className={`w-10 h-10 ${canRedeem ? 'text-white' : 'text-gray-500'}`} />
                          </div>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">{reward.name}</h4>
                          <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-100 rounded-xl">
                            <span className="text-gray-600 font-medium">Harga:</span>
                            <span className={`font-bold text-lg ${
                              canRedeem ? 'text-green-600' : 'text-gray-400'
                            }`}>
                              {reward.pointsRequired} pts
                            </span>
                          </div>
                          
                          <button 
                            className={`w-full py-3 rounded-xl font-bold text-lg transition-all shadow-lg ${
                              canRedeem 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-xl hover:scale-105' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!canRedeem}
                            onClick={() => handleRedeemReward(reward)}
                          >
                            {canRedeem ? 'Tukar Sekarang' : 'Poin Tidak Cukup'}
                          </button>
                          
                          {!canRedeem && (
                            <p className="text-xs text-center text-gray-500">
                              Butuh {reward.pointsRequired - userPoints} points lagi
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Health Tracker */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 p-6">
                <h3 className="flex items-center gap-2 text-xl font-bold text-white">
                  <Flame className="w-6 h-6" />
                  Health & Performance
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-200">
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1">142</p>
                  <p className="text-gray-600 font-medium">Games Played</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200">
                  <p className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-1">28.5k</p>
                  <p className="text-gray-600 font-medium">Calories Burned</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200">
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">156h</p>
                  <p className="text-gray-600 font-medium">Total Playtime</p>
                </div>
                
                <div className="border-t-2 pt-6">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-green-500" />
                    Target Minggu Ini
                  </h4>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-gray-600 font-medium">{weeklyGoal} sesi target</span>
                    <span className="text-green-600 font-bold">2/{weeklyGoal} completed</span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                      style={{ width: `${(2/weeklyGoal) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">{weeklyGoal - 2} sesi lagi untuk mencapai target!</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
              <div className="border-b bg-gradient-to-r from-gray-50 to-white p-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>
                  Quick Actions
                </h3>
              </div>
              <div className="p-6 space-y-3">
                <button 
                  className={`w-full flex items-center justify-start gap-3 px-6 py-4 rounded-xl font-semibold transition-all shadow-md ${
                    hasCheckedInToday 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white hover:shadow-lg hover:scale-105'
                  }`}
                  onClick={handleDailyCheckIn}
                  disabled={hasCheckedInToday}
                >
                  <Zap className="w-5 h-5" />
                  {hasCheckedInToday ? 'Sudah Check-in Hari Ini' : 'Daily Check-in (+10 pts)'}
                </button>
                <button 
                  className="w-full flex items-center justify-start gap-3 px-6 py-4 rounded-xl font-semibold transition-all border-2 border-gray-200 hover:bg-gray-50 hover:border-green-300 hover:shadow-md"
                  onClick={() => setShowGoalModal(true)}
                >
                  <Target className="w-5 h-5 text-green-500" />
                  Set Weekly Goal
                </button>
                <button 
                  className="w-full flex items-center justify-start gap-3 px-6 py-4 rounded-xl font-semibold transition-all border-2 border-gray-200 hover:bg-gray-50 hover:border-emerald-300 hover:shadow-md"
                  onClick={() => setShowInviteModal(true)}
                >
                  <Users className="w-5 h-5 text-emerald-500" />
                  Invite Friends
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redeem Confirmation Modal */}
      {showRedeemModal && selectedReward && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Konfirmasi Penukaran</h3>
                <button 
                  onClick={() => {
                    setShowRedeemModal(false)
                    setSelectedReward(null)
                  }}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedReward.name}</h3>
                <p className="text-gray-600">{selectedReward.description}</p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-5 border-2 border-green-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-medium">Poin Anda:</span>
                  <span className="font-bold text-xl">{userPoints} pts</span>
                </div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-600 font-medium">Biaya penukaran:</span>
                  <span className="font-bold text-xl text-red-500">-{selectedReward.pointsRequired} pts</span>
                </div>
                <div className="flex justify-between items-center border-t-2 border-green-200 pt-3">
                  <span className="text-gray-700 font-semibold">Sisa poin:</span>
                  <span className="font-bold text-2xl text-green-600">{userPoints - selectedReward.pointsRequired} pts</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 py-3 px-4 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all"
                  onClick={() => {
                    setShowRedeemModal(false)
                    setSelectedReward(null)
                  }}
                >
                  Batal
                </button>
                <button 
                  className="flex-1 py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transition-all shadow-lg hover:shadow-xl"
                  onClick={confirmRedeem}
                >
                  Konfirmasi Tukar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Set Weekly Goal Modal */}
      {showGoalModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Set Target Mingguan</h3>
                <button 
                  onClick={() => setShowGoalModal(false)}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Atur Target Mingguan</h3>
                <p className="text-gray-600">Berapa banyak sesi olahraga yang ingin Anda capai minggu ini?</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200">
                  <span className="text-gray-700 font-semibold">Jumlah Sesi:</span>
                  <div className="flex items-center gap-3">
                    <button
                      className="w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                      onClick={() => weeklyGoal > 1 && setWeeklyGoal(weeklyGoal - 1)}
                      disabled={weeklyGoal <= 1}
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold w-8 text-center text-green-600">{weeklyGoal}</span>
                    <button
                      className="w-10 h-10 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center justify-center"
                      onClick={() => setWeeklyGoal(weeklyGoal + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Target saat ini:</span>
                    <span className="font-semibold text-green-600">{weeklyGoal} sesi/minggu</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 py-3 px-4 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all"
                  onClick={() => setShowGoalModal(false)}
                >
                  Batal
                </button>
                <button 
                  className="flex-1 py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transition-all shadow-lg hover:shadow-xl"
                  onClick={() => {
                    setShowGoalModal(false)
                  }}
                >
                  Simpan Target
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Friends Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">Undang Teman</h3>
                <button 
                  onClick={() => {
                    setShowInviteModal(false)
                    setSelectedFriends([])
                  }}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Undang Teman Bermain</h3>
                <p className="text-gray-600">Pilih teman yang ingin Anda undang untuk bermain bersama</p>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {friends.map(friend => (
                  <div
                    key={friend.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedFriends.includes(friend.id)
                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                        : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-green-200'
                    }`}
                    onClick={() => toggleFriendSelection(friend.id)}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold shadow-md">
                      {friend.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{friend.name}</p>
                      <p className="text-sm text-gray-500">{friend.skillLevel} • {friend.lastActive}</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedFriends.includes(friend.id)
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300'
                    }`}>
                      {selectedFriends.includes(friend.id) && (
                        <span className="text-xs">✓</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-4 border-2 border-green-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Teman terpilih:</span>
                  <span className="font-semibold text-green-600">{selectedFriends.length} teman</span>
                </div>
              </div>
              
              <div className="flex gap-3">
                <button 
                  className="flex-1 py-3 px-4 rounded-xl font-semibold border-2 border-gray-300 hover:bg-gray-50 transition-all"
                  onClick={() => {
                    setShowInviteModal(false)
                    setSelectedFriends([])
                  }}
                >
                  Batal
                </button>
                <button 
                  className="flex-1 py-3 px-4 rounded-xl font-semibold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white transition-all shadow-lg hover:shadow-xl"
                  onClick={sendInvitations}
                >
                  Kirim Undangan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
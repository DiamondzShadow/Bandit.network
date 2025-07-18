"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Zap, Target, Award, Star, Trophy, Coins, Gamepad2, Sparkles } from "lucide-react"
import GameSounds from "@/components/GameSounds"

export default function CampaignPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, speed: number}>>([])
  const [score, setScore] = useState(0)
  const [level, setLevel] = useState(1)
  const [xp, setXP] = useState(0)
  const [achievements, setAchievements] = useState<string[]>([])

  // Particle system
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 0.5
        })
      }
      setParticles(newParticles)
    }

    generateParticles()
    window.addEventListener('resize', generateParticles)
    return () => window.removeEventListener('resize', generateParticles)
  }, [])

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed,
        x: particle.x + Math.sin(particle.y * 0.01) * 0.5
      })).filter(particle => particle.y > -10))
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  // Bandit SDK initialization
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://cdn.bandit.network/sdk/bandit.js"

    script.onload = () => {
      if (window.Bandit) {
        try {
          const bandit = new window.Bandit.init({
            apiKey: "2427fb97559643739546603fdf78590c",
            cluster: "mainnet",
          })

          bandit.mountCampaign({ campaignId: 6902 }, "bandit-campaign")
          setIsLoading(false)
          
          // Game-like progression simulation
          setTimeout(() => {
            setScore(1250)
            setXP(75)
            setAchievements(['first_farm', 'early_adopter'])
            
            // Play level up sound
            if ((window as any).gameSounds) {
              (window as any).gameSounds.levelUp()
            }
          }, 2000)
        } catch (error) {
          console.error("Bandit error:", error)
          setIsLoading(false)
        }
      }
    }

    script.onerror = () => {
      setIsLoading(false)
    }

    document.head.appendChild(script)
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  // Level calculation
  useEffect(() => {
    setLevel(Math.floor(xp / 100) + 1)
  }, [xp])

  const handleCardClick = (cardType: string) => {
    setScore(prev => prev + 50)
    setXP(prev => prev + 10)
    
    // Play sound effect
    if ((window as any).gameSounds) {
      (window as any).gameSounds.coin()
    }
    
    // Add visual feedback
    const element = document.querySelector(`[data-card="${cardType}"]`)
    if (element) {
      element.classList.add('animate-pulse')
      setTimeout(() => element.classList.remove('animate-pulse'), 500)
    }
  }

  const handleQuickStart = () => {
    setScore(prev => prev + 100)
    setXP(prev => prev + 25)
    
    if ((window as any).gameSounds) {
      (window as any).gameSounds.powerUp()
    }
  }

  const handlePowerBoost = () => {
    setScore(prev => prev + 200)
    setXP(prev => prev + 50)
    
    if ((window as any).gameSounds) {
      (window as any).gameSounds.levelUp()
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage:
          "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banner%20758k-X8Wejmi1r1nE6fAKmVITK7PKXPj3kR.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Game Sounds */}
      <GameSounds enabled={true} />
      
      {/* Game-like Styling */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');
        
        .game-title {
          font-family: 'Orbitron', monospace;
          font-weight: 900;
          letter-spacing: 0.05em;
          line-height: 0.9;
          text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }
        
        .game-subtitle {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        
        .game-body {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 400;
          line-height: 1.6;
        }
        
        .game-accent {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        
        .neon-grid {
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: gridPulse 4s ease-in-out infinite;
        }
        
        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .game-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        
        .game-card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.3);
          border-color: rgba(139, 92, 246, 0.5);
        }
        
        .game-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4, #10b981);
          background-size: 200% 100%;
          animation: gradientShift 3s ease-in-out infinite;
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .glow-effect {
          box-shadow: 
            0 0 20px rgba(139, 92, 246, 0.4),
            inset 0 0 20px rgba(139, 92, 246, 0.1);
        }
        
        .particle {
          position: absolute;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: twinkle 2s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .progress-bar {
          background: linear-gradient(90deg, #8b5cf6, #ec4899);
          border-radius: 10px;
          height: 8px;
          overflow: hidden;
          position: relative;
        }
        
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: progressShine 2s ease-in-out infinite;
        }
        
        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .achievement-badge {
          animation: badgePopIn 0.5s ease-out;
        }
        
        @keyframes badgePopIn {
          0% { transform: scale(0) rotate(180deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        
        .floating-text {
          animation: floatUp 2s ease-out forwards;
        }
        
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-50px) scale(1.2); opacity: 0; }
        }
        
        #bandit-campaign {
          font-family: 'Rajdhani', sans-serif;
        }
        
        #bandit-campaign button {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          letter-spacing: 0.05em;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          border: 2px solid transparent;
          border-radius: 8px;
          color: white;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-size: 16px;
          padding: 16px 32px;
          position: relative;
          overflow: hidden;
        }
        
        #bandit-campaign button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }
        
        #bandit-campaign button:hover {
          background: linear-gradient(135deg, #7c3aed, #db2777);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(139, 92, 246, 0.4);
          border-color: rgba(139, 92, 246, 0.5);
        }
        
        #bandit-campaign button:hover::before {
          left: 100%;
        }
      `}</style>

      {/* Animated Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}

      {/* Neon grid overlay */}
      <div className="absolute inset-0 neon-grid" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/30 to-black/60" />

      <div className="relative z-10">
        {/* Game HUD */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          <div className="game-card bg-black/90 backdrop-blur-md p-4 rounded-lg glow-effect">
            <div className="flex items-center space-x-4 text-white">
              <div className="flex items-center space-x-2">
                <Gamepad2 className="w-5 h-5 text-purple-400" />
                <span className="game-accent text-sm">LVL {level}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="game-body text-sm">{score}</span>
              </div>
            </div>
            <div className="mt-2">
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>XP</span>
                <span>{xp % 100}/100</span>
              </div>
              <div className="w-32 bg-white/20 rounded-full h-2">
                <div 
                  className="progress-bar h-2"
                  style={{ width: `${(xp % 100)}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="game-card bg-black/90 backdrop-blur-md p-3 rounded-lg glow-effect">
              <div className="flex space-x-2">
                {achievements.map((achievement, index) => (
                  <div key={achievement} className="achievement-badge">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Game Header */}
        <div className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Epic game-style header */}
            <div className="flex items-start justify-between mb-16">
              <div className="flex-1">
                <div className="game-subtitle text-purple-300 text-sm mb-4 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                  DIAMOND ZCHAIN GAMING PROTOCOL
                </div>
                <h1 className="game-title text-white text-8xl md:text-9xl mb-6 animate-pulse">
                  FARM
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
                    $50K
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                    $zLAB
                  </span>
                </h1>
                <div className="flex items-center space-x-4 text-purple-300">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="game-accent text-sm">LIVE CAMPAIGN ACTIVE</span>
                </div>
              </div>

              <div className="text-right text-white/80 game-body text-sm max-w-xs">
                <div className="mb-4">
                  <div className="game-accent text-xs mb-2 text-cyan-400">MISSION #001</div>
                  <div>THE CHAIN AWAKENS</div>
                </div>
                <div className="w-16 h-px bg-gradient-to-r from-purple-400 to-pink-400 ml-auto mb-4" />
                <div className="text-xs leading-relaxed">
                  Join the ultimate DeFi gaming experience. Farm. Battle. Earn. Ascend to legendary status.
                </div>
              </div>
            </div>

            {/* Interactive Game Stats Grid */}
            <div className="grid grid-cols-12 gap-8 mb-16">
              {/* Large feature stat - Interactive */}
              <div 
                className="col-span-12 md:col-span-6 game-card bg-white/95 backdrop-blur-sm p-12 glow-effect"
                data-card="main"
                onClick={() => handleCardClick('main')}
              >
                <div className="game-accent text-purple-600 text-xs mb-4 flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  CAMPAIGN STATUS
                </div>
                <div className="game-title text-6xl text-gray-900 mb-4 flex items-center">
                  ACTIVE
                  <Zap className="w-8 h-8 text-yellow-400 ml-4 animate-bounce" />
                </div>
                <div className="game-body text-gray-600 mb-8">
                  Join <span className="text-purple-600 font-bold">2,847</span> farmers already earning $zLAB tokens through our revolutionary gaming protocol.
                </div>
                <div className="flex items-center game-accent text-purple-600 text-sm group cursor-pointer">
                  <Coins className="w-4 h-4 mr-2 group-hover:animate-spin" />
                  START GAMING <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Interactive reward card */}
              <div 
                className="col-span-6 md:col-span-3 game-card bg-gradient-to-br from-yellow-500/90 to-orange-500/90 backdrop-blur-sm p-8 text-white glow-effect"
                data-card="rewards"
                onClick={() => handleCardClick('rewards')}
              >
                <Trophy className="w-8 h-8 text-white mb-4 animate-bounce" />
                <div className="game-title text-3xl mb-2">$50K</div>
                <div className="game-subtitle text-white/90 text-xs">PRIZE POOL</div>
                <div className="mt-4 bg-white/20 rounded-full h-2">
                  <div className="progress-bar h-2" style={{ width: '67%' }} />
                </div>
              </div>

              <div 
                className="col-span-6 md:col-span-3 game-card bg-gradient-to-br from-purple-600 to-pink-600 p-8 text-white glow-effect"
                data-card="status"
                onClick={() => handleCardClick('status')}
              >
                <Target className="w-8 h-8 mb-4 animate-pulse" />
                <div className="game-title text-3xl mb-2">LIVE</div>
                <div className="game-subtitle text-white/80 text-xs">BATTLE MODE</div>
                <div className="flex items-center mt-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs">2,847 Players</span>
                </div>
              </div>

              {/* Epic quote section */}
              <div className="col-span-12 md:col-span-8 game-card bg-black/80 backdrop-blur-sm border-2 border-purple-500/30 p-12 glow-effect">
                <div className="text-6xl text-purple-400/30 mb-4">"</div>
                <div className="game-body text-white text-xl leading-relaxed mb-6">
                  Welcome to the future of <span className="text-purple-400 font-bold">GameFi</span>. Where DeFi meets epic gaming experiences.
                  Battle for rewards, farm legendary tokens, and ascend to <span className="text-yellow-400 font-bold">immortal status</span>.
                </div>
                <div className="game-accent text-purple-300 text-xs flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  DIAMOND ZCHAIN GAMING COLLECTIVE
                </div>
              </div>

              <div 
                className="col-span-12 md:col-span-4 game-card bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-2 border-purple-400/30 p-8 glow-effect"
                data-card="exclusive"
                onClick={() => handleCardClick('exclusive')}
              >
                <Award className="w-12 h-12 text-purple-400 mb-6 animate-pulse" />
                <div className="game-accent text-purple-400 text-xs mb-2">LEGENDARY ACCESS</div>
                <div className="game-title text-2xl text-white mb-4">Limited Time</div>
                <div className="game-body text-white/80 text-sm mb-4">
                  Exclusive battle pass available. Unlock rare achievements and legendary rewards.
                </div>
                <div className="flex items-center justify-between text-xs text-purple-300">
                  <span>Time Left:</span>
                  <span className="font-bold animate-pulse">47:23:15</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Epic Gaming Portal Section */}
        <div className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8">
                {/* Gaming Portal Header */}
                <div className="game-card bg-gradient-to-br from-purple-900/95 via-pink-900/95 to-purple-900/95 backdrop-blur-sm p-8 mb-6 glow-effect border-2 border-purple-400/50">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="game-accent text-cyan-400 text-xs mb-2 flex items-center">
                        <Gamepad2 className="w-4 h-4 mr-2 animate-pulse" />
                        <span className="animate-pulse">◉ LIVE</span>
                        <Sparkles className="w-4 h-4 ml-2 animate-spin" />
                        BATTLE PORTAL
                      </div>
                      <h2 className="game-title text-4xl text-white mb-2">⚔️ ENTER THE ARENA ⚔️</h2>
                      <div className="text-purple-300 text-sm game-body">
                        Prepare for epic battles • Legendary rewards await • Maximum glory
                      </div>
                    </div>
                    {isLoading && (
                      <div className="flex items-center text-cyan-400 game-body">
                        <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mr-3"></div>
                        <div className="text-right">
                          <div className="text-xs">INITIALIZING</div>
                          <div className="text-xs text-cyan-300">BATTLE SYSTEMS...</div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Battle Stats Row */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-black/40 rounded-lg border border-purple-400/30">
                      <div className="text-yellow-400 text-lg font-bold">2,847</div>
                      <div className="text-xs text-white/60">ACTIVE WARRIORS</div>
                    </div>
                    <div className="text-center p-3 bg-black/40 rounded-lg border border-purple-400/30">
                      <div className="text-green-400 text-lg font-bold">$50,000</div>
                      <div className="text-xs text-white/60">PRIZE POOL</div>
                    </div>
                    <div className="text-center p-3 bg-black/40 rounded-lg border border-purple-400/30">
                      <div className="text-red-400 text-lg font-bold animate-pulse">47:23:15</div>
                      <div className="text-xs text-white/60">TIME REMAINING</div>
                    </div>
                  </div>
                </div>

                {/* Main Gaming Portal */}
                <div className="game-card bg-gradient-to-br from-black/95 via-purple-900/30 to-black/95 backdrop-blur-sm p-8 glow-effect border-2 border-purple-400/50 relative overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
                    <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-cyan-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
                  </div>
                  
                  {/* Portal Frame */}
                  <div className="relative z-10">
                    <div className="border-4 border-purple-400/50 rounded-xl p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm">
                      {/* Gaming HUD overlay */}
                      <div className="flex items-center justify-between mb-4 p-4 bg-black/60 rounded-lg border border-cyan-400/30">
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-green-400 text-sm font-bold">PORTAL ACTIVE</span>
                          <div className="text-cyan-400 text-xs">| SECURITY: MAXIMUM |</div>
                        </div>
                        <div className="flex items-center space-x-2 text-purple-300 text-xs">
                          <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
                          <span>ENERGY: 100%</span>
                        </div>
                      </div>
                      
                      {/* The actual Bandit campaign container with enhanced styling */}
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 rounded-lg pointer-events-none"></div>
                        <div id="bandit-campaign" className="min-h-[600px] rounded-lg relative z-10 border-2 border-purple-300/30 bg-gradient-to-br from-white/95 to-purple-50/95" />
                        
                        {/* Loading overlay */}
                        {isLoading && (
                          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-lg flex items-center justify-center z-20">
                            <div className="text-center">
                              <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                              <div className="text-purple-300 text-lg font-bold mb-2">ENTERING THE ARENA</div>
                              <div className="text-purple-400 text-sm">Preparing battle systems...</div>
                              <div className="flex justify-center mt-4 space-x-1">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Gaming controls bar */}
                      <div className="mt-4 p-4 bg-black/60 rounded-lg border border-purple-400/30">
                        <div className="flex items-center justify-between">
                                                     <div className="flex items-center space-x-4">
                             <button 
                               onClick={handleQuickStart}
                               className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-sm font-bold hover:from-purple-700 hover:to-pink-700 transition-all hover:scale-105 active:scale-95"
                             >
                               🎮 QUICK START
                             </button>
                             <button 
                               onClick={handlePowerBoost}
                               className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg text-sm font-bold hover:from-green-700 hover:to-emerald-700 transition-all hover:scale-105 active:scale-95"
                             >
                               ⚡ POWER BOOST
                             </button>
                           </div>
                          <div className="flex items-center space-x-2 text-cyan-400 text-xs">
                            <Target className="w-4 h-4" />
                            <span>AUTO-TARGET: ON</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 space-y-6">
                {/* Enhanced Mission Briefing */}
                <div className="game-card bg-gradient-to-br from-black/95 via-purple-900/50 to-black/95 backdrop-blur-sm p-8 text-white glow-effect border-2 border-purple-400/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="game-accent text-purple-400 text-xs mb-4 flex items-center">
                      <Trophy className="w-4 h-4 mr-2 animate-bounce" />
                      🎯 MISSION BRIEFING
                    </div>
                    <div className="space-y-6">
                      <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-400/30">
                        <div className="game-body text-yellow-300 text-sm mb-1 flex items-center">
                          <Coins className="w-4 h-4 mr-2" />
                          Prize Pool
                        </div>
                        <div className="game-title text-2xl text-yellow-400 animate-pulse">$50,000 $zLAB</div>
                        <div className="w-full bg-yellow-900/30 rounded-full h-2 mt-2">
                          <div className="progress-bar h-2" style={{ width: '67%' }} />
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-lg border border-red-400/30">
                        <div className="game-body text-red-300 text-sm mb-1 flex items-center">
                          ⏱️ Battle Duration
                        </div>
                        <div className="game-title text-2xl text-red-400 animate-pulse">47:23:15</div>
                        <div className="text-xs text-red-300 mt-1">⚡ URGENT DEPLOYMENT</div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-400/30">
                        <div className="game-body text-cyan-300 text-sm mb-1 flex items-center">
                          🌐 Battlefield
                        </div>
                        <div className="game-title text-2xl text-cyan-400">Diamond ZChain</div>
                        <div className="flex items-center mt-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
                          <span className="text-xs text-cyan-300">NETWORK STABLE</span>
                        </div>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg border border-green-400/30">
                        <div className="game-body text-green-300 text-sm mb-1 flex items-center">
                          👥 Active Warriors
                        </div>
                        <div className="game-title text-2xl text-green-400">2,847</div>
                        <div className="text-xs text-green-300 mt-1">📈 +127 in last hour</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Leaderboard */}
                <div className="game-card bg-gradient-to-br from-yellow-900/30 to-orange-900/30 backdrop-blur-sm border-2 border-yellow-400/50 p-8 glow-effect relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-yellow-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="game-accent text-yellow-400 text-xs mb-6 flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-2 animate-spin" />
                        🏆 HALL OF LEGENDS
                      </div>
                      <div className="text-yellow-300 text-xs animate-pulse">LIVE</div>
                    </div>
                    <div className="space-y-4">
                      {[
                        { rank: 1, name: "CryptoKing", points: 4500, badge: "👑", color: "from-yellow-400 to-yellow-600" },
                        { rank: 2, name: "DeFiMaster", points: 4000, badge: "🥈", color: "from-gray-300 to-gray-500" },
                        { rank: 3, name: "BlockWarrior", points: 3500, badge: "🥉", color: "from-orange-400 to-orange-600" }
                      ].map((player) => (
                        <div key={player.rank} className="p-3 bg-black/60 rounded-lg border border-yellow-400/20 hover:border-yellow-400/50 transition-all hover:scale-102">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${player.color} flex items-center justify-center text-sm font-bold text-white shadow-lg`}>
                                {player.badge}
                              </div>
                              <div>
                                <div className="text-white font-bold text-sm">{player.name}</div>
                                <div className="text-yellow-300 text-xs">Level {10 + player.rank}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-yellow-400 font-bold text-sm">{player.points.toLocaleString()}</div>
                              <div className="text-yellow-300 text-xs">pts</div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="text-center pt-2">
                        <button className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white rounded-lg text-xs font-bold hover:from-yellow-700 hover:to-orange-700 transition-all hover:scale-105">
                          🚀 VIEW FULL LEADERBOARD
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Power-up System */}
                <div className="game-card bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-2 border-purple-400/30 p-8 glow-effect relative overflow-hidden">
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-pink-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                  <div className="relative z-10">
                    <div className="game-accent text-white text-xs mb-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
                        ⚡ POWER SYSTEMS
                      </div>
                      <div className="text-purple-300 text-xs">ONLINE</div>
                    </div>
                    <div className="game-title text-white text-xl mb-4">Bandit Gaming Network</div>
                    <div className="game-body text-white/80 text-sm mb-6">
                      Next-generation gaming infrastructure for DeFi warriors and legendary farmers.
                    </div>
                    
                    {/* Power-up buttons */}
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg text-sm font-bold hover:from-purple-700 hover:to-purple-800 transition-all hover:scale-105 flex items-center justify-between">
                        <span>🚀 SPEED BOOST</span>
                        <span className="text-xs text-purple-200">2x Multiplier</span>
                      </button>
                      <button className="w-full p-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-lg text-sm font-bold hover:from-pink-700 hover:to-pink-800 transition-all hover:scale-105 flex items-center justify-between">
                        <span>💰 GOLD RUSH</span>
                        <span className="text-xs text-pink-200">5min Duration</span>
                      </button>
                      <button className="w-full p-3 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-lg text-sm font-bold hover:from-cyan-700 hover:to-cyan-800 transition-all hover:scale-105 flex items-center justify-between">
                        <span>🛡️ SHIELD MODE</span>
                        <span className="text-xs text-cyan-200">Protection</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

declare global {
  interface Window {
    Bandit: any
  }
}

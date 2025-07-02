"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Zap, Target, Award } from "lucide-react"

export default function CampaignPage() {
  const [isLoading, setIsLoading] = useState(true)

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
    return () => document.head.removeChild(script)
  }, [])

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:
          "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Banner%20758k-X8Wejmi1r1nE6fAKmVITK7PKXPj3kR.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Editorial Typography & Layout Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');
        
        .editorial-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          letter-spacing: -0.02em;
          line-height: 0.9;
        }
        
        .editorial-subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        
        .editorial-body {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.6;
        }
        
        .editorial-accent {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        
        .grid-lines {
          background-image: 
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .editorial-card {
          position: relative;
          overflow: hidden;
        }
        
        .editorial-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #8b5cf6, #ec4899, #06b6d4);
        }
        
        #bandit-campaign {
          font-family: 'Inter', sans-serif;
        }
        
        #bandit-campaign button {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: 0.025em;
          background: linear-gradient(135deg, #8b5cf6, #ec4899);
          border: none;
          border-radius: 0;
          color: white;
          transition: all 0.3s ease;
          text-transform: uppercase;
          font-size: 14px;
          padding: 16px 32px;
        }
        
        #bandit-campaign button:hover {
          background: linear-gradient(135deg, #7c3aed, #db2777);
          transform: translateX(4px);
        }
      `}</style>

      {/* Grid overlay for editorial feel */}
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10">
        {/* Editorial Header */}
        <div className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            {/* Magazine-style header */}
            <div className="flex items-start justify-between mb-16">
              <div className="flex-1">
                <div className="editorial-subtitle text-white/70 text-sm mb-4">DIAMOND ZCHAIN PRESENTS</div>
                <h1 className="editorial-title text-white text-8xl md:text-9xl mb-6">
                  FARM
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    $50K
                  </span>
                  <br />
                  $zLAB
                </h1>
              </div>

              <div className="text-right text-white/80 editorial-body text-sm max-w-xs">
                <div className="mb-4">
                  <div className="editorial-accent text-xs mb-2">ISSUE #001</div>
                  <div>THE CHAIN REMEMBERS</div>
                </div>
                <div className="w-16 h-px bg-white/40 ml-auto mb-4" />
                <div className="text-xs leading-relaxed">
                  An exclusive campaign designed for the next generation of DeFi farmers. Limited time. Maximum rewards.
                </div>
              </div>
            </div>

            {/* Editorial Stats Grid */}
            <div className="grid grid-cols-12 gap-8 mb-16">
              {/* Large feature stat */}
              <div className="col-span-12 md:col-span-6 editorial-card bg-white/95 backdrop-blur-sm p-12">
                <div className="editorial-accent text-purple-600 text-xs mb-4">LIVE CAMPAIGN</div>
                <div className="editorial-title text-6xl text-gray-900 mb-4">ACTIVE</div>
                <div className="editorial-body text-gray-600 mb-8">
                  Join thousands of farmers already earning $zLAB tokens through our revolutionary staking mechanism.
                </div>
                <div className="flex items-center editorial-accent text-purple-600 text-sm">
                  START FARMING <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>

              {/* Smaller stats */}
              <div className="col-span-6 md:col-span-3 editorial-card bg-black/80 backdrop-blur-sm p-8 text-white">
                <Zap className="w-8 h-8 text-yellow-400 mb-4" />
                <div className="editorial-title text-3xl mb-2">$50K</div>
                <div className="editorial-subtitle text-yellow-400/80 text-xs">TOTAL REWARDS</div>
              </div>

              <div className="col-span-6 md:col-span-3 editorial-card bg-gradient-to-br from-purple-600 to-pink-600 p-8 text-white">
                <Target className="w-8 h-8 mb-4" />
                <div className="editorial-title text-3xl mb-2">LIVE</div>
                <div className="editorial-subtitle text-white/80 text-xs">STATUS</div>
              </div>

              {/* Quote section */}
              <div className="col-span-12 md:col-span-8 editorial-card bg-white/10 backdrop-blur-sm border border-white/20 p-12">
                <div className="text-6xl text-white/20 mb-4">"</div>
                <div className="editorial-body text-white text-xl leading-relaxed mb-6">
                  The future of DeFi farming is here. Diamond ZChain's innovative approach to yield generation
                  represents a paradigm shift in how we think about decentralized finance.
                </div>
                <div className="editorial-accent text-white/70 text-xs">— DIAMOND ZCHAIN FOUNDATION</div>
              </div>

              <div className="col-span-12 md:col-span-4 editorial-card bg-white/95 backdrop-blur-sm p-8">
                <Award className="w-12 h-12 text-purple-600 mb-6" />
                <div className="editorial-accent text-purple-600 text-xs mb-2">EXCLUSIVE ACCESS</div>
                <div className="editorial-title text-2xl text-gray-900 mb-4">Limited Time</div>
                <div className="editorial-body text-gray-600 text-sm">
                  This campaign is available for a limited time only. Don't miss your chance to be part of the
                  revolution.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campaign Widget Section */}
        <div className="px-8 pb-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8">
                <div className="editorial-card bg-white/98 backdrop-blur-sm p-12">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <div className="editorial-accent text-purple-600 text-xs mb-2">CAMPAIGN PORTAL</div>
                      <h2 className="editorial-title text-4xl text-gray-900">Join the Farm</h2>
                    </div>
                    {isLoading && (
                      <div className="flex items-center text-purple-600 editorial-body">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600 mr-3"></div>
                        Loading Portal...
                      </div>
                    )}
                  </div>

                  <div id="bandit-campaign" className="min-h-[600px]" />
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 space-y-8">
                <div className="editorial-card bg-black/90 backdrop-blur-sm p-8 text-white">
                  <div className="editorial-accent text-purple-400 text-xs mb-4">CAMPAIGN DETAILS</div>
                  <div className="space-y-6">
                    <div>
                      <div className="editorial-body text-white/60 text-sm mb-1">Prize Pool</div>
                      <div className="editorial-title text-2xl">$50,000 $zLAB</div>
                    </div>
                    <div>
                      <div className="editorial-body text-white/60 text-sm mb-1">Duration</div>
                      <div className="editorial-title text-2xl">Limited Time</div>
                    </div>
                    <div>
                      <div className="editorial-body text-white/60 text-sm mb-1">Network</div>
                      <div className="editorial-title text-2xl">Diamond ZChain</div>
                    </div>
                  </div>
                </div>

                <div className="editorial-card bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/20 p-8">
                  <div className="editorial-accent text-white text-xs mb-4">POWERED BY</div>
                  <div className="editorial-title text-white text-xl mb-4">Bandit Network</div>
                  <div className="editorial-body text-white/80 text-sm">
                    Advanced campaign infrastructure for the next generation of DeFi.
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

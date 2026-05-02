import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#2A7BFF] to-[#1a5fd9]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-white blur-3xl" />
          <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-[#6DD3B0] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
                <svg
                  className="h-5 w-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
                <span className="text-sm font-semibold text-white">AI-Powered Travel Planning</span>
              </div>

              <h1 className="mb-6 text-5xl leading-tight font-bold text-white sm:text-6xl lg:text-7xl">
                Turn Your Travel Dream into Reality{" "}
                <span className="text-[#FF8C42]">(faster)!</span>
              </h1>

              <p className="mb-10 max-w-2xl text-xl leading-relaxed text-white">
                Let our AI assistant create personalized travel itineraries tailored to your
                preferences, budget, and style. Plan smarter, travel better.
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  href="/plan/destination"
                  className="inline-flex transform items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-[#2A7BFF] shadow-xl transition-all hover:-translate-y-1 hover:bg-gray-50 hover:shadow-2xl"
                >
                  Start Planning
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>

                <button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white/40 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  See How It Works
                </button>
              </div>
            </div>

            {/* Right: Travel Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative h-[500px] w-full">
                <svg viewBox="0 0 500 500" className="h-full w-full drop-shadow-2xl">
                  {/* Outer glow circles */}
                  <circle cx="250" cy="250" r="200" fill="#6DD3B0" opacity="0.15" />
                  <circle cx="250" cy="250" r="160" fill="#6DD3B0" opacity="0.2" />

                  {/* Main globe */}
                  <circle cx="250" cy="250" r="130" fill="white" stroke="#E5E7EB" strokeWidth="2" />

                  {/* Continents - more realistic shapes */}
                  <path
                    d="M 180 220 Q 200 210 220 220 Q 240 230 250 240 Q 260 250 250 270 Q 240 280 220 275 Q 200 270 190 260 Q 180 250 180 235 Z"
                    fill="#2A7BFF"
                    opacity="0.4"
                  />
                  <path
                    d="M 270 200 Q 290 195 310 205 Q 320 215 315 230 Q 310 245 295 250 Q 280 255 270 245 Q 265 235 270 220 Z"
                    fill="#2A7BFF"
                    opacity="0.4"
                  />
                  <path
                    d="M 210 280 Q 230 275 250 285 Q 265 295 260 310 Q 255 325 240 330 Q 225 335 215 325 Q 205 315 210 300 Z"
                    fill="#2A7BFF"
                    opacity="0.4"
                  />

                  {/* Latitude/longitude lines */}
                  <ellipse
                    cx="250"
                    cy="250"
                    rx="130"
                    ry="40"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <ellipse
                    cx="250"
                    cy="250"
                    rx="130"
                    ry="80"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    opacity="0.5"
                  />
                  <line
                    x1="120"
                    y1="250"
                    x2="380"
                    y2="250"
                    stroke="#E5E7EB"
                    strokeWidth="1"
                    opacity="0.5"
                  />

                  {/* Airplane with trail */}
                  <g transform="translate(390, 160) rotate(45)">
                    <path d="M 0 0 L -25 -6 L -18 0 L -25 6 Z" fill="#FF8C42" />
                    <path
                      d="M -10 -10 L -10 10"
                      stroke="#FF8C42"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                    <circle cx="0" cy="0" r="4" fill="#FF8C42" />
                  </g>
                  <path
                    d="M 200 150 Q 280 120 390 160"
                    stroke="#FF8C42"
                    strokeWidth="2"
                    strokeDasharray="8,4"
                    fill="none"
                    opacity="0.6"
                  />

                  {/* Location pins - modern style */}
                  <g transform="translate(200, 150)">
                    <path
                      d="M 0 0 C -6 -8 -10 -16 -10 -24 C -10 -32 -6 -38 0 -40 C 6 -38 10 -32 10 -24 C 10 -16 6 -8 0 0 Z"
                      fill="#FF8C42"
                    />
                    <circle cx="0" cy="-28" r="6" fill="white" />
                  </g>

                  <g transform="translate(330, 290)">
                    <path
                      d="M 0 0 C -6 -8 -10 -16 -10 -24 C -10 -32 -6 -38 0 -40 C 6 -38 10 -32 10 -24 C 10 -16 6 -8 0 0 Z"
                      fill="#6DD3B0"
                    />
                    <circle cx="0" cy="-28" r="6" fill="white" />
                  </g>

                  <g transform="translate(290, 190)">
                    <path
                      d="M 0 0 C -6 -8 -10 -16 -10 -24 C -10 -32 -6 -38 0 -40 C 6 -38 10 -32 10 -24 C 10 -16 6 -8 0 0 Z"
                      fill="#2A7BFF"
                    />
                    <circle cx="0" cy="-28" r="6" fill="white" />
                  </g>

                  {/* Travel icons around globe */}
                  <g transform="translate(140, 330)">
                    <rect x="-18" y="-12" width="36" height="24" rx="4" fill="#2A7BFF" />
                    <circle cx="0" cy="0" r="9" fill="white" />
                    <circle cx="0" cy="0" r="5" fill="#2A7BFF" />
                    <rect x="-12" y="-16" width="24" height="4" rx="2" fill="#2A7BFF" />
                  </g>

                  <g transform="translate(360, 360)">
                    <rect x="-14" y="-10" width="28" height="20" rx="3" fill="#6DD3B0" />
                    <rect x="-10" y="-14" width="20" height="4" rx="2" fill="#6DD3B0" />
                    <line x1="-14" y1="-2" x2="14" y2="-2" stroke="white" strokeWidth="2.5" />
                    <line x1="-14" y1="4" x2="14" y2="4" stroke="white" strokeWidth="2.5" />
                  </g>

                  <g transform="translate(170, 390)">
                    <rect x="-12" y="-16" width="24" height="32" rx="2" fill="#FF8C42" />
                    <circle cx="0" cy="-6" r="5" fill="white" />
                    <line x1="-8" y1="6" x2="8" y2="6" stroke="white" strokeWidth="2" />
                    <line x1="-8" y1="11" x2="8" y2="11" stroke="white" strokeWidth="2" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute right-0 bottom-0 left-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold text-black sm:text-5xl">
              Why Choose Our AI Travel Planner?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-black">
              Experience the future of travel planning with intelligent recommendations and
              personalized itineraries
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-10 shadow-lg transition-all duration-300 hover:border-[#2A7BFF]/20 hover:shadow-2xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2A7BFF] to-[#1a5fd9] transition-transform duration-300 group-hover:scale-110">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-black">Lightning Fast</h3>
              <p className="text-lg leading-relaxed text-black">
                Get a complete travel itinerary in minutes, not hours. Our AI works at the speed of
                thought to plan your perfect trip.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-10 shadow-lg transition-all duration-300 hover:border-[#6DD3B0]/20 hover:shadow-2xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#6DD3B0] to-[#4bc9a3] transition-transform duration-300 group-hover:scale-110">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-black">Personalized</h3>
              <p className="text-lg leading-relaxed text-black">
                Every itinerary is tailored to your unique preferences, budget, and travel style.
                Your trip, your way.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group rounded-2xl border border-gray-100 bg-white p-10 shadow-lg transition-all duration-300 hover:border-[#FF8C42]/20 hover:shadow-2xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#e67a2e] transition-transform duration-300 group-hover:scale-110">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-bold text-black">Fully Flexible</h3>
              <p className="text-lg leading-relaxed text-black">
                Easily adjust your plan on the fly. Our AI adapts to your changes in real-time for
                seamless replanning.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-24 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-4xl font-bold text-black sm:text-5xl">How It Works</h2>
            <p className="mx-auto max-w-3xl text-xl text-black">
              From dream destination to detailed itinerary in 5 simple steps
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {[
              {
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Choose Destination",
                desc: "Tell us where you want to go and when",
              },
              {
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                    />
                  </svg>
                ),
                title: "Check Weather",
                desc: "Get forecast and packing recommendations",
              },
              {
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
                title: "Set Preferences",
                desc: "Share your travel style and interests",
              },
              {
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                ),
                title: "Select Places",
                desc: "Pick from AI-curated recommendations",
              },
              {
                icon: (
                  <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ),
                title: "Get Itinerary",
                desc: "Receive your personalized travel plan",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="group rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-md transition-all duration-300 hover:shadow-xl">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-[#2A7BFF] to-[#6DD3B0] text-white transition-transform duration-300 group-hover:scale-110">
                    {step.icon}
                  </div>
                  <div className="mb-3 text-sm font-bold text-[#2A7BFF]">Step {index + 1}</div>
                  <h4 className="mb-3 text-lg font-bold text-black">{step.title}</h4>
                  <p className="text-sm leading-relaxed text-black">{step.desc}</p>
                </div>
                {index < 4 && (
                  <div className="absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 transform md:block">
                    <svg className="h-6 w-6 text-[#2A7BFF]" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/plan/destination"
              className="inline-flex transform items-center justify-center gap-3 rounded-xl bg-linear-to-r from-[#2A7BFF] to-[#6DD3B0] px-12 py-5 text-lg font-semibold text-white transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              Start Your Journey Now
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

// Made with Bob

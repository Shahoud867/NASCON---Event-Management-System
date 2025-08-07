import { Link } from 'react-router-dom'
import { Calendar, Users, Trophy, MapPin } from 'lucide-react'

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        {/* Decorative background accents */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-10 -right-10 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 h-24 w-24 rounded-full bg-white/15 blur-xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm shadow-sm">
              <Calendar className="h-4 w-4" />
              <span>National Student Convention</span>
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Welcome to{' '}
              <span className="inline-block underline decoration-white/30 decoration-4 underline-offset-8">
                NASCON
              </span>
            </h1>

            <p className="text-xl md:text-2xl mt-6 text-primary-50">
              National Student Convention - Where Innovation Meets Opportunity
            </p>

            <p className="text-lg mt-6 text-primary-100/90 max-w-3xl mx-auto leading-relaxed">
              Join students from universities across the nation for an exciting
              event featuring competitions, workshops, networking sessions, and much more.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 font-semibold text-primary-700 shadow-lg shadow-black/10 ring-1 ring-white/30 transition-all hover:bg-primary-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white focus-visible:ring-offset-primary-700"
              >
                Register Now
              </Link>
              <Link
                to="/events"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white text-white px-8 py-3 font-semibold transition-all hover:bg-white hover:text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                View Events
              </Link>
            </div>

            {/* Quick stats strip */}
            <div className="mt-10 inline-flex items-center gap-6 rounded-full bg-white/10 px-6 py-3 text-sm backdrop-blur-md ring-1 ring-white/20">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Thousands of Participants</span>
              </div>
              <span className="h-4 w-px bg-white/30" />
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Nationwide Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Why Participate in NASCON?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover opportunities, showcase your skills, and connect with like-minded students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary-50 ring-8 ring-primary-50 transition-all group-hover:scale-105">
                <Trophy className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                Win Prizes
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Compete in various categories and win exciting prizes and recognition
              </p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Card 2 */}
            <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary-50 ring-8 ring-primary-50 transition-all group-hover:scale-105">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                Network
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Connect with students, professionals, and industry experts
              </p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Card 3 */}
            <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary-50 ring-8 ring-primary-50 transition-all group-hover:scale-105">
                <Calendar className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                Learn
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Attend workshops and sessions to enhance your skills
              </p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>

            {/* Card 4 */}
            <div className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-primary-50 ring-8 ring-primary-50 transition-all group-hover:scale-105">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                Explore
              </h3>
              <p className="text-gray-600 text-center leading-relaxed">
                Visit different venues and experience the campus atmosphere
              </p>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm sm:px-12">
            {/* subtle gradient corners */}
            <div className="pointer-events-none absolute -top-10 -left-10 h-40 w-40 rounded-full bg-primary-100 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-primary-100 blur-2xl" />

            <h2 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Ready to Join NASCON?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Don&apos;t miss out on this incredible opportunity to showcase your talents,
              learn from experts, and make lasting connections.
            </p>
            <Link
              to="/register"
              className="btn-primary inline-flex items-center justify-center rounded-xl text-lg px-8 py-3 font-semibold shadow-md transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

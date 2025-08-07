import { useAuthStore } from '../stores/authStore'

const Dashboard = () => {
  const { user } = useAuthStore()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back, {user?.name}! Here's your NASCON dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User Info Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Profile</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user?.name}</p>
            <p><span className="font-medium">Email:</span> {user?.email}</p>
            <p><span className="font-medium">Role:</span> {user?.role}</p>
            <p><span className="font-medium">Status:</span> {user?.status}</p>
            {user?.university && (
              <p><span className="font-medium">University:</span> {user.university}</p>
            )}
            {user?.city && (
              <p><span className="font-medium">City:</span> {user.city}</p>
            )}
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full btn-primary">
              View Events
            </button>
            <button className="w-full btn-secondary">
              My Registrations
            </button>
            <button className="w-full btn-secondary">
              Update Profile
            </button>
          </div>
        </div>

        {/* Stats Card */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Events Registered:</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Workshops Attended:</span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span>Total Score:</span>
              <span className="font-semibold">0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className="mt-8">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon</h3>
          <p className="text-gray-600">
            More dashboard features will be available in the next phases, including:
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
            <li>Event registration and management</li>
            <li>Payment tracking</li>
            <li>Accommodation requests</li>
            <li>Score tracking and leaderboards</li>
            <li>AI-powered event recommendations</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

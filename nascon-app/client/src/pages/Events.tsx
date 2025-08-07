const Events = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <p className="text-gray-600 mt-2">
          Discover and register for exciting NASCON events.
        </p>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Coming Soon</h3>
        <p className="text-gray-600">
          The events page will be fully implemented in Phase 2. You'll be able to:
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
          <li>Browse all available events</li>
          <li>Filter events by category</li>
          <li>View event details and schedules</li>
          <li>Register for events</li>
          <li>Track your registrations</li>
          <li>View venue information</li>
        </ul>
      </div>
    </div>
  )
}

export default Events

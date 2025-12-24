import React from 'react'

const Test = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Test Page - Working!</h1>
      <p className="text-gray-600 mb-4">If you can see this, React is working correctly.</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Debug Info:</h2>
        <ul className="space-y-2">
          <li>✅ React is running</li>
          <li>✅ Components are loading</li>
          <li>✅ CSS is working</li>
          <li>✅ Routing should work</li>
        </ul>
        <a href="/" className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Go to Home
        </a>
      </div>
    </div>
  )
}

export default Test
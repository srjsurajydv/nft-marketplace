import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <nav className="p-3 bg-stone-800">
        <div className="flex mt-1">
          <img src="https://assets.upstox.com/content/dam/aem-content-integration/assets/images/logos/LTI/square_LTI_com.png" width="40" height="40" alt="LTI" />
          <p className="text-3xl text-white font-bold font-mono">&nbsp;NFT Marketplace</p>
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4 ml-8">

              <a href="/" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium font-mono">Home</a>

              <a href="/marketplace" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium font-mono">Marketplace</a>

              <a href="/create-item" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium font-mono">Create NFT</a>

              <a href="/my-assets" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium font-mono">My NFTs</a>

              <a href="/creator-dashboard" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md text-lg font-medium font-mono">My Dashboard</a>

            </div>
          </div>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
import '../styles/globals.css'
import Link from 'next/link'
import { FaBars } from "react-icons/fa";
import { useState } from 'react';

function MyApp({ Component, pageProps }) {

  const [open, setOpen] = useState(false)

  const handletoggle = () => setOpen(!open)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div style={{"backgroundColor": '#00001a'}}>
      <nav className=" px-3 md:flex md:items-center md:justify-between w-full sticky top-0 z-50" style={{"backgroundColor": '#00001a'}}>
        <div className="flex justify-between items-center w-full">
          
         <div className='flex flex-row items-center'>
            <div>
              <img src="https://assets.upstox.com/content/dam/aem-content-integration/assets/images/logos/LTI/square_LTI_com.png"  alt="LTI" 
                className='md:w-10 sm:w-3 xs:w-3 md:h-10'
              />
            </div>
            <div>
              <p className="text-3xl font-bold text-white font-mono" style={{ fontFamily: 'unset'}}>&nbsp;NFT Bazaar</p>
            </div>
         </div>
         <div className="block ml-auto sm:hidden" >
              <button className="border-none outline-none text-gray-300 px-3 py-2 font-medium font-mono" onClick={handletoggle}><FaBars /></button>
            </div>
          <div className="hidden sm:ml-2 sm:block xl:ml-60 md:ml-0" >

          {/* <div className='xl:text-3xl lg:text-3xl md:text-3xl sm:text-xl absolute right-8 top-6 cursor-pointer md:hidden'>
            <img src="/images/logo.png" alt="" />
            </div> */}

            <div className="flex space-x-4 lg:ml-60 md:ml-8 sm:ml-8 w-5/5">


              <ul className='md:flex md:items-center z-[-1] md:z-auto md:static absolute w-full left-0 py-1 md:pl-0 pl-7 md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500'>
                <li className='mx-2 my-4 '>
                  <a href="/" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md lg:text-lg md:text-sm xl:text-sm xl:font-bold sm:text-md font-medium font-mono">HOME</a>
                </li>
                <li className='mx-2 my-4 md:my-0 duration-500'>
                  <a href="/marketplace" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md lg:text-lg md:text-sm xl:text-sm xl:font-bold sm:text-md font-medium font-mono">MARKETPLACE</a>
                </li>
                <li className='mx-2 my-4 md:my-0 duration-500'>
                  <a href="/mintNFT" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md lg:text-lg md:text-sm xl:text-sm xl:font-bold sm:text-md font-medium font-mono">CREATE NFT</a>
                </li>
                <li className='mx-2 my-4 md:my-0 duration-500'>
                  <a href="/ownedNFTs" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md lg:text-lg md:text-sm xl:text-sm xl:font-bold sm:text-md font-medium font-mono">MY NFTs</a>
                </li>
                <li className='mx-2 my-4 md:my-0 duration-500'>
                  <a href="/listedNFTs" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md lg:text-lg md:text-sm xl:text-sm xl:font-bold sm:text-md font-medium font-mono">MY DASHBOARD</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className={`mobile-nav bg-gray-900 ${open? 'block': 'hidden'}`}>
          <ul>
            <li className='px-2 py-4'>
              <a href="/" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md lg:text-lg md:text-sm xl:text-lg sm:text-md font-medium font-mono" onClick={handleClose}>HOME</a>
            </li>
            <li className='px-2 py-4 md:my-0 duration-500'>
              <a href="/marketplace" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md lg:text-lg md:text-sm xl:text-lg sm:text-md font-medium font-mono " onClick={handleClose}>MARKETPLACE</a>
            </li>
            <li className='px-2 py-4 md:my-0 duration-500'>
              <a href="/mintNFT" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md lg:text-lg md:text-sm xl:text-lg sm:text-md font-medium font-mono" onClick={handleClose}>CREATE NFT</a>
            </li>
            <li className='px-2 py-4 md:my-0 duration-500'>
              <a href="/ownedNFTs" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md lg:text-lg md:text-sm xl:text-lg sm:text-md font-medium font-mono " onClick={handleClose}>MY NFTs</a>
            </li>
            <li className='px-2 py-4 md:my-0 duration-500'>
              <a href="/listedNFTs" className="text-gray-300 hover:bg-blue-900 hover:text-white px-3 py-2 rounded-md lg:text-lg md:text-sm xl:text-lg sm:text-md font-medium font-mono" onClick={handleClose}>MY DASHBOARD</a>
            </li>
          </ul>
      </div>
      <Component {...pageProps} />
      <div className='footer flex-col md:flex-row sm:flex-row justify-center items-center' style={{ marginTop: '0px', width: '100%', padding: '80px 15%', background: '#00001a', color: '#efefef', display: 'flex', fontFamily: 'unset' }}>
        <div className='col-1 sm:-ml-10' style={{ textAlign: 'center' }}>
          <h3 style={{ fontWeight: 300, marginBottom: '30px', letterSpacing: '1px' }}>HELP</h3>
          <a href='#' style={{ display: 'block', color: '#efefef', marginBottom: '5px' }}>MARKETPLACE</a>
          <a href='#' style={{ display: 'block', color: '#efefef', marginBottom: '5px' }} >MY NFT</a>
          <a href='#' style={{ display: 'block', color: '#efefef', marginBottom: '5px' }}>EMAIL</a>
          <a href='#' style={{ display: 'block', color: '#efefef', marginBottom: '5px' }}>BLOG</a>
        </div>
        <div className='col-2 md:ml-20 lg:ml-60 sm:ml-12' style={{ textAlign: 'center'}}>
          <h3 style={{ fontWeight: 300, marginBottom: '30px', letterSpacing: '1px' }}>NEWSLETTER</h3>
          <form>
            <input type='email' required placeholder='Your Email Address' style={{ width: '300px', height: '45px', borderRadius: '4px', textAlign: 'center', marginTop: '10px', marginBottom: '25px', outline: 'none', border: 'none', color: 'black' }}></input>
            <br />
            <button type='button' style={{ background: 'transparent', border: '2px solid #fff', color: '#fff', borderRadius: '30px', padding: '10px 30px', fontSize: '15px', cursor: 'pointer' }}>SUBSCRIBE NOW</button>
          </form>
          <div className='flex justify-center sm:mb-14' style={{ marginTop: '30px' }}>
            <div>
              <div>Copyright &copy; {new Date().getFullYear()}</div>
            </div>
          </div>
        </div>
        <div className='col-3 md:ml-20 lg:ml-44 sm:ml-12 sm:mt-18' style={{ textAlign: 'center', marginLeft: {md: '150px', lg: '150px'},  marginTop: {sm: "20px"}}}>
          <h3 style={{ fontWeight: 300, marginBottom: '40px', letterSpacing: '1px' }}>CONTACT</h3>
          <p>L&T Infotech <br />
            Hinjewadi, Pune Maharastra
            +91- 88XXXXXXXX
          </p>
        </div>
      </div>
    </div>

  )
}

export default MyApp
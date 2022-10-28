import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
    nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function MyAssets() {
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()
    }, [])

    // useEffect(() => {
    //     if (window.ethereum) {
       
    //       window.ethereum.on("accountsChanged", () => {
    //         window.location.reload();
    //       });
    //     }
    //   });

    async function loadNFTs() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const data = await marketContract.fetchMyNFTs()
        const items = await Promise.all(data.map(async i => {
            var tokenUri = await tokenContract.tokenURI(i.tokenId)
            const tmp = tokenUri.split("//")
            tokenUri = 'https://ipfs.io/ipfs/' + tmp[1]
            const meta = await fetch(tokenUri)
            const json = await meta.json()
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            const imgLink = json.image
            const tmp1 = imgLink.split("//")
            const imgurl = 'https://ipfs.io/ipfs/' + tmp1[1]
            const imageURL = await axios.get(imgurl)
            let item = {
              price,
              tokenId: i.tokenId.toNumber(),
              seller: i.seller,
              owner: i.owner,
              image: imageURL.data,
              name: json.name,
              description: json.description,
            }
            return item
          }))
          
        setNfts(items)
        setLoadingState('loaded')
    }

    // async function createSale(tokenID) {
    //     const web3Modal = new Web3Modal()
    //     const connection = await web3Modal.connect()
    //     const provider = new ethers.providers.Web3Provider(connection)
    //     const signer = provider.getSigner()
    //     const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    //     const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    //     const url = await tokenContract.tokenURI(tokenID)
    //     try {
    //         let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
    //         let transaction = await contract.createToken(url)
    //         let tx = await transaction.wait()

    //         let tokenId = tokenID

    //         const price = ethers.utils.parseUnits("0.0034", 'ether')

    //         contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    //         let listingPrice = await contract.getListingPrice()
    //         listingPrice = listingPrice.toString()

    //         transaction = await contract.createMarketItem(
    //             nftaddress, tokenId, price, { value: listingPrice }
    //         )
    //         await transaction.wait()
    //         loadNFTs()
    //     } catch (error) {
    //         console.log(error)
    //         alert("Transaction Failed \nPlease try again.")
    //     }
    // }

    if (loadingState === 'loaded' && !nfts.length) return (
        <h1 className="py-10 px-20 text-3xl text-white" style={{ backgroundColor: '#1a1a1a', minHeight: '530px' }}>No NFTs owned</h1>
    )

    return (
        <div className="flex justify-center" style={{ backgroundColor: '#1a1a1a' }}>
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {
                        nfts.map((nft, i) => (
                            <div key={i} className="border shadow rounded-xl overflow-hidden">
                                <img src={nft.image} className="rounded" width="500" height="500" />
                                <div className="p-4">
                                    <p style={{ height: '32px' }} className="text-2xl font-semibold">{nft.name}</p>
                                    <div style={{ overflow: 'hidden' }}>
                                        <p className="text-gray-400">{nft.description}</p>
                                    </div>
                                </div>
                                <div className="p-4 bg-black">
                                    <p className="text-2xl font-bold text-white">Price - {nft.price} Matic</p>
                                    {/* <button className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-12 rounded"
                                        onClick={() => createSale(nft.tokenId)}>Sell</button> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
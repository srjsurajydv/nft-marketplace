import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'

import {
    nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function CreatorDashboard() {
    const [nfts, setNfts] = useState([])
    const [sold, setSold] = useState([])

    const [loadingState, setLoadingState] = useState('not-loaded')

    useEffect(() => {
        loadNFTs()
    }, [])

    useEffect(() => {
        if (window.ethereum) {

            window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            });
        }
    });

    async function loadNFTs() {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const data = await marketContract.fetchItemsCreated()

        const items = await Promise.all(data.map(async i => {
            var tokenUri = await tokenContract.tokenURI(i.tokenId)
            tokenUri = tokenUri.replace('ipfs://', 'https://ipfs.io/ipfs/')
            const meta = await fetch(tokenUri)
            const json = await meta.json()
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            const imgLink = json.image.replace('ipfs://', 'https://ipfs.io/ipfs/')
            const imageURL = await axios.get(imgLink)
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                sold: i.sold,
                image: imageURL.data,
                name: json.name,
                description: json.description,
            }
            return item
        }))

        const soldItems = items.filter(i => i.sold)
        setSold(soldItems)
        setNfts(items)
        setLoadingState('loaded')
    }

    if (loadingState === 'loaded' && !nfts.length) return (
        <div style={{ backgroundColor: '#000033' }}>
            <p className="px-20 py-10 text-3xl font-semibold text-white">No NFTs listed</p>
        </div>
    )

    return (
        <div style={{ backgroundColor: '#000033' }}>
            <div className="p-4 text-white">
                <h2 className="text-2xl py-2 text-white">Items Created</h2>
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
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='px-4'>
                {
                    Boolean(sold.length) && (
                        <div>
                            <h2 className="text-2xl py-2 text-white">Items Sold</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                                {
                                    sold.map((nft, i) => (
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
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
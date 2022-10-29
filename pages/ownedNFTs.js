import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from 'web3modal'
import { useRouter } from 'next/router'

import {
    nftaddress, nftmarketaddress
} from '../config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'

export default function MyAssets() {
    const [resalePrice, updateresalePrice] = useState({ price: '' })
    const [nfts, setNfts] = useState([])
    const [loadingState, setLoadingState] = useState('not-loaded')
    const router = useRouter()

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
        const data = await marketContract.fetchMyNFTs()
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
                image: imageURL.data,
                name: json.name,
                description: json.description,
            }
            return item
        }))

        setNfts(items)
        setLoadingState('loaded')
    }

    if (loadingState === 'loaded' && !nfts.length) return (
        <div style={{ backgroundColor: '#000033', minHeight: '25rem'}}>
            <p className="px-20 py-10 text-3xl font-semibold text-white">No NFTs owned</p>
        </div>
    )

    return (
        <div className="flex justify-center" style={{ backgroundColor: '#000033' }}>
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                    {
                        nfts.map((nft, i) => {
                            async function executeRelist() {
                                const { price } = resalePrice
                                // const price = prompt("Please enter the price")
                                if (!price) return
                                try {
                                    relistNFT()
                                } catch (error) {
                                    alert("Transaction Failed!")
                                    console.log('Transaction Failed', error)
                                }
                            }
                            async function relistNFT() {
                                const web3Modal = new Web3Modal()
                                const connection = await web3Modal.connect()
                                const provider = new ethers.providers.Web3Provider(connection)
                                const signer = provider.getSigner()
                                const price = ethers.utils.parseUnits(resalePrice.price, 'ether')
                                const contractnft = new ethers.Contract(nftaddress, NFT.abi, signer);
                                await contractnft.setApprovalForAll(nftmarketaddress, true);
                                let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
                                let listingFee = await contract.getListingPrice()
                                listingFee = listingFee.toString()
                                let transaction = await contract.listNftForReSell(nftaddress, nft.tokenId, price, { value: listingFee })
                                await transaction.wait()
                                router.push('/marketplace')
                            }
                            return (
                                <div key={i} className="border shadow rounded-xl overflow-hidden">
                                    <img src={nft.image} className="rounded" width="500" height="500" />
                                    <div className="px-3 py-2">
                                        <p style={{ height: '32px' }} className="text-2xl font-semibold text-white">{nft.name}</p>
                                        <div style={{ overflow: 'hidden' }}>
                                            <p className="text-gray-400">{nft.description}</p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-2 bg-black">
                                        <p className="text-2xl font-bold text-white">Price - {nft.price} Matic</p>
                                        <input
                                            className='text-white p-1 mt-1 rounded'
                                            style={{ backgroundColor: '#111111' }}
                                            placeholder="Set your price"
                                            onChange={e => updateresalePrice({ ...resalePrice, price: e.target.value })}
                                        />
                                        <button className="mt-4 w-full bg-blue-500 text-white font-bold py-2 px-12 rounded"
                                            onClick={executeRelist}>Sell</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
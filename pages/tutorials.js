import React from "react";

export default function Home() {
    return <div className="h-full flex-items-center justify-center" style={{backgroundColor:"#000033"}}>
        <div className="flex-1 rounded-lg shadow-xl max-w-6xl sm:p-8" style={{marginLeft:'15%',marginRight:'15%'}}>
            <div className="aspect-w-16 aspect-h-9 ">
                <iframe src="https://www.youtube.com/embed/k9CPogrDxbs" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media;gyroscope;picture-in-picture" allowFullScreen></iframe>
            </div>
        </div>

        <div className="flex justify-center items-center h-full" style={{backgroundColor:"#000033"}}>
            <table className="shadow-2xl font-[Poppins] border-2 border-red-200 w-6/12 overflow-hidden mt-4 mb-4 rounded-xl">
                <thead className="text-blue">
                    {/* <tr>
                        <th className="py-3"></th>
                        <th className="py-3"></th>
                    </tr> */}
                </thead>
                <tbody className="text-brown-900 text-center">
                    <tr className="bg-red-200 hover:bg-red-100 hover:scale-105  cursor-pointer duration-300 font-sans hover:font-serif">
                        <td className="py-3 px-6 font-bold">Network Name</td>
                        <td className="py-3 px-6">Mumbai Testnet</td>
                    </tr>
                    <tr className="bg-red-200 hover:bg-red-100 hover:scale-105 cursor-pointer duration-300 font-sans hover:font-serif">
                        <td className="py-3 px-6 font-bold">New RPC URL</td>
                        <td className="py-3 px-6">https://rpc-mumbai.maticvigil.com/</td>
                    </tr>
                    <tr className="bg-red-200 hover:bg-red-100  hover:scale-105 cursor-pointer duration-300 font-sans hover:font-serif">
                        <td className="py-3 px-6 font-bold">Chain ID</td>
                        <td className="py-3 px-6">80001</td>
                    </tr>
                    <tr className="bg-red-200 hover:bg-red-100  hover:scale-105 cursor-pointer duration-300 font-sans hover:font-serif">
                        <td className="py-3 px-6 font-bold">Currency Symbol</td>
                        <td className="py-3 px-6">MATIC</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
}
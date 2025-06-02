import { createContext, useState, useEffect } from "react";
import { fakeFetchCrypto, fetchAssets } from '../api';
import { percentDifference } from '../utils';
import { v4 as uuidv4 } from 'uuid'; 


const CryptoContext = createContext({
    assets: [],
    crypto: [],
    loading: false,
})

export function CryptoContextProvider({children}){
    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    function mapAssets(assets, result){
        return assets.map((asset) => {
        const coin = result.find((c) => c.id === asset.id)
        if (!coin) {
                return {
                    uuid: asset.uuid || uuidv4(),
                    name: 'Unknown Asset',
                    grow: false,
                    growPercent: 0,
                    totalAmount: 0,
                    totalProfit: 0,
                    ...asset,
                }}
        return{
            uuid: asset.uuid || uuidv4(),
            grow: asset.price < coin.price,
            growPercent: percentDifference(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            name: coin.name,
            ...asset,
        }
        })
        
    }

    useEffect(() => {
            async function preload(){
                setLoading(true)
                const {result} = await fakeFetchCrypto()
                const assets = await fetchAssets()

                setAssets(mapAssets(assets, result))
                setCrypto(result)
                setLoading(false)
            }
            preload()
        }, [])

    function addAsset(newAsset){
        setAssets((prev) => mapAssets([...prev, newAsset], crypto))
    }

    const deleteAsset = (uuidToRemove) => {
        setAssets((prev) => prev.filter(asset => asset.uuid !== uuidToRemove));
    };
    
    return(
        <CryptoContext.Provider value={{loading, crypto, assets, addAsset, deleteAsset}}>
            {children}
        </CryptoContext.Provider>
        )
}

export default CryptoContext;
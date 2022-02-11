import React, {useContext} from "react";
import { CryptoContext } from "../context/CryptosState"
import CryptoPage from "./CryptoPage"

export default function Crypto({crypto}) {

    const { setCryptoPageLoad, fetchSingleCrypto } = useContext(CryptoContext)

    function pageLoadClick(CryptoId) {
        setCryptoPageLoad(true)
        fetchSingleCrypto(CryptoId)
        console.log(CryptoId)
    }

    return (
        <div className="crypto-item-box" onClick={() => (pageLoadClick(crypto.id))} >
            <p className="crypto-item crypto-rank">{crypto.market_data.market_cap_rank}</p>
            <img className="crypto-item" src={crypto.image.small} />
            <p className="crypto-item">{crypto.symbol}</p>
            <p className="crypto-item">{crypto.name}</p>
            <p className="crypto-item">$ {crypto.market_data.current_price.usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            <p className="crypto-item">$ {crypto.market_data.market_cap.usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            <p className="crypto-item">{crypto.market_data.market_cap_change_percentage_24h} %</p>
        </div>
    )

}
import React, { useContext, useState, useEffect } from "react";
import {CryptoContext} from "../context/CryptosState";
import Crypto from "./Crypto";
import CryptoPage from "./CryptoPage";


export default function CryptoList() {

    const {cryptoState, fetchCryptos, nextPageCrypto, searchCrypto, cryptoPageLoad} = useContext(CryptoContext);
    const [pageCounter, setPageCounter] = useState(1);
    const [searchValue, setSearchValue] = useState("")

    // console.log(searchCrypto())

    useEffect(() => {
        nextPageCrypto(pageCounter);
    }, [pageCounter])


    function searchChange(e) {
        const searchBar = e.target.value
        setSearchValue(searchBar)
    }

    function submitSearch() {
        searchCrypto(searchValue)
        setSearchValue("")
    }


    return(
        (cryptoPageLoad) ?
        <CryptoPage />
        :
        <div className="crypto-list-container">

            <div className="search-box">
                <input className="search-bar" value={searchValue} onChange={searchChange} />
                <button className="search-button" onClick={submitSearch}>find</button>
            </div>



            <div className="page-buttons">
                <button className={`page-button page-back ${(cryptoState.loading) ? "unclickable" : null}`}  onClick={() => {pageCounter > 1 && setPageCounter(pageCounter - 1)}}>back</button>
                <button className={`page-button page-home ${(cryptoState.loading) ? "unclickable" : null}`} onClick={() => fetchCryptos()}>reset</button>
                <button className={`page-button page-next ${(cryptoState.loading) ? "unclickable" : null}`} onClick={() => {cryptoState.cryptos.length === 50 && setPageCounter(pageCounter + 1)}}>next</button>
            </div>
            

            {(cryptoState.loading === true) ?
                <h1>Loading...</h1>
            :       
                <>
                    <div className="crypto-item-box crypto-item-box-title" >
                        <h3 className="crypto-item" >rank</h3>
                        <h3 className="crypto-item" >logo</h3>
                        <h3 className="crypto-item" >symbol</h3>
                        <h3 className="crypto-item" >name</h3>
                        <h3 className="crypto-item" >current price</h3>
                        <h3 className="crypto-item" >market cap</h3>
                        <h3 className="crypto-item" >market cap change %</h3>
                    </div>
                    {cryptoState.cryptos.map((crypto) => <Crypto key={crypto.id} crypto={crypto}/>)}
                </>
            }
        </div>
    )


}
import React, {useContext, useState} from "react";
import { CryptoContext } from "../context/CryptosState"



export default function CryptoPage() {

    const { setCryptoPageLoad, cryptoState } = useContext(CryptoContext)

    const pageInfo = cryptoState.currentPage

    // function test() {
        
    //     console.log(pageInfo)
    //     console.log(pageInfo.coingecko_rank);
    // }



    function leavePage() {
        setCryptoPageLoad(false)
        cryptoState.currentPage = null
    }


    return (
        <div>
            {/* <button onClick={test}>test</button> */}
           
            {pageInfo ? 
                <>  
                     <button className="return-home" onClick={() => leavePage()}>go back</button>
                    <div className="page-title-box">
                        <img className="page-logo" src={pageInfo.image.small} /> 
                        {/* <p>{pageInfo.market_cap_rank}</p> */}
                        <h1 className="page-title">{pageInfo.name}</h1>
                        <h3>{pageInfo.symbol}</h3>
                    </div>


                    <div className="page-data-box">
                        <div className="page-data-box-row page-data-row-title">
                            <p className="page-data">Current Price</p>
                            <p className="page-data">all time high</p>            
                            <p className="page-data">all time high change %</p> 
                            <p className="page-data">all time low</p>            
                            <p className="page-data">all time low change %</p>                      
                            <p className="page-data">circulating supply</p>                      
                            <p className="page-data">market cap</p>               
                        </div>
                        <div className="page-data-box-row">
                            <p className="page-data">$ {pageInfo.market_data.current_price.usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p> 
                            <p className="page-data">$ {pageInfo.market_data.ath.usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                            <p className="page-data">{pageInfo.market_data.ath_change_percentage.usd} %</p>
                            <p className="page-data">$ {pageInfo.market_data.atl.usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
                            <p className="page-data">{pageInfo.market_data.atl_change_percentage.usd} %</p> 
                            <p className="page-data">$ {pageInfo.market_data.circulating_supply.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p> 
                            <p className="page-data">$ {pageInfo.market_data.market_cap.usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p> 
                        </div>
                        <div className="page-data-box-row page-data-box-description">
                            <p className="page-data page-data-description" dangerouslySetInnerHTML={{__html: pageInfo.description.en}}></p>
                        </div>
                       
                    </div>
                 
                    
                   
                </>
            
            : 
            <p>Loading...</p>}
        </div>
    )


}
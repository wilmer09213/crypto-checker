import React, {useReducer, createContext, useEffect, useState} from "react";
import axios from "axios";
import CryptosReducer from "./CryptosReducer";


const initialState = {
    cryptos: [],
    currentPage: {},
    loading: true
};

// async function test() {
//     const cryptos =  await axios.get("/cryptos/")
//     console.log(cryptos.data.data.data)
// }

// test();


export const CryptoContext = createContext();

export const CryptosState = ({children}) => {

    const [cryptoState, dispatch] = useReducer(CryptosReducer, initialState);

    const [cryptoPageLoad, setCryptoPageLoad] = useState(false);

    useEffect(() => {
        fetchCryptos();
    }, [])

    async function fetchCryptos() {

        try {
            const resCryptos = await axios.get("/cryptos/");
            cryptoState.loading = false;
            dispatch(
                {
                type: "GET_CRYPTOS_FIRST_LOAD",
                payload: resCryptos.data.data.data
            })

        } catch (error) {
            dispatch({
                type: "CRYPTOS_ERROR",
                payload: error.response
            })
        }
        
    }

    async function nextPageCrypto(cryptoPage) {
        
        try {
            cryptoState.loading = true;
            const resCryptoPage = await axios.get("/cryptos/page", {
                params: {
                    pageNumber: cryptoPage
                }
            });
            cryptoState.loading = false;

            dispatch({
                type: "GET_NEXT_PAGE_CRYPTOS",
                payload: resCryptoPage.data.data.data
            })

        } catch (error) {
            dispatch({
                type: "CRYPTOS_ERROR",
                payload: error.response
            })
        }

    }

    async function searchCrypto(searchValue) {
        try {
            cryptoState.loading = true;
            const filteredCryptos = await axios.get("https://api.coingecko.com/api/v3/search", {
                params: {
                    query: searchValue
                }
            })
            cryptoState.loading = false; 
            const filteredCryptosIds = await filteredCryptos.data.coins.map((crypto) => {
                return crypto.id
            })
             const resFilteredCryptos = await axios.get("/cryptos/filter", {
                 params: {
                     filterCryptos: filteredCryptosIds
                 }
             })
            
            console.log(resFilteredCryptos.data.data)
            dispatch({
                type: "SEARCH_CRYPTOS",
                payload: resFilteredCryptos.data.data
            })
        } catch (error) {
            dispatch({
                type: "CRYPTOS_ERROR",
                payload: error.response
            })
        }
    }


    async function fetchSingleCrypto(cryptoId) {


        try {
            const singleCrypto = await axios.get("/cryptos/get-crypto", {
                params: {
                    id: cryptoId
                }
            })

            dispatch({
                type: "FETCH_CRYPTO",
                payload: singleCrypto.data.data.data
            })

        } catch(error) {
            dispatch({
                type: "CRYPTOS_ERROR",
                payload: error.response
            })
        }

    }
    

    return (<CryptoContext.Provider value={{
        cryptoState,
        cryptoPageLoad,
        fetchCryptos,
        nextPageCrypto,
        searchCrypto,
        setCryptoPageLoad,
        fetchSingleCrypto
    }}>
        {children}
    </CryptoContext.Provider>)


}
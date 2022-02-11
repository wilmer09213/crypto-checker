
export default  function CryptoReducer(state, action) {

    switch(action.type) {
        case "GET_CRYPTOS_FIRST_LOAD":
            return {
                ...state,
                cryptos: action.payload
            }
        case "GET_NEXT_PAGE_CRYPTOS":
            return {
                cryptos: action.payload
            }
        case "SEARCH_CRYPTOS":
            return {
                cryptos: action.payload
            }
        case "FETCH_CRYPTO":
            return {
                ...state,
                currentPage: action.payload
            }
        case "CRYPTOS_ERROR":
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }

}
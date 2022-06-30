import { ethers } from 'ethers'
import createDataContext from './createDataContext'
import { getTodayString } from '../utils/helpers'
import { getDatabase, ref, set, get, child } from 'firebase/database'
import brewDao from '../contracts/ETHBrewDao.json'

const REQUEST_DATES = 'REQUEST_DATES'
const REQUEST_DATES_SUCCESS = 'REQUEST_DATES_SUCCESS'
const REQUEST_DATES_ERROR = 'REQUEST_DATES_ERROR'
const VALIDATE_ADDRESS = 'VALIDATE_ADDRESS'
const VALIDATE_ADDRESS_SUCCESS = 'VALIDATE_ADDRESS_SUCCESS'
const VALIDATE_ADDRESS_ERROR = 'VALIDATE_ADDRESS_ERROR'
const POST_CLAIM_SUCCESS = 'POST_CLAIM_SUCCESS'

const initialState = {
  data: {
    loading: null,
    value: {},
    error: '',
  },
  validation: {
    loading: null,
    value: null,
    message: '',
  },
  refinedAddress: '',
}

const claimsReducer = (state, action) => {
  switch (action.type) {
    case REQUEST_DATES:
      return { ...state, data: { ...state.data, loading: true } }
    case REQUEST_DATES_SUCCESS:
      return { ...state, data: { ...state.data, value: action.payload, loading: false, error: '' } }
    case REQUEST_DATES_ERROR:
      return { ...state, data: { ...state.data, loading: false, error: action.payload } }
    case VALIDATE_ADDRESS:
      return { ...state, validation: { ...state.validation, loading: true } }
    case VALIDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        validation: {
          ...state.validation,
          value: action.payload.approved,
          loading: false,
          message: 'Pour this person a beer :)',
        },
        refinedAddress: action.payload.refinedAddress,
      }
    case VALIDATE_ADDRESS_ERROR:
      return {
        ...state,
        validation: { ...state.validation, loading: false, message: action.payload },
      }
    case POST_CLAIM_SUCCESS:
      // reset to original state, but show the latest data
      return {
        ...initialState,
        data: { ...initialState.data, value: action.payload },
      }
    default:
      return state
  }
}

const getClaims = dispatch => async () => {
  try {
    dispatch({ type: REQUEST_DATES, payload: null })
    const dbRef = ref(getDatabase())
    const snapshot = await get(child(dbRef, `days/`))
    const data = snapshot.val()
    dispatch({ type: REQUEST_DATES_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: REQUEST_DATES_ERROR,
      payload: `${'ERR: ' + err?.error || 'Something went wrong with loading data.'}`,
    })
  }
}

const _getAddressBalance = async (address) => {
  const provider = ethers.getDefaultProvider('goerli')
  const contractAddress = '0xfF1C84B5D7BB0F53F7e4917810de7aC083F35df6'
  const contract = new ethers.Contract(contractAddress, brewDao.abi, provider)
  const balance = await contract.balanceOf(address)
  return balance.toString()
}

const validateETHAddress =
  dispatch =>
  async ({ address, data }) => {
    try {
      dispatch({ type: VALIDATE_ADDRESS, payload: null })
      // make sure address is in the right format
      const refinedAddress = address.match(/0x[a-fA-F0-9]{40}/)[0]
      if (!refinedAddress) throw new Error(`QR code text does not contain ETH address.`)

      // check if address claimed a beer already
      const todayData = data[getTodayString()]
      // todayData undefined => first person to claim beer today
      const hasNotClaimedBeerToday = !todayData || !todayData[refinedAddress]
      if (!hasNotClaimedBeerToday) throw new Error(`Account has already claimed a beer today.`)

      // check balance > 100
      const balance = await _getAddressBalance(refinedAddress)
      const hasEnoughTokens = balance >= 100
      if (!hasEnoughTokens) throw new Error(`Account does not have > 100 BREW tokens.`)
      dispatch({
        type: VALIDATE_ADDRESS_SUCCESS,
        payload: { approved: hasEnoughTokens && hasNotClaimedBeerToday, refinedAddress },
      })
    } catch (err) {
      dispatch({
        type: VALIDATE_ADDRESS_ERROR,
        payload: `${err?.message || 'Something went wrong with validating ETH address.'}`,
      })
    }
  }

const postClaim =
  dispatch =>
  async ({ refinedAddress, data }) => {
    try {
      // update data to reflect beer consumed
      let newData = data
      if (!!newData[getTodayString()]) {
        // today already exists - add to the object
        newData[getTodayString()][refinedAddress] = 1
      } else {
        newData[getTodayString()] = { [refinedAddress]: 1 }
      }

      // update database
      const db = getDatabase()
      set(ref(db, 'days'), newData)

      dispatch({ type: POST_CLAIM_SUCCESS, payload: newData })
    } catch (err) {
      console.log(err)
    }
  }

export const { Provider, Context } = createDataContext(
  claimsReducer,
  {
    getClaims,
    validateETHAddress,
    postClaim,
  },
  initialState
)

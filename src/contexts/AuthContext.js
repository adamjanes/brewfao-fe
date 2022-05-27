import createDataContext from './createDataContext'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'

const SIGN_IN = 'SIGN_IN'
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
const SIGN_OUT = 'SIGN_OUT'

const initialState = {
  user: {
    loading: false,
    value: null,
    error: '',
  },
}

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state, user: { ...state.user, loading: true } }
    case SIGN_IN_SUCCESS:
      return { ...state, user: { ...state.user, value: action.payload, loading: false, error: '' } }
    case SIGN_IN_ERROR:
      return { ...state, user: { ...state.user, loading: false, error: action.payload } }
    case SIGN_OUT:
      return { ...state, user: initialState.user }
    default:
      return state
  }
}

const signIn =
  dispatch =>
  async ({ email, password }) => {
    try {
      dispatch({ type: SIGN_IN, payload: null })
      const res = await signInWithEmailAndPassword(auth, email, password)
      dispatch({ type: SIGN_IN_SUCCESS, payload: res.user })
      // navigate to dashboard
      return '/'
    } catch (err) {
      dispatch({
        type: SIGN_IN_ERROR,
        payload: `${err?.message || 'Something went wrong with signing in.'}`,
      })
    }
  }

const signOut = dispatch => async () => {
  try {
    dispatch({ type: SIGN_OUT })
    auth.signOut()
    // sessionStorage.removeItem('Auth Token')
  } catch (err) {
    console.log('err', err)
  }
}

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signIn,
    signOut,
  },
  initialState
)

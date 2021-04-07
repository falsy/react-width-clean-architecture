import * as React from 'react'
import { useEffect } from 'react'
import Board from '../boards/Board'
import Login from '../logins/Login'
import di from '../../../di'
import { useTokenState } from '../../hooks/sessionRecoil'

const MainRouter: React.FC = () => {
  const [token, setToken] = useTokenState()

  useEffect(() => {
    (async () => {
      const storageToken = await di.session.getToken()
      if (storageToken) {
        di.session.setToken(storageToken)
        setToken(storageToken)
      }
    })()
  }, [token])

  return (
    <div>
      {!token && (
        <Login />
      )}
      {token && (
        <Board />
      )}
    </div>
  )
}


export default MainRouter
import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ISessionStateGroup } from '../../../adapters/presenters/interfaces-redux/iSession'
import Board from '../boards/Board'
import Login from '../logins/Login'
import di from '../../../di'

const MainRouter: React.FC = () => {
  const dispatch = useDispatch()
  const token = useSelector((state: ISessionStateGroup) => state.session.token)

  useEffect(() => {
    (async () => {
      const storageToken = await di.session.getToken()
      if (storageToken) {
        dispatch(di.session.setToken(storageToken))
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
import * as React from "react"
import { useDispatch } from "react-redux"
import styled from '@emotion/styled'
import AuthForm from "./AuthForm"
import di from '../../../di'

const Login: React.FC = () => {
  const dispatch = useDispatch()

  const handleClickAccreditation = async (id: string, pw: string) => {
    dispatch(await di.session.login(id, pw))
  }

  return (
    <div>
      <$authArea>
        <AuthForm accredit={handleClickAccreditation} btnValue={"Login"} />
      </$authArea>
    </div>
  )
}


export default Login

const $authArea = styled.div`
  width: 400px;
  margin: 100px auto;
`
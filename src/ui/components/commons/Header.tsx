import * as React from "react"
import styled from '@emotion/styled'
import { useDispatch } from "react-redux"
import ShortBtn from './ShortBtn'
import di from '../../../di'

const Header: React.FC = () => {
  const dispatch = useDispatch()

  const handleClickLogout = () => {
    dispatch(di.session.removeToken())
  }

  return (
    <$headerArea>
      <$logo>Object-oriented React Architecture</$logo>
      <$btnArea>
        <ShortBtn type="button" onClick={handleClickLogout} value="Logout" />
      </$btnArea>
    </$headerArea>
  )
}


export default Header

const $headerArea = styled.section`
  width: 100%;
  height: 70px;
  padding: 17px 30px;
  box-shadow: 1px 1px 10px rgba(0,0,0,0.08);

  &::after {
    content: '';
    display: block;
    clear: both;
  }
`

const $logo = styled.h1`
  float: left;
  margin: 0;
  line-height: 40px;
  font-size: 16px;
  font-weight: 500;
`

const $btnArea = styled.div`
  float: right;
`
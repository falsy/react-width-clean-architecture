import * as React from "react"
import { useEffect } from "react"
import styled from '@emotion/styled'
import { useDispatch, useSelector } from "react-redux"
import { IBoardStateGroup } from "../../../adapters/presenters/interfaces-redux/iBoard"
import BoardVM, { IBoardVM } from "../../../adapters/vm/Board"
import BoardList from './BoardList'
import AddBoard from './AddBoard'
import di from '../../../di'

const BoardSection: React.FC = () => {
  const dispatch = useDispatch()

  const list: Array<IBoardVM> = useSelector((state: IBoardStateGroup) => state.board.list)
  const boardVMList = list.map(boardEntity => new BoardVM(boardEntity))

  useEffect(() => {
    const asyncFnc = async () => {
      dispatch(await di.board.getBoards())
    }
    asyncFnc()
  }, [])

  const insertFnc = async (author: string, content: string) => {
    const resStatus = await di.board.insertBoard(author, content)
    if (resStatus) {
      dispatch(await di.board.getBoards())
    }
  }

  return (
    <>
      <$boardSectionArea>
        <$sectionTitle>Board</$sectionTitle>
        <BoardList list={boardVMList} />
      </$boardSectionArea>
      <$boardSectionArea>
        <$sectionTitle>Add Post</$sectionTitle>
        <AddBoard insertFnc={insertFnc} />
      </$boardSectionArea>
    </>
  )
}


export default BoardSection

const $boardSectionArea = styled.section`
  margin-top: 40px;
  &:first-of-type {
    margin-top: 0;
  }
`

const $sectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 200;
`
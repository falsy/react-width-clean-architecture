import { ICommentVM } from './Comment'

export interface IBoardVM {
  id: number
  author: string
  content: string
  createAt: Date
  comments: Array<ICommentVM>
  pushComment(commentList: Array<ICommentVM>)
}

export interface IBoardData {
  id: number
  author: string
  content: string
  createAt: Date
}

class BoardVM implements IBoardVM {
  private readonly _id: number
  private readonly _author: string
  private readonly _content: string
  private readonly _createAt: Date
  private _comments: Array<ICommentVM>

  constructor(params: IBoardData) {
    this._id = params.id
    this._author = params.author
    this._content = params.content
    this._createAt = params.createAt
    this._comments = []
  }

  pushComment(commentList: Array<ICommentVM>) {
    this._comments = this._comments.concat(commentList)
    return this
  }

  get id() {
    return this._id
  }

  get comments() {
    return this._comments
  }

  get author() {
    return this._author
  }

  get content() {
    return this._content
  }

  get createAt() {
    return this._createAt
  }
}

export default BoardVM
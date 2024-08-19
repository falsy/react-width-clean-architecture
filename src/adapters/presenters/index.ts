import IUseCases from "adapters/domains/useCases/interfaces"
import UserPresenter from "./UserPresenter"
import IPresenter from "./interfaces"
import ToDoPresenter from "./ToDoPresenter"

export default function presenters(useCases: IUseCases): IPresenter {
  return {
    user: new UserPresenter(useCases.user),
    todo: new ToDoPresenter(useCases.todo)
  }
}

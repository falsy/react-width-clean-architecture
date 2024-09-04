import ITransactionDTO from "adapters/dtos/interfaces/ITransactionDTO"
import ITransactionRepository from "adapters/repositories/interfaces/ITransactionRepository"
import ICardRepository from "adapters/repositories/interfaces/ICardRepository"
import IAccountRepository from "adapters/repositories/interfaces/IAccountRepository"
import IFranchiseRepository from "adapters/repositories/interfaces/IFranchiseRepository"
import ITransactionUseCase from "./interfaces/ITransactionUseCase"
import ICardTransaction from "../aggregates/interfaces/ICardTransaction"
import IAccountTransaction from "../aggregates/interfaces/IAccountTransaction"
import {
  IFilterTxnParams,
  ICreateTxnParams
} from "adapters/dtos/interfaces/requests/IRequestTransactionDTO"
import Card from "../entities/Card"
import Account from "../entities/Account"
import Transaction from "../aggregates/entities/Transaction"
import Franchise from "../aggregates/entities/Franchise"
import CardTransaction from "../aggregates/CardTransaction"
import AccountTransaction from "../aggregates/AccountTransaction"

export default class TransactionUseCase implements ITransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private franchiseRepository: IFranchiseRepository,
    private cardRepository: ICardRepository,
    private accountRepository: IAccountRepository
  ) {}

  async getTransactions(
    params: IFilterTxnParams
  ): Promise<Array<ICardTransaction | IAccountTransaction>> {
    const [transactionDTOs, franchiseDTOs, cardDTOs, accountDTOs] =
      await Promise.all([
        this.transactionRepository.getTransactions(params),
        this.franchiseRepository.getFranchises(),
        this.cardRepository.getCards(),
        this.accountRepository.getAccounts()
      ])
    const transactions = transactionDTOs.map(
      (transactionDTO: ITransactionDTO) => {
        const transaction = new Transaction(transactionDTO)

        if (transactionDTO.cardId) {
          const cardDTO = cardDTOs.find(
            (card) => card.id === transactionDTO.cardId
          )
          if (!cardDTO) {
            throw new Error("CardDTO not found")
          }

          const franchiseDTO = franchiseDTOs.find(
            (franchise) => franchise.id === transactionDTO.franchiseId
          )

          const franchise = franchiseDTO ? new Franchise(franchiseDTO) : null
          const card = new Card(cardDTO)
          const cardTransaction = new CardTransaction({
            transaction,
            franchise,
            card
          })

          return cardTransaction
        } else {
          const accountDTO = accountDTOs.find(
            (account) => account.id === transactionDTO.accountId
          )
          if (!accountDTO) {
            throw new Error("AccountDTO not found")
          }

          const account = new Account(accountDTO)
          const accountTransaction = new AccountTransaction({
            transaction,
            account
          })

          return accountTransaction
        }
      }
    )

    return transactions
  }

  addTransaction(params: ICreateTxnParams): Promise<boolean> {
    return this.transactionRepository.addTransaction(params)
  }
}

import ILayerDTO from "adapters/dtos/interfaces/ILayerDTO"
import LayerDTO from "adapters/dtos/LayerDTO"
import ITransactionDTO from "adapters/dtos/interfaces/ITransactionDTO"
import ITransactionRepository from "adapters/repositories/interfaces/ITransactionRepository"
import ICardRepository from "adapters/repositories/interfaces/ICardRepository"
import IAccountRepository from "adapters/repositories/interfaces/IAccountRepository"
import ITransactionUseCase from "./interfaces/ITransactionUseCase"
import ICardTransaction from "../aggregates/interfaces/ICardTransaction"
import IAccountTransaction from "../aggregates/interfaces/IAccountTransaction"
import CardTransaction from "../aggregates/CardTransaction"
import AccountTransaction from "../aggregates/AccountTransaction"
import TxnCategoryVO from "../vos/TxnCateogryVO"
import Card from "../entities/Card"
import Account from "../entities/Account"
import IRequestTransactionDTO from "adapters/dtos/requests/interfaces/IRequestTransactionDTO"
import Transaction from "../aggregates/entities/Transaction"

export default class TransactionUseCase implements ITransactionUseCase {
  constructor(
    private transactionRepository: ITransactionRepository,
    private cardRepository: ICardRepository,
    private accountRepository: IAccountRepository
  ) {}

  async getTransactions(): Promise<
    ILayerDTO<Array<ICardTransaction | IAccountTransaction>>
  > {
    try {
      const [transactionDTOs, txnCategoryDTOs, cardDTOs, accountDTOs] =
        await Promise.all([
          this.transactionRepository.getTransactions(),
          this.transactionRepository.getTxnCategories(),
          this.cardRepository.getCards(),
          this.accountRepository.getAccounts()
        ])

      if (
        transactionDTOs.isError ||
        txnCategoryDTOs.isError ||
        cardDTOs.isError ||
        accountDTOs.isError ||
        !transactionDTOs.data ||
        !txnCategoryDTOs.data ||
        !cardDTOs.data ||
        !accountDTOs.data
      ) {
        return new LayerDTO({
          isError: true,
          message: "Error occurred while fetching data"
        })
      }

      const transactions = await Promise.all(
        transactionDTOs.data.map(async (transactionDTO: ITransactionDTO) => {
          const txnCategoryDTO = txnCategoryDTOs.data!.find(
            (txnCategory) => txnCategory.id === transactionDTO.categoryId
          )
          const txnCategoryVO = new TxnCategoryVO({
            id: txnCategoryDTO!.id,
            name: txnCategoryDTO!.name,
            description: txnCategoryDTO!.description
          })

          const transaction = new Transaction({
            id: transactionDTO.id,
            amount: transactionDTO.amount,
            keyword: transactionDTO.keyword,
            createdAt: transactionDTO.createdAt,
            category: txnCategoryVO
          })

          if (transactionDTO.cardId) {
            const cardDTO = cardDTOs.data!.find(
              (card) => card.id === transactionDTO.cardId
            )

            const card = new Card({
              id: cardDTO!.id,
              cardType: cardDTO!.cardType,
              cardCompany: cardDTO!.cardCompany,
              cardNumber: cardDTO!.cardNumber
            })

            const cardTransaction = new CardTransaction({
              transaction: transaction,
              card: card
            })

            return cardTransaction
          } else {
            const accountDTO = accountDTOs.data!.find(
              (account) => account.id === transactionDTO.accountId
            )

            const account = new Account({
              id: accountDTO!.id,
              accountType: accountDTO!.accountType,
              bankName: accountDTO!.bankName,
              accountNumber: accountDTO!.accountNumber,
              balance: accountDTO!.balance
            })

            const accountTransaction = new AccountTransaction({
              transaction: transaction,
              account: account
            })

            return accountTransaction
          }
        })
      )

      return new LayerDTO({
        data: transactions
      })
    } catch (error) {
      if (error instanceof Error) {
        throw error
      } else {
        throw new Error("Unknown error type")
      }
    }
  }

  addTransaction(
    reqTransactionDTO: IRequestTransactionDTO
  ): Promise<ILayerDTO<boolean>> {
    return this.transactionRepository.addTransaction(reqTransactionDTO)
  }

  getTxnCategories(): Promise<ILayerDTO<TxnCategoryVO[]>> {
    return this.transactionRepository.getTxnCategories()
  }
}

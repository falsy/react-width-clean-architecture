import { validateOrReject } from "class-validator"
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
import IRequestTransactionDTO from "adapters/dtos/interfaces/IRequestTransactionDTO"

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
          this.transactionRepository.getTxnCateogries(),
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
        return {
          isError: true,
          message: "Error occurred while fetching data"
        }
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
          await validateOrReject(txnCategoryVO)

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

            await validateOrReject(card)

            const cardTransaction = new CardTransaction({
              id: transactionDTO.id,
              amount: transactionDTO.amount,
              keyword: transactionDTO.keyword,
              createdAt: transactionDTO.createdAt,
              category: txnCategoryVO,
              card: card
            })
            await validateOrReject(cardTransaction)
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

            await validateOrReject(account)

            const accountTransaction = new AccountTransaction({
              id: transactionDTO.id,
              amount: transactionDTO.amount,
              keyword: transactionDTO.keyword,
              createdAt: transactionDTO.createdAt,
              category: txnCategoryVO,
              account: account
            })
            await validateOrReject(accountTransaction)
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

  getTxnCateogries(): Promise<ILayerDTO<TxnCategoryVO[]>> {
    return this.transactionRepository.getTxnCateogries()
  }
}

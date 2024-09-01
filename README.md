# Domain-driven React architecture

This is a small idea project applying the principles of `Domain-driven Design(DDD)` to a React architecture. The goal is to effectively manage the complexity of the business domain and make maintenance easier by building a modular, domain-centric design.

Using `Clean Architecture` as the system architecture, this sample React application aims to clearly separate business logic from UI logic and develop a structure that allows for independent maintenance of each domain.

#### Note.

> This document is a work in progress as I study OOP, DDD, Clean Architecture, and related topics. Since my knowledge is still growing, there may be parts that I have misunderstood or explained incorrectly.  
> If you find any issues or have suggestions for improvement, please feel free to submit them through issues or pull requests, and I will incorporate them. ☺️  
> (+ My English is not perfect, so please bear with me.)

#### Note.

> It might be helpful to also take a look at the following project in relation to Clean Architecture.  
> https://github.com/falsy/clean-architecture-with-typescript

## Use Stack

TypeScript, React, React-Query, Emotion, Class-Validator, Axios, Webpack

## Ubiquitous Language

![Ubiquitous Language](/_images/ubiquitous.png#gh-light-mode-only)
![Ubiquitous Language](/_images/ubiquitous-dark.png#gh-dark-mode-only)

Ubiquitous Language refers to a shared language used by all team members to maintain consistency in communication throughout a project.
This language should be shared among all project members, including the project leader, domain experts, developers, UI/UX designers, business analysts, QA engineers, and others. Moreover, this language is not only used in documentation or conversations during collaboration but is also reflected in the software models and code.

For example, the term `Transaction` might be interpreted differently by various team members. For the project leader, it could represent an important step or event in the business flow; for developers, it might mean a unit of work in a database; and for domain experts, it could refer to activities related to transactions or payments.
However, in this sample project, `Transaction` is defined as a unit that constitutes user consumption data, making it a part of the Ubiquitous Language shared by all team members.

## Domains

![Domains](/_images/domains-v2.png#gh-light-mode-only)
![Domains](/_images/domains-v2-dark.png#gh-dark-mode-only)

Let's assume we're dealing with a financial services domain. Within this broad domain, there are many subdomains such as banking, payment services, loan services, wealth management, and fintech. If we break down the fintech subdomain further, we get areas like digital payments, digital banking, crowdfunding, and personal wealth management, among others.

For this project, we will explore a very simple example application within the personal wealth management domain.

## Use Cases

In the personal wealth management service, users can view a list of their cards and accounts, check recent transactions, and manually add new transactions.

- Users can view their personal information.
- Users can view their list of owned cards.
- Users can view their list of owned accounts.
- Users can view their transaction history.
- Users can add new transactions.

## Entities

Based on the use cases above, we have defined four entities.  
Since there are no use cases involving modifications to these entities, all their properties are marked as `readonly`.

### User

```ts
interface IUser {
  readonly id: string
  readonly name: string
  readonly email: string
  readonly phone: string
  readonly address: string
}
```

### Card

```ts
interface ICard {
  readonly id: string
  readonly cardType: "CREDIT" | "DEBIT"
  readonly cardCompany: string
  readonly cardNumber: string
}
```

### Account

```ts
interface IAccount {
  readonly id: string
  readonly accountType: "SAVINGS" | "CURRENT"
  readonly bankName: string
  readonly accountNumber: string
  readonly balance: number
}
```

### Transaction

```ts
interface ITransaction {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly createdAt: string
  readonly category: ITxnCategoryVO
}
```

## Aggregates

An `Aggregate` is an object that serves as a consistency boundary and can include multiple entities or value objects. It encapsulates its internal state, ensuring that any external access is controlled and can only be modified through the `Aggregate Root`. This consistency boundary helps manage the complexity of relationships within the model, especially as the service scales and transactions become more complex.

![Aggregate](/_images/aggregate.png#gh-light-mode-only)
![Aggregate](/_images/aggregate-dark.png#gh-dark-mode-only)

In the example project, we have two Aggregates: `CardTransaction` and `AccountTransaction`.

### AccountTransaction

```ts
interface IAccountTransaction {
  readonly transaction: ITransaction
  readonly account: IAccountInfoVO
  readonly accountId: string
}
```

### CardTransaction

```ts
interface ICardTransaction {
  readonly transaction: ITransaction
  readonly card: ICardInfoVO
  readonly cardId: string
}
```

Within the Aggregate, there are `Transaction` entities and either a `Card` or an `Account` entity. Although these entities are currently marked as readonly, they may be used independently or have their values modified outside of the Aggregate as use cases evolve.

To maintain the integrity of the consistency boundary, `Card` (or `Account`) is defined as a `Value Object` containing information at the time the Aggregate is created, and only its identifier is referenced externally. This prevents any modifications to the `Card` (or `Account`) from violating the Aggregate's consistency.

As for the `Transaction` entity, it is entirely managed within the Aggregate. If a use case arises where the state of a `Transaction` needs to be modified, that logic will be implemented within the Aggregate, ensuring that the state can only be changed through the `Aggregate Root`.

## Directory Structure

> The interface directory is omitted for simplicity.

```
/src
├─ adapters
│  ├─ domains
│  │  ├─ aggregates
│  │  │  └─ entities
│  │  ├─ entities
│  │  ├─ useCases
│  │  └─ vos //(Value Objects)
│  ├─ presenters
│  ├─ repositories
│  ├─ infrastructures
│  ├─ dtos //(Data Transfer Objects)
│  └─ vms //(View Models)
├─ di
├─ components
│  ├─ commons
│  ├─ networks
│  ├─ user
│  ├─ card
│  ├─ account
│  └─ transaction
├─ constants
│  ├─ networks
│  └─ queries
└─ pages
   └─ ...
```

The domain is clearly divided between entities and aggregates. Since transaction is controlled exclusively through the aggregate root, it is placed in the entities directory within the aggregates directory to further clarify this distinction. In the UI layer, common components are placed in the commons folder, components related to react-query are located in the networks folder, and the rest are organized by domain.

## Communitaction Flow

![Communitaction Flow](/_images/flow.png#gh-light-mode-only)
![Communitaction Flow](/_images/flow-dark.png#gh-dark-mode-only)

The basic layering and communication flow follow `Clean Architecture` principles. Let's walk through the `transactions` flow, the core of this example project, to understand how each layer interacts.

### Domains

The domain layer contains entities, use cases, and value objects used to define the entities. Entities define the domain model and business logic of the service, while use cases describe the actions from the user's perspective.

### Infrastructures

The Infrastructure layer manages external connections. In this example project, a basic clientHTTP class is used for HTTP communication, leveraging the axios library internally. While this project doesn’t include them, classes for connecting with Web APIs like LocalStorage or mobile message communication in an in-app browser could also be placed in this layer.

### Repositories

Based on the scenarios defined in the `Use Cases`, repositories select the external communication method and encapsulate the data received from external services into DTOs for internal service layer communication.

### Use Cases

In the `Use Cases` layer, DTOs are re-encapsulated into entities when necessary based on business logic and the necessary logic is performed.

### Presenters

The `Presenters` layer is where the elements of the Adapter layer are dependency injected and directly connected to the view(UI) components. It handles user requests and, when necessary, encapsulates the entities or DTOs received from the use cases into view models (VMs) to be easily consumed by the view.

## Execution Flow

![Execution Flow](/_images/execution-flow.png#gh-light-mode-only)
![Execution Flow](/_images/execution-flow-dark.png#gh-dark-mode-only)

In the example project, the core scenario involves retrieving a user's transaction history. This flow begins with the view invoking the getTransactions method of the DI-injected `transaction` presenter, which requests the transaction data.

```ts
// transaction presenter
async getTransactions(): Promise<
  ILayerDTO<Array<ICardTransactionVM | IAccountTransactionVM>>
> {
  try {
    const { isError, message, data } =
      await this.TransactionUseCase.getTransactions()
    ...
  }
}
```

The Use Cases layer requests the Repositories layer for data to create CardTransaction and AccountTransaction aggregates corresponding to the Transaction.

```ts
// transaction useCase
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
    ...
  }

```

Each repository uses the clientHTTP class to retrieve data from the API server and returns the appropriate DTO instances.

```ts
// transaction repository
async getTransactions(): Promise<ILayerDTO<ITransactionDTO[]>> {
  try {
    const res = await this.clientHttp.get(`${API_URI}/api/transactions`)
    const { isError, message, data } = res.data

    if (isError || !data) {
      return new LayerDTO({
        isError,
        message
      })
    }

    const transactionDTOs = await Promise.all(
      data.map(async (transaction: ITransactionDTOParams) => {
        const transactionDTO = new TransactionDTO(transaction)
        await validateOrReject(transactionDTO)
        return new TransactionDTO(transactionDTO)
      })
    )

    return new LayerDTO({
      data: transactionDTOs
    })
  }
  ...
}
```

In the Use Case layer, once all the DTO responses are received, the data is combined to create the CardTransaction and AccountTransaction aggregates.

```ts
const transactions = await Promise.all(
  transactionDTOs.data.map(async (transactionDTO: ITransactionDTO) => {
    const txnCategoryDTO = txnCategoryDTOs.data!.find(
      (txnCategory) => txnCategory.id === transactionDTO.categoryId
    )
    const txnCategoryVO = new TxnCategoryVO({
      id: txnCategoryDTO!.id,
      name: txnCategoryDTO!.name,
      description: txnCategoryDTO!.description,
    })

    const transaction = new Transaction({
      id: transactionDTO.id,
      amount: transactionDTO.amount,
      keyword: transactionDTO.keyword,
      createdAt: transactionDTO.createdAt,
      category: txnCategoryVO,
    })

    ...

    const account = new Account({
      id: accountDTO!.id,
      accountType: accountDTO!.accountType,
      bankName: accountDTO!.bankName,
      accountNumber: accountDTO!.accountNumber,
      balance: accountDTO!.balance,
    })

    const accountTransaction = new AccountTransaction({
      transaction: transaction,
      account: account,
    })

    return accountTransaction
  })
)
```

In summary, the DTO data is used to create the Transaction entity and Category value object. Depending on whether the transactionDTO contains a cardId, either a Card entity or an Account entity is created. These entities are then used to form the CardTransaction and AccountTransaction aggregates, which are returned as the response.

Finally, the presenter receives the aggregate and transforms the data into a View Model (VM) to make it easier to use in the view, and then sends the response to the view.

```ts
// transaction presenter
const transactionVMs = data.map(
  (transaction: ICardTransaction | IAccountTransaction) => {
    if (transaction instanceof CardTransaction) {
      return new CardTransactionVM(transaction)
    }
    return new AccountTransactionVM(transaction as IAccountTransaction)
  }
)

return new LayerDTO({
  data: transactionVMs
})
...
```

## Networks HOC

In this example project, we use React-Query for HTTP communication. React-Query is encapsulated within a Higher-Order Component(HOC). This minimizes the dependency between UI components and React-Query while simplifying the process of fetching external data and rendering it in the UI via component composition.

Below is a simple component that fetches user information via external communication and displays it in the view.

```ts
function Greeting({ response }: { response?: IUser }) {
  const userName = response?.name || ""

  return (
    <div>
      <Container>
        <div>
          <p>{`Welcome, ${userName}`}</p>
        </div>
      </Container>
    </div>
  )
}
```

```ts
function GreetingSection() {
  return (
    <div>
      <ErrorContainer>
        <QueryContainer
          queryKey={GET_USER_INFO}
          queryFn={() => di.user.getUserInfo()}
        >
          <Greeting />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
```

Using MutationContainer, you can not only perform GET requests but also handle POST and PUT operations.

```ts
function AddConsumptionBtn({ action }: { action?: () => void }) {
  return <button onClick={action}>Add</button>
}
```

```ts
function AddConsumptionAction({
  transactionData
}: {
  transactionData: IRequestTransactionDTOParams
}) {
  const { amount, keyword, categoryId, cardId, accountId } = transactionData

  return (
    <div>
      <ErrorContainer>
        <MutationContainer
          mutationFn={() => {
            if (!amount || !keyword || !categoryId || (!cardId && !accountId)) {
              window.alert("Please fill all fields")
              throw new Error("Please fill all fields")
            }
            return di.transaction.addTransaction({
              amount,
              keyword,
              categoryId,
              cardId,
              accountId
            })
          }}
          invalidateQueryKeys={[GET_TRANSACTIONS]}
        >
          <AddConsumptionBtn />
        </MutationContainer>
      </ErrorContainer>
    </div>
  )
}
```

## Screenshot

![Screenshot](/_images/screenshot.png)

## Run Project

### Install

```
yarn
```

### Run

```
yarn start
```

## Thank You!

I'm grateful for all the support and interest 🙇‍♂️

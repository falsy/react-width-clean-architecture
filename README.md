# Domain-driven React architecture

This project is a small idea project that applies the principles of Domain-driven Design (`DDD`) to a React architecture. The goal of this project is to effectively manage the complexity of the business domain and build a modular, domain-centric design that makes service expansion and maintenance easier.

The implementation of the sample project follows the principles of `Clean Architecture` for the system architecture. Although this project uses the React framework, it is designed to minimize framework dependency, adhering as much as possible to the core principle of `framework independence`. The main domain logic and business rules are written independently of the framework, with only the UI layer depending on React.

#### Note.

> This project is a part of my learning journey in Object-Oriented Programming (OOP), Domain-Driven Design (DDD), Clean Architecture, and related topics. While I continue to update it, there may still be areas where my understanding is lacking or where I may have made mistakes.
> If you find any issues or have suggestions for improvement, please feel free to submit an issue or a pull request. ☺️  
> (+ My English is not perfect, so please bear with me.)

#### Additional Resources.

> It might be helpful to also take a look at the following project in relation to Clean Architecture.  
> https://github.com/falsy/clean-architecture-with-typescript

## Languages

- [English](https://github.com/falsy/domain-driven-react-architecture)
- [한글](https://github.com/falsy/domain-driven-react-architecture/blob/main/README-ko.md)

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

Let’s assume we’re dealing with a financial services domain. Within this broad domain of finance, there are many subdomains such as banking, payment services, lending services, asset management, and fintech. Further breaking down the fintech domain, we can have smaller domains like digital payments, digital banking, crowdfunding, and personal asset management.

In this sample project, we will look at a very simple example application in `the Personal Asset Management` domain.

## Entities

An `Entity` is one of the core concepts of domain modeling, representing an object that maintains identity through a unique identifier while having state and behavior. An `Entity` is not just a data holder but also plays a role in directly controlling and managing its data, expressing important business rules and logic within the domain.

## Aggregates

![Aggregate](/_images/aggregate.png#gh-light-mode-only)
![Aggregate](/_images/aggregate-dark.png#gh-dark-mode-only)

An `Aggregate` is an object that serves as a consistency boundary and can include multiple entities or value objects. It encapsulates its internal state, ensuring that any external access is controlled and can only be modified through the `Aggregate Root`. This consistency boundary helps manage the complexity of relationships within the model, especially as the service scales and transactions become more complex.

## Use Cases

A `Use Case` defines the interactions between the user and the service and clarifies the business functions the service must provide using domain objects (`Entity`, `Aggregate`, `Value Object`). From a system architecture perspective, a `Use Case` separates application logic from business rules, allowing the application to use the business rules and logic contained in the domain objects without directly controlling the business logic.

# Sample Project

Through a very simple sample project that shows the user’s cards, accounts, and consumption data, and allows for adding consumption data, we will examine the data flow and how each layer of the architecture interacts.

## Use Stack

TypeScript, Webpack, React, React-Query, Emotion, Class-Validator, Axios

## Communitaction Flow

![Communitaction Flow](/_images/flow.png#gh-light-mode-only)
![Communitaction Flow](/_images/flow-dark.png#gh-dark-mode-only)

The basic layers and communication flow follow the principles of `Clean Architecture`.

## Directory Structure

> For simplicity, the interface directory is omitted.

```
/src
├─ adapters
│  ├─ domains
│  │  ├─ aggregates
│  │  │  └─ entities
│  │  ├─ entities
│  │  ├─ useCases
│  │  └─ vos
│  ├─ presenters
│  ├─ repositories
│  ├─ infrastructures
│  ├─ dtos
│  └─ vms
├─ components
│  ├─ commons
│  ├─ networks
│  └─ ...
├─ constants
│  ├─ networks
│  ├─ queries
│  └─ ...
├─ di
├─ hooks
└─ pages
   └─ ...
```

Directories are clearly separated by system layers. Within the domain directory, `Entities` and `Aggregates` are separated, and `Entities` used only within an `Aggregate` are placed inside the `Aggregate` to clearly indicate restricted external access. In the sample project, common components of the UI layer are placed in the commons folder, components related to react-query are in the networks folder, and other components are placed in domain-specific directories.

## Entities

The sample project defines five entities: `User`, `Transaction`, `Franchise`, `Card`, and `Account`. All of these have unique identifiers and state values. However, this sample project is very simple and only displays data to the user, so it does not include business logic for modifying state or interacting with other entities.

## Aggregates

To reduce the complexity of `entities` and `value objects` used in the service, two aggregates, `CardTransaction` and `AccountTransaction`, are defined with the `Transaction` entity as the Aggregate Root.
A simple interface for `CardTransaction` looks like this:

### CardTransaction

```ts
interface ITransaction {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly franchiseId?: string
  readonly cardId?: string
  readonly accountId?: string
  readonly createdAt: string
}

interface ICardTransaction extends ITransaction {
  readonly franchise?: IFranchise
  readonly card: ICard
}
```

As an extension of the `Transaction` entity, we define `CardTransaction`, which includes both the `Franchise` and `Card` entities.

Currently, `Franchise` is not used anywhere else in the service outside of `CardTransaction`, and while `Card` can be used independently as a list outside of `CardTransaction`, it is not displayed simultaneously on the client’s screen and does not require separate state management logic. Therefore, we define `Card` and `Franchise` within `CardTransaction` (as the Aggregate Root), ensuring that `Franchise` and `Card` can only be accessed through `CardTransaction` when it is in use, thereby reducing the complexity of relationships between models within the service.

## Infrastructures

The `Infrastructure` layer manages connections with the outside of the application, such as communication with external servers using HTTP or browser Web APIs like LocalStorage.
In the sample project, the ClientHTTP class is defined to handle HTTP communication with external servers using the axios library.

## Repositories

In backend services, the `Repository` layer typically performs `CRUD` operations related to databases, handling basic data manipulation like storing, querying, updating, and deleting data. It abstracts the interaction with the database so that the business logic does not need to be aware of the data storage details.

Similarly, in the sample project, the `Repository` layer handles `POST`, `GET`, `PUT`, and `DELETE` operations related to HTTP communication with the server, abstracting these interactions so the business logic does not need to know the data's origin. Furthermore, data received from the external server is encapsulated as `DTO` and validated to ensure stability when used within the client.

When an API server is used by multiple clients, the clients may receive properties that are not immediately needed. However, in the `Repository`, all data—including those not currently in use—is declared and encapsulated to ensure the integrity and extensibility of API communication.

## Use Cases

The sample project includes very simple business logic:

- Users can view their consumption history.
  1.  Retrieve a list of franchises, cards, and accounts.
  2.  Include account information for account transactions.
  3.  Include card information for card transactions.
  4.  Include franchise information for card transactions.
  5.  Display the transactions to the user.
- Users can view their list of owned cards.
- Users can view their list of owned accounts.
- Users can add new consumption data.

The `Use Cases` layer uses domain objects (`Entity`, `Aggregate`, `Value Object`) to encapsulate the required `DTO` values back into `Entities` and `Aggregates` to execute the business logic.

And since all properties were encapsulated in a `DTO` within the `Repository`, any unused properties are removed at this stage when they are encapsulated as an `Entity` in the `Use Case`.

### Inversion of Control

![Alt Inversion Of Control](/_images/inversion-of-control.png#gh-light-mode-only)
![Alt Inversion Of Control](/_images/inversion-of-control-dark.png#gh-dark-mode-only)

Since the `Use Cases` layer is a higher layer than the `Repository` layer and should not depend on it, it relies on abstract interfaces of the `Repository` and operates through DI(Dependency Injection).

## Presenters

The `Presenter` layer is ultimately DI-injected(Dependency Injection) to interact with the UI and configure the service. `Presenters` provide specific methods used in the UI layer and encapsulate data into a VM (View Model) optimized for UI use.

In the sample project, to display the `recent summary of card transactions` in the UI, the `getRecentCardTransactionSummary` method of the Presenter is called. This method calls the `getTransaction` method of the Use Case with parameters for a specific period and type(card or account). In this process, the `UI` does not need to know the internal logic of the `Use Case`, nor the details about the period or type of data.

Additionally, by encapsulating the `CardTransaction` Aggregate received as a response into a VM suitable for the UI, the complexity of the data is reduced, and the dependency between the UI and the Presenter is minimized. Below is a VM class that encapsulates the Aggregate:

```ts
interface ICardTxnSummaryVM {
  readonly id: string
  readonly amount: number
  readonly keyword: string
  readonly card: ICardInfoVO
  readonly longTime: number
  readonly dayOfWeek: string
  readonly day: string
}
```

By minimizing dependency between the UI and the Presenter, we mean that if the UI wants to change how the date is displayed, from `5(Tue)` to `09/05`, for example, it can do so by modifying only how the `createdAt` value of CardTransaction is used in the VM’s constructor, without requiring any changes to the Presenter. This allows for flexible formatting adjustments directly in the UI by redefining date properties, such as switching from `dayOfWeek` and `day` to `year` and `month` in the VM.

## UI

The `UI` layer ultimately configures the service by its relationship with the DI-injected Presenter.

`DI(Dependency Injection)` is implemented using the Context API, Provider, and Hooks.

```ts
export default function DependencyProvider({
  children
}: {
  children: ReactNode
}) {
  const infrastructures = infrastructuresFn()
  const repositories = repositoriesFn(infrastructures.clientHTTP)
  const useCases = useCasesFn(repositories)
  const presenters = presentersFn(useCases)

  const dependencies = {
    presenters
  }

  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  )
}
```

In the sample project, the components of the UI are designed to lower dependency on `React-Query` and configure the service more component-centrically by using `React-Query` and Higher-Order Components(HOC).

For example, the component structure that displays the list of cards in the sample project is as follows:

```ts
// CardSection.tsx
...
export default function CardSection() {
  return (
    <div>
      <ErrorContainer>
        <QueryContainer
          queryKey={GET_CARDS}
          queryFn={() => di.card.getCards()}
          loadingComponent={<Loader />}
          errorComponent={
            <RefetchContainer queryKey={GET_CARDS}>
              <Error />
            </RefetchContainer>
          }
        >
          <ResCardList />
        </QueryContainer>
      </ErrorContainer>
    </div>
  )
}
```

```ts
// ResCardList.tsx
...
export default function ResCardList({ response }: { response?: Array<ICard> }) {
  const cards = response || []

  return (
    <div>
      <ul>
        {cards.map((card) => (
          <li key={card.id}>
            <CardItem card={card} />
          </li>
        ))}
      </ul>
    </div>
  )
}
```

To explicitly distinguish between components that receive data using `useQuery` and those that modify data using `useMutation` in the HOC structure, components receiving data are prefixed with `Res-`, while those modifying data are prefixed with `Act-`.

## Screenshot

![Screenshot](/_images/screenshot-v2.png)

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

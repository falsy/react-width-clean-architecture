# Domain-driven React architecture

이 프로젝트는 `도메인 주도 디자인(DDD: Domain-driven Design)`의 원칙을 React 아키텍처에 적용한 작은 아이디어 프로젝트입니다. 이 프로젝트의 목표는 비즈니스 도메인의 복잡성을 효과적으로 관리하고 모듈식 도메인 중심 디자인을 구축하여 서비스의 확장과 유지 관리를 더 쉽게 만드는 것입니다.

그리고 샘플 프로젝트의 구현은 `클린 아키텍처`를 시스템 아키텍처를 사용합니다. 이 프로젝트는 리액트 프레임워크를 사용하지만, 프레임워크 의존성을 최소화 하여 핵심 원칙인 `프레임워크 독립성`을 최대한 유지하도록 설계하였습니다. 주요 도메인 로직과 비즈니스 규칙은 프레임워크와 무관하게 작성되었으며, UI레이어에 한해서만 리액트에 의존하도록 설계하였습니다.

#### Note.

> 이 프로젝트는 제가 OOP, DDD, 클린 아키텍처 그리고 관련한 주제들을 공부하며 진행하고 있는 프로젝트입니다. 계속 업데이트 하고 있지만, 여전히 저의 지식이 부족하기 때문에 제가 오해하거나 잘못 설명한 부분이 있을 수 있습니다.  
> 문제점이나 개선 사항이 있다면 이슈나 풀 리퀘스트 부탁드립니다. ☺️

#### Additional Resources.

> 클린 아키텍처와 관련된 다음 프로젝트도 함께 살펴보시면 좋을 것 같습니다.  
> https://github.com/falsy/clean-architecture-with-typescript

## Languages

- [English](https://github.com/falsy/domain-driven-react-architecture)
- [한글](https://github.com/falsy/domain-driven-react-architecture/blob/main/README-ko.md)

## Ubiquitous Language

![Ubiquitous Language](/_images/ubiquitous.png#gh-light-mode-only)
![Ubiquitous Language](/_images/ubiquitous-dark.png#gh-dark-mode-only)

유비쿼터스 언어는 프로젝트 전반에 걸쳐 의사소통의 일관성을 유지하기 위해 모든 팀원이 사용하는 공유 언어를 말합니다.
이 언어는 프로젝트 리더, 도메인 전문가, 개발자, UI/UX 디자이너, 비즈니스 분석가, QA 엔지니어 등을 포함한 모든 프로젝트 구성원이 공유해야 합니다. 그리고 이 언어는 협업 중 문서화나 대화에 사용될 뿐만 아니라 소프트웨어 모델과 코드에도 반영되어야 합니다.

예를 들어, `Transaction`이라는 용어는 다양한 팀원에 따라 다르게 해석될 수 있습니다. 프로젝트 리더의 경우, 이는 비즈니스 흐름에서 중요한 단계나 이벤트를 나타낼 수 있습니다. 개발자의 경우, 이는 데이터베이스의 작업 단위를 의미할 수 있습니다. 도메인 전문가의 경우, 이는 거래나 지불과 관련된 활동을 나타낼 수 있습니다.
그러나 이 샘플 프로젝트에서 `Transaction`는 사용자 소비 데이터를 구성하는 단위로 정의되어 모든 팀원이 공유하는 유비쿼터스 언어의 일부가 됩니다.

## Domains

![Domains](/_images/domains-v2.png#gh-light-mode-only)
![Domains](/_images/domains-v2-dark.png#gh-dark-mode-only)

금융 서비스 도메인을 다루고 있다고 가정해 보겠습니다. 이 금융 이라는 큰 도메인 안에는 은행, 지불 서비스, 대출 서비스, 자산 관리, 핀테크와 같은 많은 하위 도메인이 있습니다. 그리고 다시 그 하위 도메인 중 핀테크 도메인을 더 세분화하면 디지털 지불, 디지털 뱅킹, 크라우드펀딩, 개인 자산 관리 등과 같은 더 작은 도메인으로 나뉠 수 있습니다.

이후에 이 샘플 프로젝트에서는 `개인 자산 관리` 도메인의 아주 간단한 예제 애플리케이션을 살펴보겠습니다.

### Entities

`Entity`는 도메인 모델링의 핵심 개념 중 하나로, 고유한 식별자(Identity)를 통해 동일성을 유지하면서 상태와 행동을 가지는 객체입니다. `Entity`는 단순히 데이터를 보관하는 구조체가 아니라, 자신의 데이터를 직접 제어하고 관리하는 역할을 하며, 도메인 내에서 중요한 비즈니스 규칙과 로직을 표현합니다.

### Aggregates

![Aggregate](/_images/aggregate.png#gh-light-mode-only)
![Aggregate](/_images/aggregate-dark.png#gh-dark-mode-only)

`Aggregate`는 여러 엔티티와 값 객체를 포함할 수 있는 일관성 경계로, 내부 상태를 캡슐화하여 외부에서의 접근을 제어합니다. 모든 수정은 반드시 `Aggregate Root`를 통해서만 이루어지며, 이는 모델 내의 관계 복잡성을 관리하고, 서비스 확장 및 트랜잭션 복잡성 증가 시 일관성을 유지하는 데 도움이 됩니다.

### Use Cases

`Use Case`는 사용자와 서비스 간의 상호작용을 정의하며, 도메인 객체(`Entity`, `Aggregate`, `Value Object`)를 활용하여 서비스가 사용자에게 제공해야 하는 비즈니스 기능을 명확히 합니다. 시스템 아키텍처 관점에서 `Use Case`는 애플리케이션 로직과 비즈니스 규칙을 분리하는 역할을 하며, 직접적으로 비즈니스 로직을 제어하기보다는 도메인 객체가 가진 비즈니스 규칙과 로직을 활용할 수 있도록 돕습니다.

# Sample Project

사용자의 카드와 계좌 그리고 소비 데이터를 보여주고 소비 데이터를 추가할 수 있는 아주 간단한 샘플 프로젝트를 통해 서비스의 데이터가 어떠한 흐름을 갖고 아키텍처의 각 레이어가 어떠한 상호 작용을 하는지 알아보겠습니다.

## Use Stack

TypeScript, Webpack, React, React-Query, Emotion, Class-Validator, Axios

## Communitaction Flow

![Communitaction Flow](/_images/flow.png#gh-light-mode-only)
![Communitaction Flow](/_images/flow-dark.png#gh-dark-mode-only)

기본 레이어와 커뮤니케이션 흐름은 `클린 아키텍처` 원칙을 따릅니다.

## Directory Structure

> 단순화를 위해 인터페이스 디렉토리는 생략되었습니다.

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
├─ di
├─ components
│  ├─ commons
│  ├─ networks
│  └─ ...
├─ constants
│  ├─ networks
│  ├─ queries
│  └─ ...
└─ pages
   └─ ...
```

디렉토리는 각 시스템 레이어 별로 명확하게 구분하였습니다. 도메인 디렉토리 내에서는 `Entities`와 `Aggregates`를 구분하고, `Aggregates` 내부에서만 사용되는 `Entity`는 `Aggregates` 안에 위치시켜 외부 접근이 제한됨을 명확히 표현했습니다. 샘플 프로젝트에서 UI 계층의 공통 구성 요소는 commons 폴더에, react-query와 관련된 구성 요소는 networks 폴더에 배치하였으며, 나머지 요소들은 도메인별로 디렉토리에 배치하였습니다.

## Entities

샘플 프로젝트에서는 `User`, `Transaction`, `Franchise`, `Card`, `Account` 이렇게 5개의 `Entity`를 정의하였습니다. 이들은 모두 고유의 식별자와 상태값을 가지고 있습니다. 하지만 이 샘플 프로젝트는 사용자에게 데이터 보여주기만 하는 아주 단순한 프로젝트이기 때문에 자신의 상태를 변경하거나 다른 엔티티와 상호 작용하는 비즈니스 로직은 가지고 있지 않습니다.

## Aggregates

서비스에 사용되는 Entity와 Value Object의 복잡성을 낮추기 위해 `Transaction` Entity를 `Aggregate Root`로 하는 `CardTransaction`와 `AccountTransaction` 이렇게 두 개의 `Aggregate`을 정의하였습니다.  
간단하게 `CardTransaction`의 인터페이스를 살펴보면 아래와 같습니다.

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
  readonly card: ICardInfoVO
}
```

`Transaction` Entity의 확장으로 `CardTransaction`를 정의하고 그 안에는 `Franchise` Entity와 `Card`의 정보를 담은 `Value Object`를 가지고 있습니다.

현재 샘플 프로젝트의 모든 Entity는 수정에 대한 부분이 없지만, `Card` Entity의 경우 서비스에서 `CardTransaction` 외에서 독립적으로도 사용되기 때문에 생성 시점에 `Value Object` 값으로 정의함으로써 불편의 값임 보장합니다.

`Franchise`의 경우 현재 서비스에서 `CardTransaction` 외에서는 사용되지 않기 때문에 `CardTransaction(Aggregate Root)`를 통해서만 접근이 가능하도록 하여 서비스 내의 모델간 관계의 복잡성을 낮춥니다.

## Infrastructures

`Infrastructure` 레이어에서는 웹 서비스에서 일반적으로 많이 사용하는 HTTP를 사용한 외부 서버와의 통신이나 또는 LocalStorage와 같은 브라우저의 Web API와 같은 애플리케이션 외부와의 연결을 관리합니다.  
샘플 프로젝트에서는 axios 라이브러리를 사용하여 외부 서버와 HTTP 통신을 담당하는 ClientHTTP 클래스를 정의하여 사용하고 있습니다.

## Repositories

일반적으로 백엔드에서 서버에서 `Repository` 레이어는 데이터베이스와 관련된 `CRUD` 작업을 수행하며 데이터의 저장, 조회, 수정, 삭제와 같은 기본적인 데이터 조작을 처리합니다. 그리고 그러한 데이터베이스와의 상호작용을 추상화하여 비즈니스 로직에서 데이터 저장소에 대해 알 필요가 없도록 합니다.

같은 원리로 샘플 프로젝트에서 `Repository` 레이어는 서버와의 HTTP 통신에 관련된 `POST`, `GET`, `PUT`, `DELETE` 작업을 수행하며 그 상호작용을 추상화하여 비즈니스 로직에서는 데이터의 출처에 대해서 알 필요가 없도록 하였습니다. 그리고 외부 서버로부터 받은 데이터는 `DTO`로 캡슐화하고 이를 검증하는 로직을 수행함으로써, 이후 이 데이터가 클라이언트 내부에서 사용될 때의 안정성을 보장합니다.

## Use Cases

샘플 프로젝트는 아주 단순한 비즈니스 로직들을 가지고 있습니다.

- 사용자는 소비 내역을 볼 수 있습니다.
  1. 프랜차이즈 리스트, 카드 리스트, 계좌 리스트를 조회합니다.
  2. 계좌 내역의 경우 내역에 해당하는 계좌 정보를 포함시킵니다.
  3. 카드 내역의 경우 내역에 해당하는 카드 정보를 포함시킵니다.
  4. 카드 내역의 경우 내역에 해당하는 프랜차이즈 정보를 포함시킵니다.
  5. 내역을 사용자에게 보여줍니다.
- 사용자는 소유한 카드 목록을 볼 수 있습니다.
- 사용자는 소유한 계좌 목록을 볼 수 있습니다.
- 사용자는 새로운 소비 내역을 추가할 수 있습니다.

`Use Cases` 레이어에서는 도메인 객체(`Entity`, `Aggregate`, `Value Object`)를 활용하여 필요로 하는 `DTO` 값을 다시 `Entity`로 그리고 `Aggregate`로 다시 캡슐화하며 위 비즈니스 로직을 수행합니다.

### Inversion of Control

![Alt Inversion Of Control](/_images/inversion-of-control.png#gh-light-mode-only)
![Alt Inversion Of Control](/_images/inversion-of-control-dark.png#gh-dark-mode-only)

`Use Cases` 레이어는 `Repository` 레이어보다 상위 레이어로 `Repository`에 의존하면 안되기 때문에 `Repository`를 추상화한 인터페이스를 가지고 구현하며 이후에 DI(Dependency Injection)를 통해 동작하도록 합니다.

## Presenters

`Presenter` 레이어는 최종적으로 DI(Dependency Injection)되어 UI와 상호 작용하며 서비스를 구성합니다. `Presenter`는 UI 레이어에서 사용하는 구체적인 메서드를 제공하고, UI에서 사용되는 최적화된 VM(View Model)로 데이터를 다시 캡슐화하여 전달합니다.

샘플 프로젝트에서 `최근의 요약된 카드 소비 내역`을 UI에 표시하기 위해 `Presenter`의 `getRecentCardTransactionSummary` 메서드를 호출합니다. 이 메서드는 `Use Case`의 `getTransaction` 메서드를 특정 기간과 타입(카드 또는 계좌) 파라미터를 사용해 호출합니다. 이 과정에서 `UI`는 `Use Case`의 내부 로직뿐만 아니라 데이터의 기간이나 타입에 대한 세부 정보를 알 필요가 없습니다.

또한, 응답으로 받은 `CardTransaction` Aggregate을 UI에 적합한 VM으로 다시 캡슐화하여 데이터의 복잡성을 줄이고, UI와 Presenter 간의 의존성을 낮춥니다. 아래는 최종적으로 Aggregate을 다시 캡슐화한 VM 클래스입니다.

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

여기에서 UI와 Presenter 간의 의존성을 낮췄다는 것은, 예를 들어 화면에서 날짜를 `5(화)`와 같이 표시하던 것을 `09/05` 형식으로 변경하려고 할 때, Presenter의 수정 없이 VM의 생성자에서 CardTransaction의 `createdAt` 값을 사용하는 방식만 변경하여, UI에 필요한 형식을 자유롭게 적용할 수 있다는 의미입니다. 즉, VM의 생성자에서 날짜 속성을 `dayOfWeek`와 `day` 대신 `year`와 `month`로 정의하는 방식으로 변경하면, UI에 새로운 날짜 형식을 쉽게 반영할 수 있습니다.

## UI

`UI` 레이어에서는 최종적으로 `DI`한 `Presenter`와의 관계로 서비스를 구성합니다.

```ts
import ClientHTTP from "adapters/infrastructures/ClientHTTP"
import repositoriesFn from "adapters/repositories"
import useCasesFn from "adapters/domains/useCases"
import presentersFn from "adapters/presenters"

// DI
const clientHttp = new ClientHTTP()
const repositories = repositoriesFn(clientHttp)
const useCases = useCasesFn(repositories)
const presenters = presentersFn(useCases)

export default presenters
```

그 밖의 샘플 프로젝트에서는 `React-Query`와 고차 컴포넌트(HOC: Higher-Order Component)를 활용하여 UI의 구성 요소들과 `React-Query`와의 의존성을 낮추고 조금 더 컴포넌트 중심으로 서비스를 구성할 수 있도록 설계하였습니다.

예를 들면, 샘플 프로젝트에서 카드 리스트를 화면을 출력하는 컴포넌트 구조는 아래와 같습니다.

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

그리고 고차 컴포넌트 구성에서 데이터를 받는 컴포넌트를 명시적으로 구분하기 위해 `useQuery`를 사용하여 데이터를 받는 컴포넌트의 경우 `Res-`라는 프리픽스를, `useMutation`를 사용하여 데이터를 변화시키는 컴포넌트의 경우 `Act-`라는 프리픽스를 사용하여 구성하였습니다.

> `React-Query`와 `HOC`를 활용한 컴포넌트 구성은 아직 실험중인 구성입니다.

## Screenshot

![Screenshot](/_images/screenshot-v2.png)

## Run Project

### 설치

```
yarn
```

### 실행

```
yarn start
```

## Thank You!

모든 지원과 관심에 감사드립니다. 🙇‍♂️

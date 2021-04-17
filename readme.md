# Object-oriented React Architecture
This is an idea sample code based on the React Clean Architecture sample code written earlier.  
[(react-with-clean-architecture)](https://github.com/falsy/react-with-clean-architecture)  
It's still not enough, but it's actually the structure i'm using for the project, and i'm trying to improve it with better ideas little by little.  
  
if you leave an issue or a pull request, we will reflect the insufficient part or improvement. ☺️   

## Use Stack
Typescript, Webpack, React, Recoil, Emotion

## Communitaction Flow
![Alt Communitaction Flow](/_readme/communication-flow-v1.png)
in simple diagram, it is as above.

### Infrastructure
In the infrastructure layer, the medium for communication with the outside is abstracted.  

### Repository
In the repository layer, you select an external element to request the necessary data and configure the data type required for the request.  

### Presenter
In the presenter layer, the data received from the outside is converted to the View Model.  

### UI
The UI layer manages the global and component state, and outputs views.  

## Directory Structure
```
./src
├─ constants
├─ adapters
│  ├─ infrastructures
│  │  └─ interfaces
│  ├─ repositories
│  │  └─ interfaces
│  ├─ presenters
│  │  ├─ interfaces
│  │  └─ converter-interfaces
│  ├─ dto
│  └─ vm
├─ services
│  └─ converters
├─ di
└─ ui
   ├─ components
   │  └─ ...
   └─ hooks
      └─ ...
```

## Run Project
### 1. Mock Server
#### Install
```shell
# ./mock-server
$ npm install
```
#### Start
```shell
# ./mock-server
$ npm start
```

### 2. Project
#### Install
```shell
# ./
$ npm install
```
#### Start
```shell
# ./
$ npm start
```

## Version
v1.1.1 - [ChangeLog](https://github.com/falsy/object-oriented-react-architecture/blob/master/changelog.md)
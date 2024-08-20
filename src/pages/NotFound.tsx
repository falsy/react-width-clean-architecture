import Navigation from "components/commons/Navigation"
import Container from "components/commons/containers/Container"
import Header from "components/commons/Header"

export default function NotFound() {
  return (
    <div>
      <Navigation />
      <Container>
        <div>
          <Header>
            <h1>404 Not Found</h1>
          </Header>
        </div>
      </Container>
    </div>
  )
}

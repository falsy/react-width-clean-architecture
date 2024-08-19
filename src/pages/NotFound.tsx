import Container from "components/containers/Container"
import Header from "components/Header"
import Navigation from "components/Navigation"

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

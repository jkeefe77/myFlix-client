import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const NavigationBar = ({ user, onLoggedOut, handleSearchInput }) => {
  const handleLogout = () => {
    const confirmLogout = window.confirm("are you sure you want to log off?");
    if (confirmLogout) {
      onLoggedOut();
    }
  };
  return (
    <Navbar bg="light" className="rounded-3" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {!user && (
              <>
                <Nav.Link className="link-header-light" as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="link-header-light" as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link
                  className="link-header-medium-mr-auto"
                  as={Link}
                  to="/"
                >
                  Home
                </Nav.Link>
                <Nav.Link className="link-header-dark" as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className="ms-lg-auto">
                  Logout
                </Nav.Link>
                <Form>
                  <Form.Control
                    id="search-bar"
                    type="text"
                    placeholder="Search by title"
                    onChange={handleSearchInput}
                  />
                </Form>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

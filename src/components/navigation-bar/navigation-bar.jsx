import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
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
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

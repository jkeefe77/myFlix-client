import { UserInfo } from "./user-info";
import { Col, Container, Button } from "react-bootstrap";
import { UserEdit } from "./user-edit";
import { Link } from "react-router-dom";
import { FavoriteMovies } from "./favorite-movies";


export const ProfileView = ({
  user,
  token,
  movies,
  updateUser,
  onLoggedOut,
}) => {
  const deleteAccount = () => {
    console.log(user);
    fetch(
      `https://filmsonthefly-app-ca635d09fe99.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Your account has been deleted. Good Bye!");
          onLoggedOut();
        } else {
          alert("Could not delete account");
        }
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <>
      <Col xxl={4} xl={5} lg={6} md={12} xs={12} className="px-4 text-primary">
        <UserInfo user={user} />
        <UserEdit
          user={user}
          token={token}
          updateUser={updateUser}
          onLoggedOut={onLoggedOut}
        />
        <Button variant="danger"
        onClick={() => {
             if (
              window.confirm(
                "Are you sure you want to remove your account from our site?"
              )
            ) {
              deleteAccount();
            }
          }}
          className="w-100 mt-3"
        >
          Deactivate Account
        </Button>
      </Col>
      <Container className="bg-dark mb-4 px-4 rounded-4">
        <FavoriteMovies movies={movies} user={user} />
      </Container>
    </>
  );
};

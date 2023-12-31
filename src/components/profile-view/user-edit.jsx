import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const UserEdit = ({ user, token, updateUser, onLoggedOut }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {};

    username ? (data.Username = username) : "";
    email ? (data.Email = email) : "";
    password ? (data.Password = password) : "";
    birthday ? (data.Birthday = birthday) : "";

    console.log("user ", user);
    console.log("token", token);
    console.log("data ", data);

    fetch(
      `https://filmsonthefly-app-ca635d09fe99.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        alert("Your data was updated!");
        onLoggedOut();
      } else {
        console.log(data);
        alert("Something Wrong");
      }
    });
  };

  return (
    <>
      <container>
        <div class="userinfo">
          <br></br>
          <h2 className="fs-3">Update your profile</h2>
          <Form className=" pt-3" onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="5"
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label className="pt-2">Password:</Form.Label>
              <Form.Control
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label className="pt-2">Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBirthday">
              <Form.Label className="pt-2">Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>

            <Button className="mt-4 w-25" variant="secondary" type="submit">
              Update
            </Button>
          </Form>
        </div>
      </container>
    </>
  );
};

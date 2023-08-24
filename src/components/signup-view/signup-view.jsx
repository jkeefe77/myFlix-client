import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

export const SignupView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const signupData = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://filmsonthefly-app-ca635d09fe99.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(signupData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          const loginData = {
            Username: username,
            Password: password,
          };

          return fetch(
            "https://filmsonthefly-app-ca635d09fe99.herokuapp.com/login",
            {
              method: "POST",
              body: JSON.stringify(loginData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => response.json())
            .then((data) => {
              console.log("Login response: ", data);
              if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
                alert("Welcome!");
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else {
          alert("Username already taken.  Please try again");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container className="signupform">
      <Row className="justify-content-center align-items-center">
        <Col xs={5} sm={12} md={12}>
          <CardGroup>
            <Card>
              <Card.Body className="justify-content-center align-items-center">
                <Card.Title>Login or Signup!</Card.Title>
                <form onSubmit={handleSubmit}>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength="3"
                      placeholder="Enter a username"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength="8"
                        placeholder="Your password must 8 or more characters"
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="Enter your email address"
                        />
                      </Form.Group>

                      <Form.Group>
                        <Form.Group controlId="formBirthday">
                          <Form.Label>Birthday</Form.Label>
                          <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            required
                          />
                        </Form.Group>
                        <br></br>
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={(event) => {
                            event.preventDefault();
                            handleSubmit(event);
                            onLoggedIn();
                          }}
                        >
                          Submit
                        </Button>
                      </Form.Group>
                    </Form.Group>
                  </Form.Group>
                </form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};

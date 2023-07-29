import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProtectedRoutes } from "./protected-routes";

import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProfileView } from "../profile-view/profile-view";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const updateUser = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  useEffect(() => {
    if (!token) return;

    //fetch for movies data from backend API
    fetch("https://filmsonthefly-app-ca635d09fe99.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            imagePath: movie.imagePath,
            Description: movie.Description,
            director: movie.Director,
            Genres: movie.Genres,
            Title: movie.Title,
            _id: movie._id,
          };
        });
        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <Row className="justify-content-md-center">
        <Col className="mb-4 .bg-warning">
          <NavigationBar
            user={user}
            onLoggedOut={() => {
              setUser(null);
              setToken(null);
              localStorage.clear();
              window.location.reload();
            }}
          />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col className="m=2" md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col className="m-3" md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <ProtectedRoutes user={user}>
                {movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      user={user}
                      token={token}
                      updateUser={updateUser}
                    />
                  </Col>
                )}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoutes user={user}>
                {movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col key={movie._id} xxl={4} xl={6} lg={12} md={12} xs={12}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes user={user}>
                {
                  <>
                    <Col>
                      <ProfileView
                        user={user}
                        token={token}
                        movies={movies}
                        onLoggedOut={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                        updateUser={updateUser}
                      />
                    </Col>
                  </>
                }
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};

import React from "react";
import CreateForumCard from "../components/CreateForumCard";
import { Container } from "react-bootstrap";


function CreateForum({ isAuthenticated }) {
  return (
    <>
      <Container>
        <CreateForumCard isAuthenticated={ isAuthenticated }/>
      </Container>
    </>
  );
}

export default CreateForum;

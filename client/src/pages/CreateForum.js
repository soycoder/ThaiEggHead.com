import React from "react";
import CreateForumCard from "../components/CreateForumCard";
import { Container } from "react-bootstrap";

function CreateForum({ isAuthenticated }) {
  return (
    <>
      <Container className="create-forum-page">
        <div className="create-forum-div">
          <CreateForumCard isAuthenticated={ isAuthenticated }/>
        </div>
      </Container>
    </>
  );
}

export default CreateForum;

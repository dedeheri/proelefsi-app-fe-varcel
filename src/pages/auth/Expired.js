import React from "react";
import Container from "../../components/auth/Container";

function Expired({ message }) {
  return (
    <Container>
      <div className="space-y-9">
        <h1 className="text-xl font-medium text-center">{message}</h1>
      </div>
    </Container>
  );
}

export default Expired;

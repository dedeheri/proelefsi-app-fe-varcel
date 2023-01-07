import React from "react";

// components
import { Container } from "../../components/";

function NotFound() {
  return (
    <Container title={"Not Found"}>
      <div className="flex justify-center py-24">
        <h1 className="text-4xl md:text-5xl font-medium">OOPS... 404</h1>
      </div>
    </Container>
  );
}

export default NotFound;

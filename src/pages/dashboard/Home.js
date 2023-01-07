import React, { useEffect, useState } from "react";
import { requestHome } from "../../action/home";
import { Container } from "../../components";

function Home() {
  const [state, setState] = useState({
    loading: true,
    error: false,
    data: "",
    message: "",
  });

  useEffect(() => {
    requestHome(setState);
  }, []);

  console.log(state);

  return (
    <Container error={state.error} message={state.message}>
      <div>Home</div>
    </Container>
  );
}

export default Home;

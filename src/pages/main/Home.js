import React from "react";
import { Trending, ForYou, Container, MaxWidth } from "../../components/main";

function Home() {
  return (
    <Container title={"Home"}>
      <div className="space-y-14">
        <MaxWidth>
          <Trending />
        </MaxWidth>
        <div className="border-b dark:border-[#353535]" />
        <MaxWidth>
          <ForYou />
        </MaxWidth>
      </div>
    </Container>
  );
}

export default Home;

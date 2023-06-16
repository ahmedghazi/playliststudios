import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

type Props = {
  url: string;
};

const Container = styled.div`
  path {
    fill: red;
  }
`;

const Logo = (props: Props) => {
  const [svg, setSvg] = useState(null);

  useEffect(() => {
    // console.log(props.svg)
    const abortController = new AbortController();

    const headers = {
      // mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      signal: abortController.signal,
    };
    fetch(props.url, headers)
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        setSvg(res);
      })
      .catch(console.error.bind(console));

    return () => abortController.abort();
  }, []);

  return (
    <Container>
      {svg && <div dangerouslySetInnerHTML={{ __html: svg }} />}
    </Container>
  );
};

export default Logo;

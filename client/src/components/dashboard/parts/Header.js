import React from "react";
import styled from "styled-components";

const Background = styled.div`
  background: ${(props) => props.theme.primary};
  width: 100%;
  height: 52px;
`;

const Header = () => {
  return <Background></Background>;
};

export default Header;

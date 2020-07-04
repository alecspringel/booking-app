import React from "react";
import styled from "styled-components";

const SecondaryButton = (props) => {
  return <Button {...props}>{props.content}</Button>;
};

export default SecondaryButton;

const Button = styled.button`
  border: 2px solid ${(props) => props.theme.primary};
  color: ${(props) => props.theme.primary};
  border-radius: ${(props) => props.theme.border};
`;

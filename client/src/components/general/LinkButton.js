import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const LinkButton = (props) => {
  return (
    <StyleWrapper
      {...props}
      onClick={() =>
        props.history.push({
          pathname: props.path,
        })
      }
    >
      <Link to={props.path}>{props.label}</Link>
    </StyleWrapper>
  );
};

export default withRouter(LinkButton);

const StyleWrapper = styled.div`
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.primary};
  padding: 5px 10px;
  border-radius: ${(props) => props.theme.border};
  a {
    font-size: 18px;
    color: ${(props) => props.theme.primary};
  }
`;

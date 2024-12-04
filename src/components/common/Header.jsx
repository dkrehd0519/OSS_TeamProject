import React from "react";
import styled from "styled-components";
import Weather from "../../apis/Weather";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <LeftContainer>
        <Logo>Weather Diary</Logo>
        <h3
          onClick={() => {
            navigate(`/list`);
          }}
        >
          일기장
        </h3>
      </LeftContainer>
      <Weather />
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 30px;
  background-color: hsl(240deg 33.33% 14.12%);
  color: white;
`;

const LeftContainer = styled.div`
  display: flex;
  h3 {
    margin-left: 70px;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  font-family: "PT Serif", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 30px;
  display: flex;
  align-items: center;
`;

// const RightContainer = styled.div`

// `

// const LeftContainer = styled.div`

// `

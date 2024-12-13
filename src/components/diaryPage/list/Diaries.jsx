import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getDiaryList from "../../../apis/getDiaries";
import { useNavigate } from "react-router-dom";

function Diaries() {
  const navigate = useNavigate();
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const fetchedDiaries = await getDiaryList();
        setDiaries(fetchedDiaries);
      } catch (error) {
        console.error("Error fetching diary list", error);
      }
    };
    fetchDiaries();
  }, []);

  return (
    <>
      <InfoText>☀️ 날씨별로 일기에 다른 배경화면이 나와요 ! 작성후 확인해보세요 😄</InfoText>
      <Wrapper>
        <BtnWrapper>
          <Title>
            <h1>일기장</h1>
          </Title>
          <CreateDiaryBtn onClick={() => navigate(`/createDiary/`)}>
            <h3>일기쓰기</h3>
          </CreateDiaryBtn>
        </BtnWrapper>
        <DiaryContainer>
          <DiaryWrapper>
            {diaries
              .slice()
              .reverse()
              .map((diary, index) => (
                <Diary key={index} onClick={() => navigate(`/diaryDetail/${diary.id}`)}>
                  <h2>{diary.title}</h2>
                  <p>날짜: {diary.date}</p>
                  <p>글쓴이: {diary.author}</p>
                  <p>날씨: {diary.weather}</p>
                  <p>위치: {diary.location}</p>
                  <p>기분: {diary.mood}</p>
                </Diary>
              ))}
          </DiaryWrapper>
        </DiaryContainer>
      </Wrapper>
    </>
  );
}

export default Diaries;

const Wrapper = styled.div`
  padding-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const InfoText = styled.div`
  width: 100vw;
  height: 70px;
  font-size: 20px;
  font-weight: 900;
  color: hsla(207 89.8% 53.9% / 1);
  background-color: hsl(207deg 89.8% 53.9% / 10%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnWrapper = styled.div`
  width: 1224px;
`;

const Title = styled.div`
  text-align: center;
`;

const CreateDiaryBtn = styled.div`
  width: 80px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 0 20px;
  background-color: #f9d72f;
  margin-left: auto;
  margin-right: 10px;
  cursor: pointer;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  &:hover {
    background-color: hsla(50 94.3% 47.8% / 1);
    border-color: hsla(50 94.3% 47.8% / 1);
  }
`;

const DiaryContainer = styled.div`
  margin-top: 20px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

const DiaryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1224px;
`;

const Diary = styled.div`
  width: 222px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 2px solid #f9d72f;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 30px;
  padding: 30px;
  cursor: pointer;

  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  &:hover {
    --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
`;

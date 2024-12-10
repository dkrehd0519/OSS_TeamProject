import React, { useEffect, useState } from "react";
import styled from "styled-components";
import getDiaryList from "../../../apis/getDiaries";

function Diaries() {
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
    <Wrapper>
      <CreateDiaryBtn>
        <h3>일기쓰기</h3>
      </CreateDiaryBtn>
      <DiaryContainer>
        {diaries.map((diary, index) => (
          <Diary key={index}>
            <h2>{diary.title}</h2>
            <p>날짜: {diary.date}</p>
            <p>글쓴이: {diary.author}</p>
            <p>날씨: {diary.weather}</p>
            <p>위치: {diary.location}</p>
            <p>기분: {diary.mood}</p>
          </Diary>
        ))}
      </DiaryContainer>
    </Wrapper>
  );
}

export default Diaries;

const Wrapper = styled.div`
  padding: 100px;
  display: flex;
  flex-direction: column;
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
  margin-left: 40px;
`;

const DiaryContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  justify-content: center;
`;

const Diary = styled.div`
  width: 300px;
  height: 340px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid #f9d72f;
  margin-right: 25px;
  padding: 30px;
  margin-bottom: 25px;
`;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import getDiaryDetail from "../../../apis/getDiaryDetail";
import deleteDiary from "../../../apis/deleteDiary";
import Clear from "../../../assets/background/Clear.webp";
import Rainy from "../../../assets/background/Rainy.webp";
import Snowy from "../../../assets/background/Snowy.webp";
import Cloudy from "../../../assets/background/Cloudy.webp";

function DiaryDetail() {
  const params = useParams();
  const [diaryDetail, setDiaryDetail] = useState([]);
  const navigate = useNavigate();

  const contentRef = useRef(null);
  const [isContentOverflow, setIsContentOverflow] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      const windowHeight = window.innerHeight;
      setIsContentOverflow(contentHeight > windowHeight);
    }
  }, [diaryDetail]);

  useEffect(() => {
    const fetchDiarieDetail = async () => {
      try {
        const fetchedDiaryDetail = await getDiaryDetail(params.id);
        setDiaryDetail(fetchedDiaryDetail);
      } catch (error) {
        console.error("Error fetching diary detail", error);
      }
    };
    fetchDiarieDetail();
    const weatherMapping = {
      맑음: "Clear",
      흐림: "Cloudy",
      비: "Rainy",
      눈: "Snowy",
    };
    const englishWeather = weatherMapping[diaryDetail.weather];
    const newBackground = backgroundImages[englishWeather];
    setSelectedBackground(newBackground);
  }, [diaryDetail.weather]);

  const deleteDiaryDetail = async () => {
    const isConfirmed = window.confirm("정말 삭제하시겠어요?");
    if (!isConfirmed) return;
    try {
      await deleteDiary(params.id);
      navigate(`/list`);
    } catch (error) {
      console.error("목표 삭제 실패", error);
    }
  };

  const backgroundImages = { Clear, Rainy, Snowy, Cloudy };
  const [selectedBackground, setSelectedBackground] = useState();

  return (
    <Wrapper
      style={{
        width: "100vw",
        backgroundImage: `url(${selectedBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: "-3",
      }}
    >
      <Container
        style={{
          marginTop: isContentOverflow ? "0" : "30px",
        }}
      >
        <ContentWrapper>
          <h1>{diaryDetail.title}</h1>
          <AuthorContainer>
            <p>{diaryDetail.author}</p>
            <p>{diaryDetail.date}</p>
          </AuthorContainer>
          <AuthorContainer>
            <p>위치 : {diaryDetail.location}</p>
            <p>날씨 : {diaryDetail.weather}</p>
          </AuthorContainer>
          <BlackLine />

          <MainContent>
            {diaryDetail.content &&
              diaryDetail.content.split("\n").map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}

            <p style={{ marginTop: "40px" }}>오늘의 기분 : {diaryDetail.mood}</p>
          </MainContent>
        </ContentWrapper>
      </Container>
      <BtnContainer
        style={{
          marginBottom: isContentOverflow ? "0" : "50px",
        }}
      >
        <PutBtn onClick={() => navigate(`/updateDiary/${params.id}`)}>수정</PutBtn>
        <DeleteBtn onClick={deleteDiaryDetail}>삭제</DeleteBtn>
      </BtnContainer>
    </Wrapper>
  );
}

export default DiaryDetail;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 최소 높이를 100vh로 설정 */
  height: fit-content; /* 콘텐츠가 크면 콘텐츠에 맞춰 조정 */
`;

const Container = styled.div`
  width: 700px;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  border-radius: 20px;
  justify-content: center;

  /* background-color: white; */
  padding-top: 30px;
`;

const ContentWrapper = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  h1 {
    text-align: center;
  }
  margin-bottom: 40px;
`;

const AuthorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

const BlackLine = styled.div`
  height: 20px;
  border-bottom: 3px solid black;
`;

const MainContent = styled.div`
  font-size: 18px;
  font-weight: 900;
  line-height: 2;
`;

const BtnContainer = styled.div`
  width: 700px;
  display: flex;
  margin-top: 30px;
`;

const PutBtn = styled.div`
  width: 70px;
  height: 60px;
  color: white;
  font-size: 18px;
  background-color: hsla(240 33.3% 14.1% / 1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-left: auto;
  font-weight: 900;
  margin-right: 20px;
  cursor: pointer;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  &:hover {
    background-color: hsl(240deg 33.3% 10% / 90%);
  }
`;

const DeleteBtn = styled.div`
  width: 70px;
  height: 60px;
  color: white;
  font-size: 18px;
  background-color: hsla(14 100% 57.1% / 1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  font-weight: 900;
  cursor: pointer;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  &:hover {
    background-color: hsla(14 100% 57.1% / 90%);
  }
`;

import React, { useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { fixedWeatherState } from "../../../recoil/atom";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import createDiary from "../../../apis/createDiary";
import { useNavigate } from "react-router-dom";

function CreateDiary() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const { weatherType, city } = useRecoilValue(fixedWeatherState);
  const [selectedWeather, setSelectedWeather] = useState(() => {
    switch (weatherType) {
      case "Clear":
        return "맑음";
      case "Cloudy":
        return "흐림";
      case "Rainy":
        return "비";
      case "Snowy":
        return "눈";
      default:
        return "맑음";
    }
  });
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const contentRef = useRef(null);
  const moodRef = useRef(null);
  const locationRef = useRef(null);

  const formDataToSend = {
    title,
    author,
    date: selectedDate.format("YYYY-MM-DD"),
    content,
    mood,
    location: city,
    weather: selectedWeather,
  };

  const saveDiary = async () => {
    try {
      await createDiary(formDataToSend);
      alert("일지가 저장되었습니다!");
      navigate(`/list`);
    } catch (error) {
      console.error("일지 저장 실패: ", error);
      alert("일지 저장에 실패했습니다.");
    }
  };

  const handleValidation = () => {
    if (!title) {
      alert("제목을 입력해주세요 !");
      return false;
    }
    if (!author) {
      alert("작성자를 입력해주세요 !");
      return false;
    }
    if (!content) {
      alert("내용을 입력해주세요 !");
      return false;
    }
    if (!mood) {
      alert("오늘의 기분을 입력해주세요 !");
      return false;
    }
    if (!city) {
      alert("위치를 입력해주세요 !");
      return false;
    }
    return true;
  };

  const handleWeatherChange = (event) => {
    setSelectedWeather(event.target.value);
  };

  const handleSubmit = () => {
    const isValid = handleValidation();
    if (isValid) {
      saveDiary();
    }
  };

  return (
    <Wrapper>
      <Title>
        <h1>일기 쓰기</h1>
      </Title>
      <Container>
        <CustomTextField
          id="title"
          label="제목"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleRef}
        />
        <DoubleLine>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="작성날짜"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                slotProps={{
                  textField: {
                    sx: {
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          border: "2px solid #f9d72f",
                        },
                        "&:hover fieldset": {
                          borderColor: "#f9d72f",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#2196f3",
                        },
                      },
                    },
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <CustomTextField
            id="author"
            label="작성자"
            variant="outlined"
            sx={{ width: "400px", marginTop: "8px" }}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            ref={authorRef}
          />
        </DoubleLine>
        <CustomTextField
          label="내용"
          multiline
          rows={12}
          variant="outlined"
          fullWidth
          value={content}
          onChange={(e) => setContent(e.target.value)}
          ref={contentRef}
        />
        <CustomTextField
          id="mood"
          label="오늘의 기분"
          variant="outlined"
          fullWidth
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          ref={moodRef}
        />
        <CustomTextField
          id="location"
          label="위치"
          variant="outlined"
          fullWidth
          defaultValue={city}
          ref={locationRef}
        />

        <Box sx={{ minWidth: 120, marginBottom: "20px" }}>
          <FormControl
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "2px solid #f9d72f",
                },
                "&:hover fieldset": {
                  borderColor: "#f9d72f",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#2196f3",
                },
              },
            }}
          >
            <InputLabel id="weather-select-label">날씨</InputLabel>
            <Select
              labelId="weather-select-label"
              id="weather-select"
              value={selectedWeather}
              label="날씨"
              onChange={handleWeatherChange}
            >
              <MenuItem value="맑음">맑음</MenuItem>
              <MenuItem value="흐림">흐림</MenuItem>
              <MenuItem value="비">비</MenuItem>
              <MenuItem value="눈">눈</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <SubmitBtn onClick={handleSubmit}>저장</SubmitBtn>
      </Container>
    </Wrapper>
  );
}

export default CreateDiary;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const Title = styled.div`
  text-align: center;
  margin: 30px;
`;

const Container = styled.div`
  width: 700px;
  height: 115vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DoubleLine = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CustomTextField = styled(TextField)`
  .MuiOutlinedInput-root {
    & fieldset {
      border: 2px solid #f9d72f;
    }
    &:hover fieldset {
      border-color: #f9d72f;
    }
    &.Mui-focused fieldset {
      border-color: #2196f3;
    }
  }
`;

const SubmitBtn = styled.div`
  width: 70px;
  height: 60px;

  font-size: 18px;
  background-color: hsla(50 94.4% 58% / 1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-left: auto;
  font-weight: 900;
  cursor: pointer;
  &:hover {
    background-color: hsla(50 94.3% 47.8% / 1);
    border-color: hsla(50 94.3% 47.8% / 1);
  }
`;

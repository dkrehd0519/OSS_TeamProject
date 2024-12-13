import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import cities from "../../json/cities.json";

export default function FilterSelectProvince({ filterProvinceValue, setFilterProvinceValue }) {
  const provinceMapping = {
    "Gyeonggi Province": "경기도",
    "South Gyeongsang Province": "경상남도",
    "North Gyeongsang Province": "경상북도",
    "South Chungcheong Province": "충청남도",
    "North Chungcheong Province": "충청북도",
    "South Jeolla Province": "전라남도",
    "North Jeolla Province": "전라북도",
    "Jeju Province": "제주도",
    "Gangwon Province": "강원도",
  };

  const provinceSet = new Set();
  cities.forEach((city) => {
    if (city.province && city.province.trim() !== "") {
      provinceSet.add(city.province);
    }
  });

  const provinceOptions = ["all", ...provinceSet];

  const handleChange = (event) => {
    setFilterProvinceValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginBottom: "20px", marginLeft: "10px" }}>
      <FormControl fullWidth>
        <InputLabel id="filter-province-select-label">지역 선택</InputLabel>
        <Select
          labelId="filter-province-select-label"
          id="filter-province-select"
          value={filterProvinceValue}
          label="지역 선택"
          onChange={handleChange}
        >
          <MenuItem value="all">전체</MenuItem>
          {provinceOptions
            .filter((p) => p !== "all")
            .map((prov, idx) => (
              <MenuItem key={idx} value={prov}>
                {provinceMapping[prov] || prov} {/* UI에 한국어 표시 */}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}

// FilterSelectProvince.jsx
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import cities from "../../json/cities.json"; // 실제 city 데이터 import

export default function FilterSelectProvince({ filterProvinceValue, setFilterProvinceValue }) {
  // cities에서 unique province 목록 추출
  const provinceSet = new Set();
  cities.forEach((city) => {
    if (city.province && city.province.trim() !== "") {
      provinceSet.add(city.province);
    }
  });

  const provinceOptions = ["all", ...provinceSet]; // all + unique province list

  const handleChange = (event) => {
    setFilterProvinceValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginBottom: "20px", width: "20%", marginLeft: "10px" }}>
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
                {prov}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}

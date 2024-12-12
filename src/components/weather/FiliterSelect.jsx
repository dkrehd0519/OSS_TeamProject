import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FilterSelect({ filterValue, setFilterValue }) {
  const handleChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div>
      <Box sx={{ minWidth: 120, marginBottom: "20px" }}>
        <FormControl fullWidth>
          <InputLabel id="filter-select-label">시, 군</InputLabel>
          <Select
            labelId="filter-select-label"
            id="filter-select"
            value={filterValue}
            label="필터"
            onChange={handleChange}
          >
            <MenuItem value="all">전체</MenuItem>
            <MenuItem value="metropolitan">광역시(특례시 포함)</MenuItem>
            <MenuItem value="city">시</MenuItem>
            <MenuItem value="county">군</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  );
}

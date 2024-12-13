import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
} from "@mui/material";
import TablePaginationActions from "./TablePaginationAction";
import { fetchWeatherForCities } from "../../apis/SearchCity";
import cities from "../../json/cities.json";
import { useRecoilValue } from "recoil";
import { weatherState } from "../../recoil/atom";
import Clear from "../../assets/background/Clear.webp";
import Rainy from "../../assets/background/Rainy.webp";
import Snowy from "../../assets/background/Snowy.webp";
import Cloudy from "../../assets/background/Cloudy.webp";
import FilterSelect from "./FiliterSelect";
import FilterSelectProvince from "./FilterSelectProvince";

const WeatherList = () => {
  const [rows, setRows] = useState([]);
  const [filterValue, setFilterValue] = useState("all");
  const [filterProvinceValue, setFilterProvinceValue] = useState("all");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [loading, setLoading] = useState(true);

  const { weatherType } = useRecoilValue(weatherState);
  const backgroundImages = { Clear, Rainy, Snowy, Cloudy };
  const [selectedBackground, setSelectedBackground] = useState(Clear);

  useEffect(() => {
    const newBackground = backgroundImages[weatherType] || Clear;
    setSelectedBackground(newBackground);
  }, [weatherType]);

  const filterCities = () => {
    return cities.filter((city) => {
      let typeCondition = true;
      if (filterValue === "city") {
        typeCondition = city.type === "City";
      } else if (filterValue === "county") {
        typeCondition = city.type === "County";
      } else if (filterValue === "metropolitan") {
        typeCondition =
          city.type === "Metropolitan City" ||
          city.type === "Special City" ||
          city.type === "Special Self-Governing City";
      }

      let provinceCondition = true;
      if (filterProvinceValue !== "all") {
        provinceCondition = city.province === filterProvinceValue;
      }

      return typeCondition && provinceCondition;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const filteredCityObjects = filterCities();
      const cityNames = filteredCityObjects.map((cityObj) => cityObj.cityname);
      const weatherData = await fetchWeatherForCities(cityNames);
      setRows(weatherData);
      setPage(0);
      setLoading(false);
    };

    fetchData();
  }, [filterValue, filterProvinceValue]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = !loading && page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${selectedBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: "-3",
        paddingTop: "80px",
      }}
    >
      <Box sx={{ width: "60%", margin: "auto", display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ marginLeft: "30px" }}>전국 날씨</h2>
        <div style={{ display: "flex" }}>
          <FilterSelect filterValue={filterValue} setFilterValue={setFilterValue} />
          <FilterSelectProvince
            filterProvinceValue={filterProvinceValue}
            setFilterProvinceValue={setFilterProvinceValue}
          />
        </div>
      </Box>

      <TableContainer component={Paper} sx={{ width: "60%", margin: "auto" }}>
        <Table sx={{ minWidth: 600 }} aria-label="weather table">
          <TableHead>
            <TableRow>
              <TableCell>도시명</TableCell>
              <TableCell align="right">온도</TableCell>
              <TableCell align="right">날씨</TableCell>
              <TableCell align="right">구름</TableCell>
              <TableCell align="right">바람</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} style={{ height: 53 }}>
                    {i === 0 ? (
                      <TableCell colSpan={5} align="center">
                        Loading 중...
                      </TableCell>
                    ) : (
                      <TableCell colSpan={5} />
                    )}
                  </TableRow>
                ))
              : (rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map(
                  (row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.city}</TableCell>
                      <TableCell align="right">{row.temperature ? `${row.temperature}°C` : "N/A"}</TableCell>
                      <TableCell align="right">{row.weather || "N/A"}</TableCell>
                      <TableCell align="right">{row.cloud || "N/A"}</TableCell>
                      <TableCell align="right">{row.wind || "N/A"}</TableCell>
                    </TableRow>
                  )
                )}
            {!loading && emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          {!loading && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  colSpan={5}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};

export default WeatherList;

import React, { useEffect, useState } from "react";
import BackButton from "../BackButton/BackButton";
import axios from "axios";

const ExcelOutputForm = () => {
  const [years, setYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const url = process.env.REACT_APP_API_ENDPOINT + "get-excel-output";

  useEffect(() => {
    const startYear = currentYear - 5;
    let tempArray = [];
    for (let i = startYear; i <= currentYear; i++) {
      tempArray.push(i);
    }
    setYears(tempArray);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { year: currentYear }, { responseType: 'blob' });
      if (response.status === 200) {
        const file = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = "【" + currentYear + "】現金出納帳";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(fileURL);
      } else {
        alert("失敗");
        console.log(response);
      }
      console.log("response:", response.data);
    } catch (error) {
      console.error("Excel出力エラー:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <select 
              name="year" 
              id="year" 
              value={currentYear} 
              onChange={(e) => setCurrentYear(Number(e.target.value))}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>年度</div>
        </div>
        <div>
          <input type="submit" value="出力する" className="border" />
        </div>
      </form>
      <BackButton />
    </div>
  );
};

export default ExcelOutputForm;

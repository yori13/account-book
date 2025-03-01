import React, { useEffect, useState } from "react";

const ExcelOutputForm = () => {
  const [years, setYears] = useState([]);
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 5;
    
    const optionTag = () => {
      let tempArray = [];
      for (let i = startYear; i <= currentYear; i++) {
        tempArray.push(i);
      }
      setYears(tempArray);
      setCurrentYear(currentYear);
    };

    optionTag();
  }, []);

  return (
    <div>
      <form action="">
        <div>
          <select name="year" id="year">
            {years.map((year) => (
              <option 
                key={year} 
                value={year} 
                selected={year === currentYear}
              >
                {year}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};

export default ExcelOutputForm;

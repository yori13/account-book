import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const CreditEditPage = () => {
  const navigate = useNavigate();
  const creditDataItems = useSelector((state) => state.creditDataEntries, []);
  const creditDetail = useSelector((state) => state.creditDetailEntries, []);
  const category = [
    "ガソリン",
    "携帯代",
    "作業着代",
    "材料費",
    "ETC代",
    "その他"
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}`;
  };

  const handleEditPage = (itemIndex) => {
    const sendData = creditDataItems.slice(itemIndex, itemIndex + 6);
    navigate("/CreditEditInput", { state: sendData });
  };

  return (
    <>
      <div>
        <table className="table-flex w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border px-4 py-2">支払い月</th>
              <th className="border px-4 py-2">費目</th>
              <th className="border px-4 py-2">金額</th>
              <th className="border px-4 py-2">備考</th>
              <th className="border px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {creditDataItems.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* 支払い月 */}
                {index % 6 === 0 && (
                  <tr>
                    <td rowSpan="6" className="border px-4 py-2 text-center align-middle">
                      {item.date ? formatDate(item.date) : ""}
                    </td>
                    <td className="border px-4 py-2">{category[item.category_code - 1]}</td>
                    <td className="border px-4 py-2">{item.credit_price}</td>
                    <td rowSpan="6" className="border px-4 py-2 text-center align-middle">
                      {creditDetail[item.category_detail_code-1]?.detail || ""}
                    </td>
                    <td rowSpan="6" className="border py-2 text-center align-middle">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded font-bold"
                        onClick={() => handleEditPage(index)}
                      >
                        編集
                      </button>
                    </td>
                  </tr>
                )}
                {index % 6 !== 0 && (
                  <tr>
                    <td className="border px-4 py-2">{category[item.category_code - 1]}</td>
                    <td className="border px-4 py-2">{item.credit_price}</td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CreditEditPage;

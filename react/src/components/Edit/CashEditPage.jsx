import React from "react";
import { useDispatch, useSelector } from 'react-redux';

const CashEditPage = () => {
  const cashDataItems = useSelector((state) => state.cashDataEntries);
  const itemsArray = Object.values(cashDataItems);
  console.log(itemsArray);
  

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-fixed w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="w-1/6 border px-4 py-2">日付</th>
              <th className="w-1/6 border px-4 py-2">費目</th>
              <th className="w-1/6 border px-4 py-2">摘要</th>
              <th className="w-1/6 border px-4 py-2">金額項目</th>
              <th className="w-1/6 border px-4 py-2">金額</th>
              <th className="w-1/6 border px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {itemsArray.map((item) => (
              <tr key={item.id}>
                <td className="border text-center">{item.date}</td>
                <td className="border text-center">{}</td>
                <td className="border text-center">{item.memo}</td>
                <td className="border text-center">{item.price_type_code}</td>
                <td className="border text-center">{item.price}</td>
                <td className="border text-center">{item.tax}</td>
                <td className="border">
                  <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold rounded py-2 px-4">編集</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CashEditPage;

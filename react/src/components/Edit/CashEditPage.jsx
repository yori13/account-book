import React from "react";

const CashEditPage = () => {
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
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CashEditPage;

import React from "react";

const CreditEditPage = () => {
  return(
    <>
      <div className="overflow-x-auto">
        <table className="table-fixed w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="w-1/8 border px-4 py-2">ガソリン代</th>
              <th className="w-1/8 border px-4 py-2">携帯電話代</th>
              <th className="w-1/8 border px-4 py-2">作業着代</th>
              <th className="w-1/8 border px-4 py-2">材料費</th>
              <th className="w-1/8 border px-4 py-2">ETC</th>
              <th className="w-1/8 border px-4 py-2">その他</th>
              <th className="w-1/8 border px-4 py-2">備考</th>
              <th className="w-1/8 border px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CreditEditPage;
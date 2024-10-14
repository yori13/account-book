import React from "react";
import { useSelector } from "react-redux";
import BackButton from "../BackButton/BackButton";
import axios from "axios";

const CreditConfirmation = () => {
  const store = useSelector((state) => state);
  const formData = store.entries; // entriesが存在しない場合は空の配列を使う
  console.log(formData);
  return (
    <div>
      {/* スマホサイズでの表示 */}
      <div className="mt-5">
        <form>
          <div className="sm:flex sm:flex-col w-full px-7 mb-10 justify-center">
            <div className="block sm:hidden">
              <div className="grid grid-cols-2 border border-black">
                <div className="border border-black p-2 text-center">
                  支払い月
                </div>
                <div className="border border-black p-2 text-right">
                  {formData.date}
                </div>

                <div className="border border-black p-2 text-center">
                  ガソリン代
                </div>
                <div className="border border-black p-2 text-right">
                  {formData.gasoline}
                </div>

                <div className="border border-black p-2 text-center">
                  携帯代
                </div>
                <div className="border border-black p-2 text-right">
                  {formData.phone}
                </div>

                <div className="border border-black p-2 text-center">
                  作業着代
                </div>
                <div className="border border-black p-2 text-right">
                  {formData.uniform}
                </div>

                <div className="border border-black p-2 text-center">
                  材料費
                </div>
                <div className="border border-black p-2 text-right">
                  {formData.material}
                </div>

                <div className="border border-black p-2 text-center">ETC代</div>
                <div className="border border-black p-2 text-right">
                  {formData.etc}
                </div>

                <div className="border border-black p-2 text-center">
                  その他
                </div>
                <div className="border border-black p-2 text-right">
                  {formData.other}
                </div>

                <div className="border border-black p-2">その他詳細</div>
                <div className="border border-black p-2 break-words">
                  {formData.detail}
                </div>
              </div>
            </div>

            {/* スマホサイズ以外での表示 */}
            <div className="hidden sm:block">
              <table className="table-fixed border border-black text-center w-full">
                <thead className="border border-black">
                  <tr>
                    <th className="border border-black">支払い月</th>
                    <th className="border border-black">ガソリン代</th>
                    <th className="border border-black">携帯代</th>
                    <th className="border border-black">作業着代</th>
                    <th className="border border-black">材料費</th>
                    <th className="border border-black">ETC代</th>
                    <th className="border border-black">その他</th>
                    <th className="border border-black">その他詳細</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black">{formData.date}</td>
                    <td className="border border-black">{formData.gasoline}</td>
                    <td className="border border-black">{formData.phone}</td>
                    <td className="border border-black">{formData.uniform}</td>
                    <td className="border border-black">{formData.material}</td>
                    <td className="border border-black">{formData.etc}</td>
                    <td className="border border-black">{formData.other}</td>
                    <td className="border border-black text-left break-words">{formData.detail}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex justify-center grid-cols-2 space-x-3">
            <input
              type="submit"
              value="入力完了"
              className="border border-gray-300 bg-blue-500 hover:bg-blue-300 text-white py-4 px-6 rounded-3xl font-bold mb-5"
            />
            <BackButton></BackButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreditConfirmation;

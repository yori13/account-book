import React from "react";
import HeaderCompornent from '../header/header'; // ヘッダー

const EditPage = () => {
  return (
    <HeaderCompornent>
      <div>
        <div>
          <div>
            <h1>編集</h1>
          </div>
          <div class="bg-white">
            <nav class="flex flex-row">
              <button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500">
                Tab 1
              </button>
              <button class="text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none">
                Tab 2
              </button>
            </nav>
          </div>
          <div>
            <p>1</p>
          </div>
          <div>
            <p>2</p>
          </div>
        </div>
      </div>
    </HeaderCompornent>
  );
};

export default EditPage;

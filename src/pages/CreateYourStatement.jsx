import React from "react";

const CreateYourStatement = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-slate-100">
      <div className="flex flex-col justify-center items-center space-y-4 text-xl">
        <p>Create your statement</p>
        <input
          className="p-2 rounded-md py-4"
          type="text"
          placeholder="I think..."
        />
        <button className="py-2 bg-gray-600 opacity-40 text-white rounded-full p-4 px-5 cursor-pointer hover:bg-blue-400">Submit</button>
      </div>
    </div>
  );
};

export default CreateYourStatement;

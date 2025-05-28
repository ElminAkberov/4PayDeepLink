import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TbCopy } from "react-icons/tb";

const Info = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, uuid } = location.state || {};
  const [copiedMessage, setCopiedMessage] = useState("");

  const handleCopy = (text) => {
    if (text) {
      navigator.clipboard.writeText(text);
      setCopiedMessage("Скопировано");
      setTimeout(() => setCopiedMessage(""), 1500);
    }
  };

  return (
    <section className="bg-[#F8F8F8] w-full min-h-screen flex flex-col items-center justify-center px-4 relative">
      <h2 className="text-2xl text-center text-[18px] mb-3">
        Банковские реквизиты
      </h2>

      {copiedMessage && (
        <div className="absolute top-4 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow">
          {copiedMessage}
        </div>
      )}

      <div className="space-y-4 max-w-md w-full">
        <div className="bg-white border border-[#ccc] rounded-2xl shadow-lg p-6 w-full space-y-4">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2 justify-between">
              <span className="text-gray-600">Название банка:</span>
              <span className="font-bold">{data?.bank?.name || "-"}</span>
            </div>

            <div className="flex items-center gap-x-2 justify-between">
              <span className="text-gray-600">Номер телефона СБП:</span>
              <div className="flex items-center gap-x-1">
                <span className="font-bold">
                  {data?.sbp_phone_number || "-"}
                </span>
                {data?.sbp_phone_number && (
                  <TbCopy
                    className="cursor-pointer text-gray-500 hover:text-black"
                    onClick={() => handleCopy(data.sbp_phone_number)}
                  />
                )}
              </div>
            </div>

            <div className="flex items-center gap-x-2 justify-between">
              <span className="text-gray-600">Сумма:</span>
              <div className="flex items-center gap-x-1">
                <span className="font-bold">
                  {data?.amount ? `${data?.amount} ₽` : "-"}
                </span>
                {data?.amount && (
                  <TbCopy
                    className="cursor-pointer text-gray-500 hover:text-black"
                    onClick={() => handleCopy(`${data.amount} ₽`)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            navigate(`/${uuid}`);
          }}
          className="bg-[#72E484] cursor-pointer w-full border-black font-[500] py-2 rounded-[24px] text-sm"
        >
          Hазад
        </button>
      </div>
    </section>
  );
};

export default Info;

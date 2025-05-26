import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Info = () => {
  const location = useLocation();
  const { data } = location.state || {};
  return (
    <section className="bg-[#F8F8F8] w-full min-h-screen flex flex-col items-center justify-center px-4">
      <h2 className="text-2xl text-center text-[18px] mb-3">
        Банковские реквизиты
      </h2>
      <div className="space-y-4 max-w-md w-full">
        <div className="bg-white border border-[#ccc] rounded-2xl shadow-lg p-6 w-full  space-y-4">
          <div className="space-y-4 ">
            <div className="flex items-center gap-x-2 justify-between">
              <span className="text-gray-600">Название банка:</span>
              <span className="font-bold">{data?.bank?.name || "-"}</span>
            </div>
            <div className="flex items-center gap-x-2 justify-between">
              <span className="text-gray-600">Номер телефона СБП:</span>
              <span className="font-bold">{data?.sbp_phone_number || "-"}</span>
            </div>
            <div className="flex items-center gap-x-2 justify-between">
              <span className="text-gray-600">Сумма:</span>
              <span className="font-bold">
                {data?.amount ? `${data?.amount} ₽` : "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Info;

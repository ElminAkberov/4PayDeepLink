import React from "react";
import QRCode from "react-qr-code";
const Desktop = () => {
  const currentUrl = window.location.href;
  return (
    <section>
      <div className="inter relative flex justify-center items-center w-[350px] aspect-square bg-white shadow-[0px_90px_200px_8px_#0000001A] rounded-[28px] ">
        <div className="bg-[#72E484] text-[14px] py-2 leading-5 text-center text-[#000000] mx-8 rounded-[12px] absolute top-[-30px]">
          Просканируйте QR код с мобильного устройства, чтобы перейти к оплате
        </div>
        <QRCode value={currentUrl} className=" p-[10px]" />
      </div>
    </section>
  );
};

export default Desktop;

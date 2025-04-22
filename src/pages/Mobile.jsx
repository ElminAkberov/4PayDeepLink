import React from "react";
import sberBank from "../assets/logo/SberBank.svg";
import alfaBank from "../assets/logo/AlfaBanks.svg";
import tBank from "../assets/logo/TBank.svg";

const Mobile = () => {
  const [selectedBank, setSelectedBank] = React.useState("");

  const encoded =
    "dGlua29mZmJhbms6Ly9NYWluL1BheUJ5TW9iaWxlTnVtYmVyP251bWJlclBob25lPTkxMjM0NTY3ODkmYW1vdW50PTUwMCZiYW5rTWVtYmVySWQ9MTAwMDAwMDAwMTEx";
  const decoded = atob(encoded);

  const handleBankClick = (bank) => {
    setSelectedBank(bank);
  };

  return (
    <div className="text-black flex flex-col gap-4 mb-10">
      <span className="text-2xl text-center text-[18px] mb-3">
        Выберите Банк для оплаты
      </span>

      <div
        onClick={() => handleBankClick("sber")}
        className={`${
          selectedBank === "sber" ? "bg-linear_sber" : "bg-white"
        } font-[600] flex items-center hover:bg-sber duration-300 gap-x-6 text-black px-6 py-6 max-h-[100px] rounded-xl text-[18px]`}
      >
        <img src={sberBank} alt="" />
        Сбербанк
      </div>

      <div
        onClick={() => handleBankClick("tBank")}
        className={`${
          selectedBank === "tBank" ? "bg-linear_tbank" : "bg-white"
        } font-[600] flex items-center gap-x-4 text-black hover:bg-tbank px-6 py-6 max-h-[100px] rounded-xl text-[18px]`}
      >
        <img src={tBank} alt="" />
        Т-Банк
      </div>

      <div
        onClick={() => handleBankClick("alfaBank")}
        className={`${
          selectedBank === "alfaBank" ? "bg-linear_alfabank" : "bg-white"
        } font-[600] flex items-center gap-x-6 text-black hover:bg-alfabank px-6 py-10 max-h-[100px] rounded-xl text-[18px]`}
      >
        <img src={alfaBank} alt="" />
        <span className="mb-[5px]"> Альфа-Банк</span>
      </div>

      <button
        onClick={() => {
          if (selectedBank == "tBank") {
            window.location.href = decoded;
          }
        }}
        className="bg-[#72E484] font-[500] py-2 rounded-[24px] text-sm mt-4"
      >
        Оплатить
      </button>
      <button className="border border-black font-[500] py-2 rounded-[24px] text-sm">
        Другой банк
      </button>
    </div>
  );
};

export default Mobile;

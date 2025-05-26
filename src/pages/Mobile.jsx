import React from "react";
import sberBank from "../assets/logo/SberBank.svg";
import alfaBank from "../assets/logo/AlfaBanks.svg";
import tBank from "../assets/logo/TBank.svg";
import { useGetDeeplinkQuery } from "../features/api/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

const Mobile = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [selectedBank, setSelectedBank] = React.useState("");
  const { data, error, isLoading } = useGetDeeplinkQuery(uuid, {
    skip: !uuid,
  });
  const templateBase64 =
    "dGlua29mZmJhbms6Ly9NYWluL1BheUJ5TW9iaWxlTnVtYmVyP251bWJlclBob25lPSZhbW91bnQ9JmJhbmtNZW1iZXJJZD0=";

  const template = atob(templateBase64);

  function fillTemplate(template, data) {
    const baseUri = template.split("?")[0];
    let numberPhone = data?.sbp_phone_number || "";
    const amount = data?.amount || "";
    const bankMemberId = data?.bank?.bik || "";

    const filled = `${baseUri}?numberPhone=${numberPhone}&amount=${amount}${
      bankMemberId && `&bankMemberId=${bankMemberId}`
    }`;
    return filled;
  }
  const filledUri = fillTemplate(template, data);

  const handleBankClick = (bank) => {
    setSelectedBank(bank);
  };

  return (
    <div className="text-black flex flex-col gap-4 mb-10">
      <h3 className="text-2xl text-center text-[18px] mb-3">
        Выберите Банк для оплаты
      </h3>

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
        disabled={!data || error}
        onClick={() => {
          if (selectedBank == "tBank") {
            window.location.href = filledUri;
          }
        }}
        className="bg-[#72E484] active:opacity-85 disabled:bg-[#ccc] disabled:pointer-events-none font-[500] py-2 rounded-[24px] text-sm mt-4"
      >
        Оплатить
      </button>
      <button
        onClick={() => {
          navigate("/info", { state: { data: data, loading: isLoading } });
        }}
        className="border border-black font-[500] py-2 rounded-[24px] text-sm"
      >
        Другой банк
      </button>
    </div>
  );
};

export default Mobile;

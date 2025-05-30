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
  const cardTemplate64 =
    "dGlua29mZmJhbms6Ly9NYWluL1BheS9DMkM/dGFyZ2V0Q2FyZE51bWJlcj0mYW1vdW50PQ==";
  const sber_a64 =
    "YW5kcm9pZC1hcHA6Ly9ydS5zYmVyYmFua21vYmlsZS9hbmRyb2lkLWFwcC9ydS5zYmVyYmFua21vYmlsZS9wYXltZW50cy9wMnA/dHlwZT1jYXJkX251bWJlciZyZXF1aXNpdGVOdW1iZXI9";
  const alfa_a64 = "YWxmYWJhbms6Ly9waG9uZV9iYW5rX3RyYW5zZmVycw==";
  const sber_ios64 =
    "c2JlcmJhbmtvbmxpbmU6Ly9zYmVyYmFua29ubGluZS8vcDJwdHJhbnNmZXI/dG89";
  const alfa_ios64 =
    "YWxmYWJhbms6Ly8vL2Rhc2hib2FyZC9waG9uZV9iYW5rX3RyYW5zZmVycw==";

  function fillTemplate(template, data) {
    let filled;
    const baseUri = template.split("?")[0];
    let numberPhone = data?.sbp_phone_number || "";
    const amount = data?.amount || "";
    const bankMemberId = data?.bank?.bik || "";
    const card_number = data?.card_number || "";

    if (card_number) {
      filled = `${baseUri}?targetCardNumber=${card_number}&amount=${amount}`;
    } else {
      filled = `${baseUri}?numberPhone=${numberPhone}&amount=${amount}${
        bankMemberId && `&bankMemberId=${bankMemberId}`
      }`;
    }
    return filled;
  }
  const handleBankClick = (bank) => {
    setSelectedBank(bank);
  };

  const getTemplateByBank = (bank) => {
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    switch (bank) {
      case "tBank":
        return data?.card_number ? atob(cardTemplate64) : atob(templateBase64);
      case "sber":
        return isIOS ? atob(sber_ios64) : atob(sber_a64);
      case "alfaBank":
        return isIOS ? atob(alfa_ios64) : atob(alfa_a64);
      default:
        return "";
    }
  };

  const getFilledUri = () => {
    const template = getTemplateByBank(selectedBank);
    if (!data) return "";

    if (selectedBank === "sber") {
      const requisiteNumber = data.card_number || data.sbp_phone_number || "";
      return `${template}${requisiteNumber}`;
    }

    if (selectedBank === "alfaBank") {
      return template;
    }

    return fillTemplate(template, data);
  };

  const filledUri = getFilledUri();

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
        <img src={sberBank} alt="Сбербанк" />
        Сбербанк
      </div>

      <div
        onClick={() => handleBankClick("tBank")}
        className={`${
          selectedBank === "tBank" ? "bg-linear_tbank" : "bg-white"
        } font-[600] flex items-center gap-x-4 text-black hover:bg-tbank px-6 py-6 max-h-[100px] rounded-xl text-[18px]`}
      >
        <img src={tBank} alt="Т-Банк" />
        Т-Банк
      </div>

      <div
        onClick={() => handleBankClick("alfaBank")}
        className={`${
          selectedBank === "alfaBank" ? "bg-linear_alfabank" : "bg-white"
        } font-[600] flex items-center gap-x-6 text-black hover:bg-alfabank px-6 py-10 max-h-[100px] rounded-xl text-[18px]`}
      >
        <img src={alfaBank} alt="Альфа-Банк" />
        <span className="mb-[5px]">Альфа-Банк</span>
      </div>

      <button
        disabled={!data || error || !selectedBank}
        onClick={() => {
          if (filledUri) {
            window.location.href = filledUri;
          }
        }}
        className="bg-[#72E484] active:opacity-85 disabled:bg-[#ccc] disabled:pointer-events-none font-[500] py-2 rounded-[24px] text-sm mt-4"
      >
        Оплатить
      </button>
      <button
        onClick={() => {
          navigate("/info", {
            state: { data, loading: isLoading, uuid },
          });
        }}
        className="border border-black font-[500] py-2 rounded-[24px] text-sm"
      >
        Другой банк
      </button>
    </div>
  );
};

export default Mobile;

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
  const templateBase64_Ios =
    "dC1iYW5rOi8vTWFpbi9QYXlCeU1vYmlsZU51bWJlcj9udW1iZXJQaG9uZT0mYW1vdW50PSZiYW5rTWVtYmVySWQ9";
  const templateBase64_Ios_2 =
    "dC1wb21vc2hjaDovL01haW4vUGF5QnlNb2JpbGVOdW1iZXI/bnVtYmVyUGhvbmU9JmFtb3VudD0mYmFua01lbWJlcklkPQ==";

  const fillTemplate = (templateBase64, data) => {
    const template = atob(templateBase64);
    const baseUri = template.split("?")[0];
    const numberPhone = data?.sbp_phone_number || "";
    const amount = data?.amount || "";
    const bankMemberId = data?.bank?.bik || "";

    return `${baseUri}?numberPhone=${numberPhone}&amount=${amount}${
      bankMemberId ? `&bankMemberId=${bankMemberId}` : ""
    }`;
  };

  const isIOS =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  const handlePay = () => {
    if (!data || error || selectedBank !== "tBank") return;

    if (isIOS) {
      const urls = [
        fillTemplate(templateBase64_Ios, data),
        fillTemplate(templateBase64_Ios_2, data),
        fillTemplate(templateBase64, data),
      ];

      let delay = 0;
      urls.forEach((url) => {
        setTimeout(() => {
          window.location.href = url;
        }, delay);
        delay += 2000;
      });
    } else {
      const androidUrl = fillTemplate(templateBase64, data);
      window.location.href = androidUrl;
    }
  };

  const handleBankClick = (bank) => setSelectedBank(bank);

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
        disabled={!data || error}
        onClick={handlePay}
        className="bg-[#72E484] active:opacity-85 disabled:bg-[#ccc] disabled:pointer-events-none font-[500] py-2 rounded-[24px] text-sm mt-4"
      >
        Оплатить
      </button>

      <button
        onClick={() =>
          navigate("/info", {
            state: { data, loading: isLoading, uuid },
          })
        }
        className="border border-black font-[500] py-2 rounded-[24px] text-sm"
      >
        Другой банк
      </button>
    </div>
  );
};

export default Mobile;

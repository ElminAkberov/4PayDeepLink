import React from "react";

const App = () => {
  const [showBlackScreen, setShowBlackScreen] = React.useState(false);
  const [isRealMobile, setIsRealMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      const mobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) && navigator.maxTouchPoints > 1;
      const screenWidth = window.innerWidth;
      setIsRealMobile(mobile);
      if (screenWidth < 1024 && !mobile) {
        setShowBlackScreen(true);
      } else {
        setShowBlackScreen(false);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (showBlackScreen) {
    return (
      <div className="w-full h-screen bg-black text-white flex items-center justify-center text-center p-4">
        <div>
          <h2 className="text-xl md:text-2xl">Please use a valid device</h2>
          <p className="mt-2 text-sm text-gray-400">
            This site is only accessible from proper devices.
          </p>
        </div>
      </div>
    );
  }

  return (
    <menu className="bg-[#1B2332] comfortaa text-white w-full max-h-screen h-[100vh] flex flex-col items-center justify-center relative overflow-hidden  gap-6">
      <h2 className="text-5xl text-center">
        <span>4</span>Pay <sup className="text-[10px]">&copy;</sup>
      </h2>

      {isRealMobile ? (
        <div className="flex flex-col gap-4 mb-10">
          <span className="text-2xl text-center">Mobile</span>
          <a href="tinkoffbank://Main/PayByMobileNumber?numberPhone=9123456789&amount=500&bankMemberId=100000000111">
            <button className="bg-white text-black px-6 py-2 rounded-xl">
              Option 1
            </button>
          </a>
          <button className="bg-white text-black px-6 py-2 rounded-xl">
            Option 2
          </button>
          <button className="bg-white text-black px-6 py-2 rounded-xl">
            Option 3
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <span className="text-xl">Web</span>
          <button className="bg-white text-black px-6 py-2 cursor-pointer rounded-xl">
            Continue
          </button>
        </div>
      )}
    </menu>
  );
};

export default App;

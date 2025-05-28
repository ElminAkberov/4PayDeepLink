import React from "react";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

const App = () => {
  const [showBlackScreen, setShowBlackScreen] = React.useState(false);
  const [isRealMobile, setIsRealMobile] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true); 

  React.useEffect(() => {
    const checkDevice = () => {
      const userAgentMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );

      const isTouchCapable = navigator.maxTouchPoints > 1;
      const isNotEmulator =
        !navigator.webdriver &&
        Math.abs(window.outerWidth - window.innerWidth) < 100;
      const isLikelyMobileDevice =
        typeof window.orientation !== "undefined" || window.innerWidth < 768;

      const mobile =
        userAgentMobile &&
        isTouchCapable &&
        isNotEmulator &&
        isLikelyMobileDevice;

      const screenWidth = window.innerWidth;
      setIsRealMobile(mobile);

      if (screenWidth < 1024 && !mobile) {
        setShowBlackScreen(true);
      } else {
        setShowBlackScreen(false);
      }

      setIsLoading(false);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  if (isLoading) {
    return null; 
  }

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
    <menu className="bg-[#F8F8F8] w-full min-h-screen h-[100vh] flex flex-col items-center justify-center relative overflow-hidden gap-6">
      {isRealMobile ? <Mobile /> : <Desktop />}
    </menu>
  );
};

export default App;

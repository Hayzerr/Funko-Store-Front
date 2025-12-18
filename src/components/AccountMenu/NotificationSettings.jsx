import React, { useState } from 'react';
import AccountMenu from './AccountMenu';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom'; // используем React Router для навигации
import MAccountMenu from './MAccountMenu';


const NotificationSettings = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Состояние для меню
  const [emailNotifications, setEmailNotifications] = useState({
    funkoMarketing: false,
    loungeflyMarketing: false,
    popYourself: false,
    funkoHQ: false,
  });

  const [smsNotifications, setSmsNotifications] = useState({
    funkoMarketing: false,
    loungeflyMarketing: false,
  });

  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(1);
    
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleEmailCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setEmailNotifications({
      ...emailNotifications,
      [id]: checked,
    });
  };

  const handleSmsCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setSmsNotifications({
      ...smsNotifications,
      [id]: checked,
    });
  };

  const saveSettings = () => {
    // Логика для сохранения настроек, можно отправить данные на сервер
    console.log("Settings saved", { emailNotifications, smsNotifications });
  };

  return (
    <div className="relative bg-primary-white mt-12 
                    lg:mt-12 h-fit mb-10 2xl:h-svh mx-auto 2xl:w-full 
                    xl:w-[1280px] lg:w-[968px] md:w-[780px] 
                    sm:w-[650px] w-[350px] transition-all">
      
      <h1 className="sm:text-6xl text-5xl font-black mb-4 
                     text-center 2xl:text-left break-words">
        NOTIFICATION SETTINGS
      </h1>

      {/* Гамбургер меню */}
      <button
        className="absolute xl:left-56 lg:left-44 md:left-36 sm:left-32 
                   md:top-32 sm:top-44 left-28 top-40 p-4 bg-black text-white 
                   rounded focus:outline-none cursor-pointer 2xl:hidden"
        onClick={toggleMenu}>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>

      <div className="flex justify-center mt-[50px]">
        <div className={`${menuOpen ? 'block' : 'hidden'} 2xl:block`}>
          <AccountMenu />
        </div>
        <div className="w-2/3 p-12 bg-white h-fit flex flex-col justify-center items-start">
          <h2 className="text-4xl font-black mb-6 mt-5 break-words w-full">NOTIFICATION SETTINGS</h2>
          <div className="flex flex-col 2xl:flex-row gap-10 mb-10">
            <div className="col1">
              <div className='row1 mb-4'>
                <p className='font-bold text-2xl'>EMAIL NOTIFICATIONS</p>
                <div className="flex items-center">
                  <input id='funkoMarketing' type="checkbox" 
                         className="w-5 h-5 mr-2 border-2 border-gray-400 rounded-md text-black pb-8"
                         checked={emailNotifications.funkoMarketing}
                         onChange={handleEmailCheckboxChange} />
                  <label htmlFor="funkoMarketing" className='cursor-pointer'>
                    <span className='text-lg font-bold mt-1'>FUNKO MARKETTING UPDATES</span>
                    <p className='break-words'>Stay up-to-date with new Funko product releases, exclusive drops, promotions, and more!</p>
                  </label>
                </div>
              </div>
              <div className='row1 mb-4'>
                <div className="flex items-center">
                  <input id='loungeflyMarketing' type="checkbox" 
                         className="w-5 h-5 mr-2 border-2 border-gray-400 rounded-md text-black pb-8"
                         checked={emailNotifications.loungeflyMarketing}
                         onChange={handleEmailCheckboxChange} />
                  <label htmlFor="loungeflyMarketing" className='cursor-pointer'>
                    <span className='text-lg font-bold mt-1'>LOUNGEFLY MARKETING UPDATES</span>
                    <p className='break-words'>Stay up-to-date with new Loungefly product releases, exclusive drops, promotions, and more!</p>
                  </label>
                </div>
              </div>
              <div className='row1 mb-4'>
                <div className="flex items-center">
                  <input id='popYourself' type="checkbox" 
                         className="w-5 h-5 mr-2 border-2 border-gray-400 rounded-md text-black pb-8"
                         checked={emailNotifications.popYourself}
                         onChange={handleEmailCheckboxChange} />
                  <label htmlFor="popYourself" className='cursor-pointer'>
                    <span className='text-lg font-bold mt-1'>POP! YOURSELF</span>
                    <p className='break-words'>Sign up for the latest news on upcoming drops, new customizing options, and more!</p>
                  </label>
                </div>
              </div>
              <div className='row1 mb-4'>
                <div className="flex items-center">
                  <input id='funkoHQ' type="checkbox" 
                         className="w-5 h-5 mr-2 border-2 border-gray-400 rounded-md text-black pb-8"
                         checked={emailNotifications.funkoHQ}
                         onChange={handleEmailCheckboxChange} />
                  <label htmlFor="funkoHQ" className='cursor-pointer'>
                    <span className='text-lg font-bold mt-1'>FUNKO HQ</span>
                    <p className='break-words'>Get notified about events and promotions happening at the Funko store in Everett, WA.</p>
                  </label>
                </div>
              </div>
            </div>

            <span className='w-0.5 h-auto bg-gray-300 hidden 2xl:inline'></span> {/* Линия между колонками */}

            <div className="col2">
              <div className='row1 mb-4'>
                <p className='font-bold text-2xl'>SMS NOTIFICATIONS</p>
                <div className="flex items-center">
                  <input id='funkoMarketingSms' type="checkbox" 
                         className="w-5 h-5 mr-2 border-2 border-gray-400 rounded-md text-black pb-8"
                         checked={smsNotifications.funkoMarketing}
                         onChange={handleSmsCheckboxChange} />
                  <label htmlFor="funkoMarketingSms" className='cursor-pointer'>
                    <span className='text-lg font-bold mt-1'>FUNKO MARKETTING UPDATES</span>
                    <p className='break-words'>Sign up for the latest Funko news sent straight to your phone so you don’t miss a thing.</p>
                  </label>
                </div>
              </div>
              <div className='row1 mb-4'>
                <div className="flex items-center">
                  <input id='loungeflyMarketingSms' type="checkbox" 
                         className="w-5 h-5 mr-2 border-2 border-gray-400 rounded-md text-black pb-8"
                         checked={smsNotifications.loungeflyMarketing}
                         onChange={handleSmsCheckboxChange} />
                  <label htmlFor="loungeflyMarketingSms" className='cursor-pointer'>
                    <span className='text-lg font-bold mt-1'>LOUNGEFLY MARKETING UPDATES</span>
                    <p className='break-words'>Stay up-to-date with new Loungefly product releases, exclusive drops, promotions, and more!</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='w-full'>
            <p>Please see our
              <a href="https://funko.com/privacy-policy/privacy-policy.html" className='text-black underline _blank' target='_blank' rel="noopener noreferrer">
                Privacy Policy
              </a>
              to learn how we use your information.
            </p>
            <div className='flex flex-col sm:flex-row gap-10 mt-4'>
              <Button text="CANCEL" onClick={() => navigate('/myaccount')} />
              <Button text="SAVE" onClick={saveSettings} />
            </div>
          </div>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="fixed top-0 left-0 w-[300px] h-full bg-white z-20 p-6 shadow-lg">
            {/* Мобильное меню */}
            <MAccountMenu />
            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded focus:outline-none"
              onClick={closeMenu}
            >
              Done
            </button>
          </div>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10" onClick={closeMenu}></div>
        </>
      )}

    </div>
  );
}

export default NotificationSettings;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import MAccountMenu from './MAccountMenu';


const EditProfile = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Хук для навигации

  const handleSave = () => {
    // Логика сохранения профиля
    console.log("Profile saved");

    navigate('/authorization')
  };

  const handleCancel = () => {
    // Логика отмены
    console.log("Edit cancelled");
    navigate('/authorization')
  };

  const handleChangePassword = () => {
    // Навигация на страницу смены пароля
    navigate('/change-password');
  };

    const [menuOpen, setMenuOpen] = useState(false); // Состояние для меню

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log(1);
    
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };


  return (
    <div className="relative bg-primary-white mt-12 mx-auto 2xl:w-full xl:w-[1280px] 
                    lg:w-[968px] macbook:w-[900px] md:w-[768px] sm:w-[640px] mobile:w-[340px] transition-all">
      <h1 className="text-6xl ml-4 font-black mb-4 sm:text-5xl lg:text-6xl text-center 2xl:text-left">EDIT PROFILE</h1>
      <button
        className="absolute xl:left-56 lg:left-44 lg:top-32
                   sm:top-28 left-4 top-48 p-4 bg-black text-white 
                   rounded focus:outline-none cursor-pointer 2xl:hidden"
        onClick={toggleMenu}>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white mb-1"></span>
        <span className="block w-6 h-0.5 bg-white"></span>
      </button>
      <div className="flex justify-center mt-[50px]">
        <div className="hidden 2xl:block">
          <AccountMenu />
        </div>
        <div className="w-full lg:w-2/3 p-12 bg-white flex flex-col justify-center items-center mb-10">
          <div className="grid grid-cols-1 gap-6 w-full mt-10">
            <div>
              <label className="block font-bold mb-2">First Name<span className='text-red-600'>*</span></label>
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Last Name<span className='text-red-600'>*</span></label>
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Phone Number</label>
              <input
                type="text"
                className="border rounded p-2 w-full"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Email<span className='text-red-600'>*</span></label>
              <input
                type="email"
                className="border rounded p-2 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-bold mb-2">Current Password<span className='text-red-600'>*</span></label>
              <input
                type="password"
                className="border rounded p-2 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a
                onClick={handleChangePassword} // Перенаправление на ChangePassword
                className="text-blue-500 underline cursor-pointer"
              >
                Change password
              </a>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleCancel}>Cancel</button>
              <button className="bg-black text-white px-4 py-2 rounded" onClick={handleSave}>Save</button>
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
};

export default EditProfile;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const navigate = useNavigate(); // Хук для навигации

  const handleSave = () => {
    if (newPassword === confirmNewPassword) {
      console.log("Password changed successfully");
      // Логика для обновления пароля на сервере

      // Перенаправление обратно на страницу редактирования профиля
      navigate('/edit-profile'); //условно едит профиль
    } else {

      console.log("New password and confirmation do not match");
    }
  };

  const handleCancel = () => {
    // Перенаправление обратно на страницу редактирования профиля
    navigate('/edit-profile');
  };

  return (
    <div className="relative bg-primary-white mt-12 mx-auto 2xl:w-full 
                    xl:w-[1280px] lg:w-[968px] macbook:w-[900px] md:w-[768px] 
                    sm:w-[640px] mobile:w-[340px] transition-all">
      <h1 className="text-6xl ml-4 font-black mb-4 sm:text-5xl 
                     lg:text-6xl text-center 2xl:text-left">
        CHANGE PASSWORD
      </h1>
      
      <div className="flex justify-center mt-[50px]">
        <div className="w-full lg:w-2/3 p-12 bg-white h-fit flex flex-col justify-center items-center">
          <div className="grid grid-cols-1 gap-6 w-full">
            {/* Current Password */}
            <div>
              <label className="block font-bold mb-2">Current Password<span className='text-red-600'>*</span></label>
              <input
                type="password"
                className="border rounded p-2 w-full"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block font-bold mb-2">New Password<span className='text-red-600'>*</span></label>
              <input
                type="password"
                className="border rounded p-2 w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block font-bold mb-2">Confirm New Password<span className='text-red-600'>*</span></label>
              <input
                type="password"
                className="border rounded p-2 w-full"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={handleCancel} // Перенаправление на EditProfile при отмене
              >
                Cancel
              </button>
              <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={handleSave} // Перенаправление на EditProfile при успешном сохранении
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

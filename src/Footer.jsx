import React from 'react';

const Footer = () => {
  return (
    <div className="bg-black text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between gap-x-5 items-center px-20">
        	 {/* Account Section */}
		    <div className="flex flex-col space-y-1">
			<h1 className='text-m font-bold'> Accounts </h1>
			<h3 className="text-xs">Adina</h3>
			<h3 className="text-xs">Aknur</h3>
			<h3 className="text-xs">Bolashak</h3>
			<h3 className="text-xs">Aron</h3>
			<h3 className="text-xs">Iliyas</h3>
		</div>
		
		{/* About Section */}
		<div className="mt-6 md:mt-0 text-center md:text-left">
          	<p className="text-sm">This website is defended by God!</p>
        	</div>

        {/* Contact Us Section */}
        <div className="mt-6 md:mt-0 text-center">
		<h1  className='text-m font-bold'> Contact us</h1>
          <i className="fab fa-instagram text-2xl mt-2"></i> {/* Instagram Icon */}
        </div>
      </div>
    </div>
  );
};

export default Footer;

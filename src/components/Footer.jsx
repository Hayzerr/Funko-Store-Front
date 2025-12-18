import React from 'react';

const Footer = () => {
	return (
		<footer class="bg-black text-gray-300 py-10 px-10">
			<div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

			{/*!-- Company Information -->*/}
			<div>
			<h2 class="text-white text-xl font-semibold mb-4">Amazing 5</h2>
			<p class="text-sm">Our website guarded by God </p>
			<p class="text-sm">Adina, Aknur, Aron, Bolashak, Iliyas </p>
			</div>

			{/*<!-- Quick Links -->*/}
			<div>
			<h2 class="text-white text-xl font-semibold mb-4">Quick Links</h2>
			<ul class="space-y-2">
				<li><a href="#" class="hover:text-white">Main</a></li>
				<li><a href="#" class="hover:text-white">Product</a></li>
				<li><a href="#" class="hover:text-white">Services</a></li>
				<li><a href="#" class="hover:text-white">Contact</a></li>
			</ul>
			</div>

			{/*<!-- Subscription Section -->*/}
			<div>
			<h2 class="text-white text-xl font-semibold mb-4">Subscribe</h2>
			<p class="text-sm mb-4">Stay updated with our latest news and offers. Subscribe now!</p>
			<form class="flex">
				<button class="bg-white px-4 py-2 rounded-md text-black font-medium">Subscribe</button>
			</form>
			</div>

			{/*<!-- Contact & Social Media -->*/}
			<div>
			<h2 class="text-white text-xl font-semibold mb-4">Contact Us</h2>
			<p class="text-sm mb-4">Email: <a href="mailto:230107188@sdu.edu.com" class="text-blue-400 hover:underline">230107188@sdu.edu.com</a></p>
			<div class="flex space-x-4">
				<a href="#" class="hover:text-white">
				<img src="https://img.icons8.com/ios-filled/24/youtube-play.png" alt="YouTube" class="w-6 h-6"></img>
				</a>
				<a href="#" class="hover:text-white">
				<img src="https://img.icons8.com/ios-filled/24/facebook-new.png" alt="Facebook" class="w-6 h-6"></img>
				</a>
			</div>
			</div>

			</div>

			<div class="mt-8 border-t border-gray-700 pt-4 text-center">
			<p class="text-sm">&copy; 2024. All rights reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;

import React, { useState } from 'react';

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event) => {
    setSearchQuery(event.target.value); 
  };

  return (
	<div className='relative'>
		<input 
			type="text" 
			placeholder="Search" 
			value={searchQuery} 
			onChange={handleChange} 
			className="rounded-full p-2 pl-10 text-black" 
		/>
		<i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-black"></i> 
	</div>

  );
};

export default SearchInput;

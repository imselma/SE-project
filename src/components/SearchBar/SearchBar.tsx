import React from 'react'
import { useState } from 'react'
import './SearchBar.css'
const SearchBar = ({ onSearch }) => {

    const [input, setInput] = useState('');


    return (
        <>
            <div className='input-wrapper'>
                <img className='SearchIcon' src='src/assets/img/search.svg' alt="Search Icon" />
                <input placeholder='Type to search...' value={input} onChange={(e) => {onSearch(e.target.value); setInput(e.target.value)}}/>
            </div>
        </>
    )
}
export default SearchBar;
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import './SearchBar.css'
const SearchBar = ({ onSearch }) => {

    const [input, setInput] = useState('');


    return (
        <>
            <div className='input-wrapper'>
                <input placeholder='Type to search...' value={input} onChange={(e) => {onSearch(e.target.value); setInput(e.target.value)}}/>
            </div>
        </>
    )
}
export default SearchBar;
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import AdviceCard from '../AdviceCard'
import SearchBar from '../SearchBar'
import CreateAdviceModal from '../CreateAdviceModal'
import useAdvices from '../../customHooks/useAdvices'
import { Advice } from '../../utils/types'



const AdviceList = () => {

    const [openModal, setOpenModal] = useState(false);
    const userToken = localStorage.getItem('userToken')
    const { data: advices } = useAdvices()
    const [searchResult, setSearchResult] = useState<Advice[]>([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setSearchResult(advices);
    }, [advices]);

    const handleChange = (value: string) => {
        const filteredAdvices = advices.filter(advice => advice.name.toLowerCase().includes(value.toLowerCase()))
        console.log(filteredAdvices);
        setSearchResult(filteredAdvices)
    }
    
    return (
        <>
            <div className='search-and-button' style={{ display: 'flex' }}>
                <SearchBar onSearch={handleChange} />
                {userToken && (
                    <button
                        type="button"
                        className="btn"
                        style={{
                            backgroundColor: isHovered ? '#7B556A' : '#976B7A',
                            color: 'white',
                            width: '180px',
                            height: '50px',
                            fontSize: '20px',
                            marginTop: '15px',
                            marginLeft: 'auto',
                            marginRight: '60px'
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setOpenModal(true)}
                    >
                        Create Advice +
                    </button>
                )}
            </div>
            <div className='row' style={{ marginTop: '30px', marginLeft: '15px', alignItems: 'center' }}>
                {searchResult && searchResult.map((advice, i) => (
                    <AdviceCard advice={advice} key={i} />
                ))}
            </div>
            {openModal && <CreateAdviceModal closeModal={setOpenModal} />}
        </>
    )
}

export default AdviceList;
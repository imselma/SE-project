import React from "react";
import AdviceList from "../components/AdviceList/AdviceList";

const AdvicePage = () => {

    return (
        <div className='header' style={{ flexDirection: 'row'}}>
            <h3 style={{ marginLeft: '40px', marginTop: '20px' }}>Discover helpful cooking advices...</h3>
            <AdviceList />
        </div>
    )
}
export default AdvicePage
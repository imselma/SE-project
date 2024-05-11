import React from "react";
import AdviceList from "../components/AdviceList";

const AdvicePage = () => {

    return (
        <div className='header' style={{ flexDirection: 'row'}}>
            <h3 style={{ marginLeft: '40px', marginTop: '20px' }}>Read advices...</h3>
            <AdviceList />
        </div>
    )


}
export default AdvicePage;
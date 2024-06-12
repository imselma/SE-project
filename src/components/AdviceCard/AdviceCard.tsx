/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigate } from "react-router-dom";
import { Advice } from "../../utils/types"
import { useState } from "react";

type Props = {
    advice: Advice
}

const AdviceCard = ({ advice }: Props) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);

    const navigateToAdvicePage = () => {
        navigate(`/singleadvice/${advice.id}`);
        console.log("Setting advice ID:", advice.id);
        localStorage.setItem('adviceID', advice.id);
    }

    return (
        <div className="col-12 col-md-3 m-3">
           <div className="card">
               <div className="card-body">
                   <h5 className="card-title">{advice.name}</h5>
                   {advice.user && (
                        <h6 className="card-subtitle">
                            Creator: {advice.user.name + ' ' + advice.user.surname}
                        </h6>
                    )}
                   <a className="btn" style={{
                            backgroundColor: isHovered ? '#7B556A' : '#976B7A', 
                            color: 'white', 
                            marginTop: '20px',
                        }} 
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={navigateToAdvicePage}>View</a>
               </div>
            </div>
        </div>
    )
};

export default AdviceCard;

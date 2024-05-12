import {Advice, Recipe} from "../../utils/types.ts";

type Props = {
    advice: Advice
}
const AdviceCard = ({advice}: Props) => {

    return (
        <div className="col-12 col-md-3 m-3">
            <div className="card"  style={{minHeight:"250px"}}>
                <div className="card-body">
                    <h5 style={{textAlign:"justify", marginBottom:"20px"}} className="card-title">{advice.name}</h5>
                    <p style={{textAlign:"justify"}} className="card-text">{advice.description}</p>
                </div>
            </div>
        </div>
    );
};

export default AdviceCard;

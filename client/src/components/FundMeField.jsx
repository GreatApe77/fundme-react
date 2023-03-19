import GenericButton from "./GenericButton"

function FundMeField(props){




    return (
        <div className="FundMeField">
            <input placeholder="amount (ETH)" type="number" className="FundMeInput" id={props.id} />
            <GenericButton  content="Fund me here!" />
        </div>
    )
}

export default FundMeField
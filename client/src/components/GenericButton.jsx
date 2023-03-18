

function GenericButton(props){

    return(
        <button className="GenericButton" onClick={props.execute}>
            {props.content}
        </button>
    )




}


export default GenericButton
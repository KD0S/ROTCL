export const PetSlot = (props) => {

    return (
        <div className='flex justify-center'>
            {props.orientation === "r" ?
                <div className='flex'>
                    <div className='m-3 rounded-full h-32 w-32 bg-orange-400'></div>
                    <p className='h-6 w-20 rounded text-center bg-red-600'>{`${props.details.hp}/${props.details.hp}`}</p>
                </div> :
                <div className='flex'>
                    <p className='h-6 w-20 rounded text-center bg-red-600'>{`${props.details.hp}/${props.details.hp}`}</p>
                    <div className='m-3 rounded-full h-32 w-32 bg-orange-400'></div>
                </div>}
        </div>
    )
}

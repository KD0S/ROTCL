export const PetSlot = (props) => {

    return (
        <div className='flex justify-center'>
            {props.orientation === "r" ?
                <div>
                    {props.curr ?
                        <div className="flex">
                            <div className='m-3 rounded-full h-32 w-32 bg-orange-300 text-center'>{`${props.details.name} | ${props.details.owner}`}</div>
                            <p className='h-6 w-20 rounded text-center bg-red-600'>{`${props.details.currHp}/${props.details.hp}`}</p>
                        </div>
                        :
                        <div className="flex">
                            <div className='m-3 rounded-full h-32 w-32 bg-orange-400 text-center'>{`${props.details.name} | ${props.details.owner}`}</div>
                            <p className='h-6 w-20 rounded text-center bg-red-600'>{`${props.details.currHp}/${props.details.hp}`}</p>
                        </div>
                    }
                </div> :
                <div>
                    {props.curr ?
                        <div className="flex">
                            <p className='h-6 w-20 rounded text-center bg-red-600'>{`${props.details.currHp}/${props.details.hp}`}</p>
                            <div className='m-3 rounded-full h-32 w-32 bg-orange-300 text-center'>{`${props.details.name} | ${props.details.owner}`}</div>
                        </div>
                        :
                        <div className="flex">
                            <p className='h-6 w-20 rounded text-center bg-red-600'>{`${props.details.currHp}/${props.details.hp}`}</p>
                            <div className='m-3 rounded-full h-32 w-32 bg-orange-400 text-center'>{`${props.details.name} | ${props.details.owner}`}</div>
                        </div>}
                </div>
            }
        </div>
    )
}

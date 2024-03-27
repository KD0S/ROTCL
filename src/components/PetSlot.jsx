export const PetSlot = (props) => {

    return (
        <div className='flex justify-center'>
            {props.orientation === "r" ?
                <div>
                    {props.curr ?
                        <div className="flex">
                            <div className='m-3 rounded-full h-32 w-32 bg-orange-300 text-center'>{`${props.details.name} | ${props.details.owner}`}</div>
                            <div className="p-1 w-40 h-8 bg-slate-700 rounded-2xl">
                                <div className="w-40 h-6 p-0.5  bg-red-700 rounded-2xl text-center text-sm transition-all" style={props.details.currHp ? { width: `${(props.details.currHp / props.details.hp) * 100}%` } : { width: '0%' }}>
                                    {`${props.details.currHp}/${props.details.hp}`}
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex">
                            <div className='m-3 rounded-full h-32 w-32 bg-orange-400 text-center'>{`${props.details.name} | ${props.details.owner}`}</div>
                            <div className="p-1 w-40 h-8 bg-slate-700 rounded-2xl">
                                <div className="w-40 h-6 p-0.5  bg-red-700 rounded-2xl text-center text-sm transition-all" style={props.details.currHp ? { width: `${(props.details.currHp / props.details.hp) * 100}%` } : { width: '0%' }}>
                                    {`${props.details.currHp}/${props.details.hp}`}
                                </div>
                            </div>
                        </div>
                    }
                </div> :
                <div>
                    {props.curr ?
                        <div className="flex">
                            <div className="w-40 h-8 p-1 bg-slate-700 rounded-2xl">
                                <div className="w-40 h-6 p-0.5  bg-red-700 rounded-2xl text-center text-sm transition-all" style={props.details.currHp ? { width: `${(props.details.currHp / props.details.hp) * 100}%` } : { width: '0%' }}>
                                    {`${props.details.currHp}/${props.details.hp}`}
                                </div>
                            </div>
                            <div className='m-3 rounded-full h-32 w-32 bg-orange-300 text-center'>{`${props.details.name} | ${props.details.owner}`}</div>
                        </div>
                        :
                        <div className="flex">
                            <div className="w-40 h-8 p-1 bg-slate-700 rounded-2xl">
                                <div className="w-40 h-6 p-0.5 bg-red-700 rounded-2xl text-center text-sm transition-all" style={props.details.currHp ?
                                    { width: `${(props.details.currHp / props.details.hp) * 100}%` } : { width: '0%' }}>
                                    {`${props.details.currHp}/${props.details.hp}`}
                                </div>
                            </div>
                            <div className='m-3 rounded-full h-32 w-32 bg-orange-400 text-center'>{`${props.details.name} | ${props.details.owner}`}</div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export const PetSlot = (props) => {

    return (
        <div className='flex justify-center'>
            {props.orientation === "r" ?
                <div>
                    {props.curr ?
                        <div className="flex">
                            <img src={props.details.imgPath} alt={props.details.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-300 text-center' />
                            <div className="p-1 w-40 h-8 bg-slate-700 rounded-2xl">
                                <div className="w-40 h-6 p-0.5  bg-red-700 rounded-2xl text-center text-sm transition-all" style={props.details.currHp ? { width: `${(props.details.currHp / props.details.hp) * 100}%` } : { width: '0%' }}>
                                    {`${props.details.currHp.toFixed(2)}/${props.details.hp}`}
                                </div>
                            </div>
                        </div>
                        :
                        <div className="flex">
                            <img src={props.details.imgPath} alt={props.details.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-600 text-center' />
                            <div className="p-1 w-40 h-8 bg-slate-700 rounded-2xl">
                                <div className="w-40 h-6 p-0.5  bg-red-700 rounded-2xl text-center text-sm transition-all" style={props.details.currHp ? { width: `${(props.details.currHp / props.details.hp) * 100}%` } : { width: '0%' }}>
                                    {`${props.details.currHp.toFixed(2)}/${props.details.hp}`}
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
                                    {`${props.details.currHp.toFixed(2)}/${props.details.hp}`}
                                </div>
                            </div>
                            <img src={props.details.imgPath} alt={props.details.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-300 text-center' />
                        </div>
                        :
                        <div className="flex">
                            <div className="w-40 h-8 p-1 bg-slate-700 rounded-2xl">
                                <div className="w-40 h-6 p-0.5 bg-red-700 rounded-2xl text-center text-sm transition-all" style={props.details.currHp ?
                                    { width: `${(props.details.currHp / props.details.hp) * 100}%` } : { width: '0%' }}>
                                    {`${props.details.currHp.toFixed(2)}/${props.details.hp}`}
                                </div>
                            </div>
                            <img src={props.details.imgPath} alt={props.details.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-600 text-center' />
                        </div>
                    }
                </div>
            }
        </div>
    )
}

import Droppable from "./Droppable"

export const PetSlot = (props) => {
    return (
        <div className='flex justify-center'>
            {props.orientation === "r" ?
                <div>
                    <div className="flex">
                        <Droppable owner={props.owner} curr={props.curr} src={props.details.imgPath} alt={props.details.name} id={props.details.id} />
                        <div className="p-1 w-40 h-8 bg-slate-700 rounded-2xl">
                            <div className="w-40 h-6 p-0.5  bg-red-700 rounded-2xl text-center text-sm transition-all" style={props.details.currHp ? { width: `${(props.details.currHp / props.details.hp) * 100}%` } : { width: '0%' }}>
                                {`${props.details.currHp}/${props.details.hp}`}
                            </div>
                        </div>
                    </div>
                </div> :
                <div>
                    <div className="flex">
                        <div className="w-40 h-8 p-1 bg-slate-700 rounded-2xl">
                            <div className="w-40 h-6 p-0.5  bg-red-700 rounded-2xl text-center text-sm transition-all" style={props.details.currHp ? { width: `${(props.details.currHp / props.details.hp) * 100}%` } : { width: '0%' }}>
                                {`${props.details.currHp}/${props.details.hp}`}
                            </div>
                        </div>
                        <Droppable owner={props.details.owner} curr={props.curr} src={props.details.imgPath} alt={props.details.name} id={props.details.id} />
                    </div>
                </div>
            }
        </div>
    )
}

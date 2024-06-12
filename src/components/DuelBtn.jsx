export const DuelBtn = (props) => {

    props.socket.on("duelJoin", () => {
        props.battle(true);
    })

    return (
        <button onClick={() => {
            props.socket.emit("duel", { player: props.uid, opponent: props.oppUid }, props.battle)
        }}
            className='bg-yellow-600 text-white text-center font-bold rounded-lg p-2'
        >{props.oppUid}</button>
    )
}

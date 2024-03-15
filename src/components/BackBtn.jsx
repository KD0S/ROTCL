export const BackBtn = (props) => {
    return (
        <button onClick={() => {
            props.socket.emit("exitMatch")
            props.battle(false)
        }}
        className='text-5xl text-white font-bold py-4 px-8 rounded-lg mt-6'
        >🔙</button>
    )
}

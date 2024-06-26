import '../styles/index.css';
import { PetSlot } from '../components/PetSlot';
import { AttackScreen } from '../components/AttackScreen';
import { useEffect, useState } from 'react';
import { BackBtn } from '../components/BackBtn';
import { DndContext } from '@dnd-kit/core';
import Spinner from '../components/Spinner'

const BattleScreen = (props) => {

  const [wait, setWait] = useState(true);
  const [disableAbility, setDisableAbility] = useState(false);
  const [turn, setTurn] = useState(null)
  const [endgame, setEndGame] = useState(false)
  const [winner, setWinner] = useState(false)
  const [clientId, setClientId] = useState(null)

  const [all_monsters, setAllMonsters] = useState(null)

  useEffect(() => {

  }, [turn])

  props.socket.on("setState", (monsters) => {
    setAllMonsters(monsters[0].concat(monsters[1]))
    setTurn(monsters[2])
    setClientId(monsters[0][0].owner)
    setDisableAbility(false);
    setWait(false)
    console.log("tadadad")

    // console.log("Triggered setState")
    // console.log(monsters[0].concat(monsters[1]))

    /*const p1_m = monsters[0].filter(m => m.status === 'alive')
    const p2_m = monsters[1].filter(m => m.status === 'alive')
    if (p1_m.length === 0 || p2_m.length === 0) {
      console.log(p1_m)
      console.log(p2_m)
      setEndGame(true)
      p1_m.length > p2_m.length ? setWinner(true) : setWinner(false)
    }*/
  });

  props.socket.on("hasWon", (hasWon) => {
    setEndGame(true)
    setWinner(hasWon)
  })

  const handleDragEnd = (e) => {
    if (!disableAbility) {
      const { active, over } = e;
      if (over) {
        setDisableAbility(true);
        console.log(active.data.current.id, over.data.current);
        props.socket.emit("Ability", [active.data.current.id, over.data.current.id]);
      };
    }
  }

  if (!all_monsters) return (<div className='h-screen	w-full flex flex-col justify-center items-center'>
    <h1 className='text-white my-3 text-2xl font-bold'>Loading</h1>
    <Spinner h={10} w={10} b={8} color={'fill-yellow-400'} />
</div>)

  else return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="bg-slate-900 h-screen w-screen flex-col">
        {endgame ? <div><div className='absolute z-2 backdrop-blur h-screen w-screen'></div>
          <div className='flex flex-col absolute z-3 h-1/2 w-1/2 left-1/4 top-40 bg-slate-600 rounded-xl'>
            <p className='text-5xl font-bold text-center p-6'>{winner ? "You Win !" : "You Lose !"}</p>
            <BackBtn battle={props.battle} socket={props.socket} ></BackBtn>
          </div></div> : null}
        <div className='flex h-4/5'>
          <div className='flex-col p-12 w-1/2 h-full'>
            {all_monsters.filter(monster => monster.owner === clientId && monster.status === "alive").map((p1_monster) =>
              <PetSlot orientation="r" details={p1_monster} curr={turn === p1_monster.id ? true : false} key={p1_monster.name}></PetSlot>)}
          </div>
          <div className='flex-col p-12 w-1/2 h-full'>
            {all_monsters.filter(monster => monster.owner !== clientId && monster.status === "alive").map((p2_monster) =>
              <PetSlot orientation="l" details={p2_monster} curr={turn === p2_monster.id ? true : false} key={p2_monster.name}></PetSlot>)}
          </div>
        </div>
        {<AttackScreen socket={props.socket} client={clientId} all_monsters={all_monsters}
          setAllMonsters={setAllMonsters} turn={turn} setTurn={setTurn}>
        </AttackScreen>}
      </div >
    </DndContext>
  );
}

export default BattleScreen;

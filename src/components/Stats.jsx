import { faCrown, faHeartBroken } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Stats = ({ playerStats }) => {

    return (
        <section>
            <section className='w-full mt-10'>
                <div className='relative rounded-full h-14 bg-slate-700 w-full p-2'>
                    <div className='rounded-full h-10 bg-yellow-600 flex justify-center'
                        style={{ width: `${(((playerStats.exp < 0 ? 0 : playerStats.exp > 100 ? 100 : playerStats.exp) / 100) * 100)}%` }}>
                        <span className='absolute inset-0 flex items-center justify-center font-bold text-white'>
                            {`EXP : ${(playerStats.exp < 0 ? 0 : playerStats.exp)}`}
                        </span>
                    </div>
                </div>
            </section>
            <section className='w-full mt-5'>
                <h1 className='text-yellow-600 text-2xl font-bold'>Battle Stats</h1>
                <div className='flex gap-4 mt-4'>
                    <div className='w-40 bg-slate-800 rounded-xl text-yellow-600 text-center font-bold p-5'>
                        <FontAwesomeIcon className="text-yellow-400 text-lg mr-3" icon={faCrown}></FontAwesomeIcon>
                        {`Wins : ${playerStats.wins}`}
                    </div>
                    <div className='w-40 bg-slate-800 rounded-xl text-yellow-600 text-center font-bold p-5'>
                        <FontAwesomeIcon className="text-red-600 text-xl mr-3" icon={faHeartBroken}></FontAwesomeIcon>
                        {`Losses : ${playerStats.losses}`}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default Stats;
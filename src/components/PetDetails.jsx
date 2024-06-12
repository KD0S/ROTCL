import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "../api/axios"
import { useEffect, useState } from "react"
import { config } from "../config"

const h1Color = {
    'Common': 'text-white',
    'Uncommon': 'text-green-500',
    'Rare': 'text-blue-700',
    'Epic': 'text-fuchsia-800',
}

const slots = {
    'Common': 2,
    'Uncommon': 2,
    'Rare': 3,
    'Epic': 4,
    'Legendary': 4
}

const PetDetails = ({ setRefresh, display, handleModal, petDetails, abilityDetails }) => {

    const [disableButton, setDisableButton] = useState(false);

    const handleAddAbility = async () => {
        setDisableButton(true);
        const response = await axios.post(`${config.SERVER_URL}/ability/pet/assignAbility/${petDetails.monster_index.rarity}/${petDetails.mid}`, { 'curr_abilities': abilities, slots: slots[petDetails.monster_index.rarity] });
        let abilites_temp = abilities;
        abilites_temp.every((ability, idx) => {
            if (!ability) {
                abilites_temp[idx] = response.data.name;
                return false;
            }
            return true;
        })
        setAbilities(abilites_temp);
        setRefresh();
        setDisableButton(false);
    }

    const [abilities, setAbilities] = useState([]);

    useEffect(() => {
        const abilities_temp = new Array(slots[petDetails.monster_index.rarity]).fill(null);
        if (abilityDetails) Object.keys(abilityDetails).map((ability, idx) => abilities_temp[idx] = ability);
        setAbilities(abilities_temp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={`fixed z-1 left-0 top-0 w-screen h-screen overflow-auto backdrop-blur-md ${display}`}>
            <div className="bg-slate-800 mt-20 mx-auto p-2 w-1/3 rounded-md">
                <span className="hover:cursor-pointer" onClick={handleModal}><FontAwesomeIcon icon={faXmark} className="text-2xl text-white bg-red-600 p-1 rounded-md"></FontAwesomeIcon></span>
                <h1 className={`text-center text-3xl font-bold ${h1Color[petDetails?.monster_index.rarity]}`}>{petDetails?.alt_name}</h1>
                <div className="flex p-10 justify-center gap-20">
                    <div>
                        <img src={petDetails?.monster_index.img_path} alt={petDetails?.name} className='m-3 rounded-full flex h-36 w-36 bg-yellow-300 text-center' />
                    </div>
                    <div>
                        <p className="text-md text-white">{`Name: ${petDetails?.name}`}</p>
                        <p className="text-md text-white">{`Rarity: ${petDetails?.monster_index.rarity}`}</p>
                        <p className="text-md text-white">{`HP: ${petDetails?.modif_hp * petDetails?.monster_index.base_hp}`}</p>
                        <p className="text-md text-white">{`ATK: ${petDetails?.modif_atk * petDetails?.monster_index.base_atk}`}</p>
                        <p className="text-md text-white">{`DEF: ${petDetails?.modif_def * petDetails?.monster_index.base_def}`}</p>
                        <p className="text-md text-white">{`SPD: ${petDetails?.modif_spd * petDetails?.monster_index.base_spd}`}</p>
                        <p className="text-md text-white">{`Stamina: ${petDetails?.monster_index.base_stamina}`}</p>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-center text-white">Abilities</h2>
                <div className="flex justify-center gap-5 m-4">
                    {abilities.map(ability => {
                        if (!ability) return <button onClick={handleAddAbility} disabled={disableButton} className="flex-1 rounded-lg bg-gray-500 p-1 text-white font-bold"><FontAwesomeIcon icon={faPlus} /></button>
                        else return <button className="flex-1 rounded-lg bg-yellow-600 p-1 text-white font-bold">{ability}</button>
                    })}

                </div>
            </div>
        </div>
    )
}

export default PetDetails
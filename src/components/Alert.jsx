import Spinner from "./Spinner"

const Alert = ({ message, type }) => {

    const color = {
        'error': "bg-red-600",
        'success': "bg-green-600",
        'wait': "bg-orange-600"
    }

    return (
        <p className={`h-30 text-center ${color[type]} p-3 rounded-xl mt-5 mx-5 text-white font-bold flex gap-5 justify-center`}>
            {type === 'wait' ?
                <Spinner h={8} w={8} b={4} color={'text-white-700'} /> : null}
            <p className="text-xl">{message}</p>
        </p>
    )
}

export default Alert
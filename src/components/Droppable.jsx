import { useDroppable } from '@dnd-kit/core';

function Droppable(props) {
    const { isOver, setNodeRef } = useDroppable({
        id: props.id,
        data: {
            id: props.id,
            owner: props.owner
        }
    });

    const color = isOver ? 'bg-yellow-800' : '';

    const curr = props.curr ? 'bg-yellow-300' : 'bg-yellow-600';

    return (
        <img src={props.src} alt={props.alt} ref={setNodeRef} className={`m-3 rounded-full flex h-36 w-36 ${curr} ${color} text-center`}>
        </img>
    );
}

export default Droppable
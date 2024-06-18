import { useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

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
        <motion.img 
        initial={{
            y:0,
            scale: 1
        }}
        animate={{
            y:[0,-7,0,7,0],
            scale: [1, 0.9, 0.85, 0.9, 1]
        }}
        exit={{
            y:0,
            scale:1
        }}
        transition={{
            duration: 2,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "linear",
            repeat: Infinity
        }}
        src={props.src} alt={props.alt} ref={setNodeRef} className={`m-3 rounded-full flex h-36 w-36 ${curr} ${color} text-center`}>
        </motion.img>
    );
}

export default Droppable
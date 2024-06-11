import React from 'react';
import { useDraggable } from '@dnd-kit/core';

function Draggable(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
        data: {
            target: props.value,
            id: props.id
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;


    return (
        <div ref={setNodeRef}>
            <button className='text-lg bg-slate-400 p-4 rounded-md' ref={setNodeRef} style={style} {...listeners} {...attributes}>
                {props.children}
            </button>
        </div>
    );
}

export default Draggable;
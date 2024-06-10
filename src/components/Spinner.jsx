const Spinner = ({ h, w, b, color }) => {
    return (
        <svg class={`h-${h} w-${w} animate-spin rounded-full border-${b} border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] ${color}`} viewBox="0 0 24 24" />
    )
}

export default Spinner
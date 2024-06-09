const Spinner = ({ h = 5, w = 5, b = 4, color }) => {
    return (
        <svg class={`my-auto h-${h} w-${w} animate-spin rounded-full border-${b} border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] ${color}`} viewBox="0 0 24 24" />
    )
}

export default Spinner
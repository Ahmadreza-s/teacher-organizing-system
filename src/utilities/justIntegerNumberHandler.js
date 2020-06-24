export default e => {
    if (e.key === '.' || e.key === '+' || e.key === '-' || e.key === ',')
        e.preventDefault();
}

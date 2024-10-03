function Search({ filter, handleFilter }) {
    return (
        <>
            filter shown with<input value={filter} onChange={handleFilter} />
        </>
    )
}

export default Search

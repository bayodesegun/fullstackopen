const NameFilter = ({nameFilter, setNameFilter}) => (
  <div>
    filter shown with: <input value={nameFilter} onChange={(ev) => setNameFilter(ev.target.value)} />
  </div>
)

export default NameFilter

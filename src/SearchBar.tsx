interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  canedit: boolean;
  setCanedit: (value: boolean) => void;
}

export default function SearchBar({ search, setSearch, canedit, setCanedit}: SearchBarProps) {

    return (
        <div>
            <input 
            value={search} 
            disabled={!canedit} 
            onChange={e => setSearch(e.target.value) } 
            />
            <label> {canedit ? "Edit mode" : "No edit mode"} </label>
            <input 
            type="checkbox"  
            onChange={e => setCanedit(e.target.checked)}
            /> 
        </div>
    );
}






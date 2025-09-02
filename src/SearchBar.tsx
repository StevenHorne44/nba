import './App.css'

interface SearchBarProps {
    search: string;
    setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch }: SearchBarProps) {

    return (
        <div>
            <input
            className='search-bar'
                value={search}
                placeholder="Search for team..."
                onChange={e => setSearch(e.target.value)}
            />

        </div>
    );
}






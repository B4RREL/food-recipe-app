import { useState } from "react";
import { useGlobalContext } from "../context";

const Search = () => {
    const [text,setText] = useState('');
    const { setSearchTerm,fetchRandomMeal } = useGlobalContext();
    const handleChange = (e) => {
        setText(e.target.value)
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if(text){
            setSearchTerm(text);
        }
    };
    const handleRandomMeal = () => {
        setSearchTerm('')
        setText('')
        fetchRandomMeal()
    }
    return (
        <header onSubmit={(event) => handleSubmit(event)} className="search-container">
            <form>
                <input placeholder="Your favourite meal" value={text} type="text" onChange={(event) => handleChange(event)} className="form-input" />
                <button type="submit" className="btn">search</button>
                <button type="button" className="btn btn-hipster" onClick={handleRandomMeal}>surprise me!</button>
            </form>
        </header>
    )
}

export default Search
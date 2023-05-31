import axios from "axios";
import React, {useState, useContext, useEffect} from "react";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

const randomMealsUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getDataFromLocalstorage = () => {
    let favourite = localStorage.getItem("favourites");
    if(favourite.length > 0) {
         favourite = JSON.parse(localStorage.getItem("favourites"));

    } else {
        favourite = [];
    }
    return favourite;
}

const AppProvider = ({children}) => {

    const [meals, setMeals] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal,setShowModal] = useState(false);
    const [selectedMeal,setSelectedMeal] = useState(null);
    const [favourites,setFavourites] = useState(getDataFromLocalstorage());
    
    const fetchMeals = async(url) => {
        setLoading(true);
        try {
           const { data } = await axios(url) ;
           if(data.meals) {
           setMeals(data.meals)
          } else {
            setMeals([])
          }
        } catch (error) {
            console.log(error.response)
        }
        setLoading(false);
    }

    const fetchRandomMeal = () => {
        fetchMeals(randomMealsUrl)
    }

    const selectMeal = (idMeal, favouriteMeal) => {
        
        let meal;
        if(favouriteMeal) {
          meal = favourites.find((meal) => meal.idMeal === idMeal);
        } else {
        meal = meals.find((meal) => meal.idMeal === idMeal);
        }
        setSelectedMeal(meal);
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false)
    }

    const addToFavourites = (idMeal) => {
        // console.log(idMeal);
        const alreadyFavourite = favourites.find((meal) => meal.idMeal === idMeal);
        if(alreadyFavourite) return
        const favMeal = meals.find((meal) => meal.idMeal === idMeal);
        const updatedFavourite = [...favourites,favMeal];
        
        setFavourites(updatedFavourite);
        localStorage.setItem("favourites",JSON.stringify(updatedFavourite));
    }

    const removeFromFavourites = (idMeal) => {
    
        const updatedFavourite = favourites.filter((meal) => meal.idMeal !== idMeal);
        
        setFavourites(updatedFavourite);   
        localStorage.setItem("favourites",JSON.stringify(updatedFavourite));
    }

    useEffect(() => {
         fetchMeals(allMealsUrl)
    },[])

  
    useEffect(() => {
        if(!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`);
    },[searchTerm])
    return (
            <AppContext.Provider value={{meals,loading,setSearchTerm,fetchRandomMeal,showModal,closeModal,selectMeal,selectedMeal,
            favourites,addToFavourites,removeFromFavourites}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext, AppProvider}

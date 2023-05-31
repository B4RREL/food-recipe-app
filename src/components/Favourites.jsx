import { useGlobalContext } from "../context";

const Favourites = () => {
    const { favourites,selectMeal,removeFromFavourites } = useGlobalContext();
    return (
        <section className="favorites">
            <div className="favorites-content">
                <h5>Favourites</h5>
                <div className="favorites-container">
                    
                        {
                            favourites.map((meal) => {
                                const { idMeal,strMealThumb: image } = meal;
                            return (
                                <div key={idMeal} className="favorite-item">
                                    <img src={image} onClick={() => selectMeal(idMeal,true)} alt="img" className="favorites-img img" />
                                    <button className="remove-btn" onClick={() => removeFromFavourites(idMeal)}>
                                        remove</button>
                                </div>
                            )}
                            )
                        }
                    
                </div>
            </div>
        </section>
    )
}

export default Favourites
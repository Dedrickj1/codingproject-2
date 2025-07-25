import  { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { loadAllSpots } from "../../store/spots";
import SpotCard from "../../components/SpotCard";
import './LandingPage.css';

const LandingPage = () => {
const dispatch = useDispatch();
const spots = Object.values(useSelector((state)=> state.spots))
const [isLoaded, setIsLoaded] = useState(false);

useEffect(() => {
    if (!isLoaded) {
      dispatch(loadAllSpots()) 
        setIsLoaded(true); 
    }
  }, [dispatch, setIsLoaded, isLoaded]);


    return(
        <>
            <div className="spot-list">
                {spots &&
                 spots.map((spot) =>(
                    <SpotCard key={spot.id} spot={spot} />
                ))}
            </div>
        </>
        
    );
};

export default LandingPage
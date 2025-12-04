import {subscribeToUsersCollection} from "../firebaseFunction/cloudDatabase.jsx";
import {useEffect, useState, useMemo} from "react";
import AdminUserList from "./adminUser.jsx";
import {listenToClockEvents} from "../firebaseFunction/realTimeDatabase.jsx";

function Adminpanel() {
    //state to hold users data
    const [usersData, setUsersData] = useState([]);
    const [userClockData, setUserClockData] = useState({});


    //subscribe to users collection on component mount
    // and listen to real-time updates
    useEffect(()=>{
        const unsubscribe = subscribeToUsersCollection((users) =>{
            setUsersData(users);
            console.log("Subscribed Users Data:", users);
        });

        const unsubscribeClock = listenToClockEvents((clockData) => {
            setUserClockData(clockData);
            // console.log("Subscribed Clock Data:", clockData);
        });

        return () => {
            unsubscribe();
            unsubscribeClock();
        };
    }, []);


    // Combine users data with their clock status
    const combinedUserData = useMemo(() => {
        return usersData.map(user=>({
            ...user,
            clockStatus: userClockData[user.id] || {clockStatus: false, clockInTime: null, clockOutTime: null}
        }));
    }, [usersData, userClockData]);


    // Render the admin panel with the combined user data
    return (
        <>
            {combinedUserData.length > 0 && combinedUserData.map(user => (
                <AdminUserList user={user} />
            ))}
    </>
    )
}

export default Adminpanel;
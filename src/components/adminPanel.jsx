import {subscribeToUsersCollection} from "../firebaseFunction/cloudDatabase.jsx";
import {useEffect, useState, useMemo} from "react";
import AdminUserList from "./adminUser.jsx";
import {listenToClockEvents} from "../firebaseFunction/realTimeDatabase.jsx";

function Adminpanel() {
    const [usersData, setUsersData] = useState([]);
    const [userClockData, setUserClockData] = useState({});

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

    const combinedUserData = useMemo(() => {
        return usersData.map(user=>({
            ...user,
            clockStatus: userClockData[user.id] || {clockStatus: false, clockInTime: null, clockOutTime: null}
        }));
    }, [usersData, userClockData]);


    return (
        <>
            {/* <div class="overflow-x-auto max-w-5xl pt-8">
            <table class="min-w-full border border-gray-500 text-sm text-gray-800"> */}
            {combinedUserData.length > 0 && combinedUserData.map(user => (
                <AdminUserList user={user} />
            ))}
    </>
    )
}

export default Adminpanel;
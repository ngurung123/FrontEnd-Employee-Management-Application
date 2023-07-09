import { useState } from "react";


export default function LoginUsernameTransfer() {

    const getData = () => {
        const dataString = sessionStorage.getItem('data');
        return dataString;
    }


    const [data, setData] = useState(getData());

    const saveData = (data) => {
        sessionStorage.setItem('data', JSON.stringify(data));
        setData(data);
    }


    return {
        setData: saveData,
        getData
    }

}
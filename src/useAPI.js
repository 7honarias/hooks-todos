import { useState, useEffect } from "react";
import axios from 'axios';

const useAPI = (endpoint) => {
    const [data, setData] = useState([])

    useEffect(() => {
        getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getData = async () => {
        const response = await axios.get(endpoint);
        setData(response.data);
    }
    return data;
}
export default useAPI;

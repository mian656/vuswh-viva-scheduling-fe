import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React from 'react'


async function fetchindData(data, searchParams) {
    const params = new URLSearchParams(searchParams);
    console.log("checking data for sortby", data)
    if (data.student) {
        params.set('search', data.student);
    }
    if (data.roles) {
        params.set('roles', data.roles);
    }
    if (data.status) {
        params.set('status', data.status);
    }

    const res = await axios.get(`/users/pagedata?${params.toString()}`);
    // replace(`/students/allByCurrActSem?${params.toString()}`);
    console.log("checkingFilteredDataMeta", res)
    return res.data;
}

export default fetchindData


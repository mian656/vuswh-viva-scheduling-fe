import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React from 'react'

async function fetchindData(data, searchParams) {
    const params = new URLSearchParams(searchParams);
    console.log("checking data for sortby", data)
    if (data.supervisor) {
        params.set('supervisor', data.supervisor);
    }
    if (data.semester) {
        params.set('semester', data.semester);
    }
    if (data.sortedBy) {
        params.set('sortedBy', data.sortedBy);
    }
    if (data.orderBy) {
        params.set('orderBy', data.orderBy);
    }
    const res = await axios.get(`/students/openByCurrActSem?${params.toString()}`);
    // replace(`/students/allByCurrActSem?${params.toString()}`);
    return res.data;
}

export default fetchindData
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React from 'react'

async function fetchindData(data, searchParams) {
    const params = new URLSearchParams(searchParams);
    if (data.search) {
        params.set('search', data.search);
    }
    const res = await axios.get(`/campuses/pagedata?${params.toString()}`);
    // replace(`/campuses/pagedata?${params.toString()}`);
    return res.data;
}

export default fetchindData
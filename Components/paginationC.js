import React, { useState, useEffect } from "react";
import { withRouter } from "next/router";
import Select from 'react-select';

const Pagination = ({ meta, router, currentPage, setCurrentPage, currentTake, setCurrentTake }) => {
    const [isLoading, setLoading] = useState(false);

    const TakePages = [
        {page: 10},
        {page: 25},
        {page: 50},
        {page: 100},
    ]

    const Takepage = TakePages.map((item)=>{
        return {
            ...item,
            label: item.page,
            value: item.page,
        }
    }) 
 
    const handlePageChange = (pagee) => {
        const selectedPage = Number(pagee) + 1;
        setCurrentPage(selectedPage);
        const currentPath = router.pathname;
        const currentQuery = router.query;
        currentQuery.page = selectedPage;
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    };

    const handleChange = (selectedOption) => {
        const selectedTake = selectedOption.label
        setCurrentTake(selectedTake)
        setCurrentPage(1);
        const currentPath = router.pathname;
        const currentQuery = router.query;
        currentQuery.take = selectedTake;
        currentQuery.page = 1;
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    }

    const handlepageNoChange = (pagee) => {
        setCurrentPage(pagee)
        const currentPath = router.pathname;
        const currentQuery = router.query;
        currentQuery.page = pagee;
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    }

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <div className="flex items-center justify-between bg-slate-300 border-gray-200 dark:bg-gray-900">
            <div className="flex justify-start ml-10">
                <Select
                    closeMenuOnSelect={true}
                    defaultValue={currentTake}
                    options={Takepage}
                    onChange={handleChange}
                    className="p-0 m-1  w-15 h-10  pl-2  "
                />
            </div>
            <div className="flex justify-center">
                <p>Pg no</p>
                <input 
                className="border border-current w-10 ml-2 text-center"
                defaultValue={currentPage}
                onChange={(e) => {
                    handlepageNoChange(e.target.value);
                  }}
                />
            </div>
            <div className="flex items-center space-x-5 justify-end mr-10 mt-5 mb-5">
                <button
                    onClick={() => handlePageChange(meta.page - 2)}
                    disabled={!meta.hasPreviousPage}
                >
                    Previous
                </button>
                {Array.from({ length: meta.pageCount }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i)}
                        className={i + 1 === meta.page ? "active" : ""}
                    >
                        {i + 1}
                    </button>
                ))}
                <button onClick={() => handlePageChange(meta.page)} disabled={!meta.hasNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default withRouter(Pagination);

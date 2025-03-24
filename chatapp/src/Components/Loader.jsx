import React from 'react'

const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-red-50">
            <h1 className="text-3xl font-bold text-red-600 mb-4 animate-pulse">
                CHAT APP is loading...
            </h1>
            <div className="flex space-x-2">
                <div className="w-4 h-12 bg-red-500 animate-pulse"></div>
                <div className="w-4 h-12 bg-red-500 animate-pulse delay-100"></div>
                <div className="w-4 h-12 bg-red-500 animate-pulse delay-200"></div>
                <div className="w-4 h-12 bg-red-500 animate-pulse delay-300"></div>
                <div className="w-4 h-12 bg-red-500 animate-pulse delay-400"></div>
            </div>
        </div>
    )
}

export default Loader

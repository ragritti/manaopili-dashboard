'use client';
import { useState } from 'react';
import { run } from '../gemini_v2';

export default function CompanyInfo() {
    const [searchQuery, setSearchQuery] = useState('');
    const [res, setRes] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            const res2 = await run(searchQuery);
            setRes(res2);
        } catch (error) {
            console.error("Search error:", error);
            setRes("An error occurred while fetching results.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white shadow-sm rounded-lg p-6 mb-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">
                        Company Search
                    </h1>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Enter company name..."
                            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                            disabled={loading}
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </div>
                
                {/* Results Section */}
                {(loading || res) && (
                    <div className="bg-white shadow-sm rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Results
                        </h2>
                        {loading ? (
                            <div className="flex justify-center items-center py-10">
                                <div className="animate-pulse text-gray-600">Loading results...</div>
                            </div>
                        ) : (
                            <div className="prose max-w-full">
                                <div className="whitespace-pre-wrap">{res}</div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { FaSearch, FaFilter, FaMapMarkerAlt, FaBriefcase } from "react-icons/fa";

type Ad = {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  price: string;
  imageurl: string;
};

type SortOption = "newest" | "oldest" | "title" | "category" | "location";

export default function BrowseAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAds() {
      try {
        const response = await fetch('/api/ads');
        if (!response.ok) {
          throw new Error('Failed to fetch ads');
        }
        const data = await response.json();
        setAds(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchAds();
  }, []);

  // Get unique categories and locations for filter dropdowns
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(ads.map(ad => ad.category))];
    return uniqueCategories.sort();
  }, [ads]);

  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(ads.map(ad => ad.location))];
    return uniqueLocations.sort();
  }, [ads]);

  // Filter and sort ads
  const filteredAndSortedAds = useMemo(() => {
    const filtered = ads.filter(ad => {
      const matchesSearch = 
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === "" || ad.category === selectedCategory;
      const matchesLocation = selectedLocation === "" || ad.location === selectedLocation;
      
      return matchesSearch && matchesCategory && matchesLocation;
    });

    // Sort ads
    switch (sortBy) {
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "category":
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "location":
        filtered.sort((a, b) => a.location.localeCompare(b.location));
        break;
      case "oldest":
        filtered.sort((a, b) => a.id - b.id);
        break;
      case "newest":
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [ads, searchTerm, selectedCategory, selectedLocation, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedLocation("");
    setSortBy("newest");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-black">Loading ads...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-2 sm:p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-black mb-2">Browse Ads</h1>
          <p className="text-black text-sm sm:text-base">Find what you need in your journey back to India</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6 mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search ads by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-2 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black text-sm sm:text-base"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FaFilter />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
            
            {(searchTerm || selectedCategory || selectedLocation) && (
              <button
                onClick={clearFilters}
                className="text-sm text-black hover:text-gray-700 underline mt-2 sm:mt-0"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black text-sm sm:text-base"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Location
                </label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black text-sm sm:text-base"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black text-sm sm:text-base"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                  <option value="category">Category A-Z</option>
                  <option value="location">Location A-Z</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-black text-sm sm:text-base">
            Showing {filteredAndSortedAds.length} of {ads.length} ads
            {(searchTerm || selectedCategory || selectedLocation) && (
              <span className="text-black">
                {" "}(filtered)
              </span>
            )}
          </p>
        </div>

        {/* Ads Grid */}
        {filteredAndSortedAds.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedAds.map((ad) => (
              <div key={ad.id} className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col gap-2 sm:flex-row items-start sm:items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-semibold text-black mb-2 line-clamp-2">
                        {ad.title}
                      </h3>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-black mb-3">
                        <div className="flex items-center gap-1">
                          <FaBriefcase className="text-green-500" />
                          <span>{ad.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-red-500" />
                          <span>{ad.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-black text-xs sm:text-sm mb-4 line-clamp-3">
                    {ad.description}
                  </p>
                  
                  <Link 
                    href={`/ads/${ad.id}`}
                    className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-xs sm:text-sm transition-colors"
                  >
                    View Details
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-base sm:text-lg font-medium text-black mb-2">No ads found</h3>
            <p className="text-black mb-4 text-xs sm:text-base">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={clearFilters}
              className="text-green-600 hover:text-green-700 font-medium text-xs sm:text-base"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

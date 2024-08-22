"use client";
import React, { useState } from 'react';
import { Input } from 'antd';

const { Search } = Input;

interface SearchBarProps {
onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
const [searchValue, setSearchValue] = useState<string>('');

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
};

const handleSearch = (value: string) => {
    onSearch(value);
};

return (
    <Search
    placeholder="Type Movie name..."
    enterButton="Search"
    size="large"
    value={searchValue}
    onChange={handleChange}
    onSearch={handleSearch}
    />
);
};

export default SearchBar;

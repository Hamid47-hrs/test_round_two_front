import { useState } from "react";

const SearchBar = ({ getApiName }) => {
  const [apiName, setApiName] = useState("");

  return (
    <div className="search-container">
      <div className="search-inner-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Enter the API name :"
          onChange={(event) => setApiName(event.target.value)}
        />
        <button className="search-button" onClick={() => getApiName(apiName)}>
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

import "./searchBarStyles.css";

const SearchBar = () => {
  return (
    <div className="container">
      <div className="inner-container">
        <input
          className="search-bar"
          type="text"
          placeholder="Enter the API name :"
        />
        <button className="search-button">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;

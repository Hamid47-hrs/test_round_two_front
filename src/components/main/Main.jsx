import { useEffect, useState } from "react";
import ApiField from "./api_field/ApiField";
import SearchBar from "./search_bar/searchBar";
import DescriptionField from "./description_field/DescriptionField";
import LinkField from "./link_field/LinkField";
import CategoryField from "./category_field/CategoryField";
import Loading from "../loading/Loading";
import "./MainStyles.css";

const Main = () => {
  const [apiName, setApiName] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApiName = (arg) => {
    setApiName(arg);
    setLoading(true);
  };

  const fetchApiData = () => {
    fetch("https://api.publicapis.org/entries")
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (apiName) {
            const apiValue = data.entries.filter((element) => {
              return element["API"] === apiName;
            });
            setData(apiValue);
          } else {
            setData(data.entries);
          }
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchApiData();
  });

  console.log(data);
  return (
    <>
      <div className="top-container">
        <SearchBar getApiName={getApiName} />
      </div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div className="bottom-container">
          <div className="field-container">
            <h2 className="title">Api Field :</h2>
            {data.map((item, index) => (
              <ApiField api={item.API} key={index} />
            ))}
          </div>
          <div className="field-container">
            <h2 className="title">Description Field :</h2>
            {data.map((item, index) => (
              <DescriptionField description={item.Description} key={index} />
            ))}
          </div>
          <div className="field-container">
            <h2 className="title">Link Field :</h2>
            {data.map((item, index) => (
              <LinkField link={item.Link} key={index} />
            ))}
          </div>
          <div className="field-container">
            <h2 className="title">Category Field :</h2>
            {data.map((item, index) => (
              <CategoryField category={item.Category} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Main;

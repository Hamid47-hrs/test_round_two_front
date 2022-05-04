import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
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
  const [reload, setReload] = useState(false);

  const getApiName = (arg) => {
    setApiName(arg);
    setLoading(true);
  };

  const sendApiToServer = (apis) => {
    apis.forEach((item) => {
      axios
        .post("http://127.0.0.1:4000/save-api-in-database", {
          api: item.API,
          description: item.Description,
          link: item.Link,
          category: item.Category,
        })
        .then((res) => toast.success(res.data.message))
        .catch((err) => toast.error(err.message));
      // fetch("http://127.0.0.1:4000/save-api-in-database", {
      //   mode: "no-cors",
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //  body: {
      //     api: item.API,
      //     description: item.Description,
      //     link: item.Link,
      //     category: item.Category,
      //   }
      // })
      //   .then()
      //   .then((data) => {
      //     if (data) {
      //       console.log("Data Sent to Server Successfully.");
      //     }
      //   })
      //   .catch();
    });
  };

  useEffect(() => {
    setReload(false);
    axios
      .get("https://api.publicapis.org/entries")
      .then((res) => {
        if (res.data) {
          if (apiName) {
            const apiValue = res.data.entries.filter((element) => {
              return element["API"] === apiName;
            });
            if (apiValue.length > 0) {
              setData(apiValue);
              sendApiToServer(apiValue);
            } else {
              toast.warn("This API Does not Exist.");
            }
          } else {
            setData(res.data.entries);
          }
          setLoading(false);
        }
      })
      .catch((err) => toast.err(err.message));
    // fetch("https://api.publicapis.org/entries", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data) {
    //       if (apiName) {
    //         const apiValue = data.entries.filter((element) => {
    //           return element["API"] === apiName;
    //         });
    //         setData(apiValue);
    //         sendApiToServer(apiValue);
    //       } else {
    //         setData(data.entries);
    //       }
    //       setLoading(false);
    //     }
    //   })
    //   .catch((err) => console.log(err));
  }, [apiName]);

  if (loading) {
    setTimeout(() => {
      setReload(true);
    }, 30000);
  }

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="top-container">
        <SearchBar getApiName={getApiName} />
      </div>
      {loading ? (
        reload ? (
          <div className="reload-button-container">
            <button className="button" onClick={reloadPage}>
              Realod
            </button>
          </div>
        ) : (
          <Loading />
        )
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

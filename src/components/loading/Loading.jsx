import image from "./Fidget-spinner.gif";

const Loading = () => {
  return (
    <div className="loading-container">
      <h1 className="title">Loading...</h1>
      <img className="loading-image" src={image} alt="loading" />
    </div>
  );
};

export default Loading;

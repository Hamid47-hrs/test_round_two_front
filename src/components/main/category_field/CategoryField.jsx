const CategoryField = ({ category }) => {
  return (
    <div className="container">
      <ul className="data-list">
        <li className="data_item">{category}</li>
      </ul>
    </div>
  );
};

export default CategoryField;

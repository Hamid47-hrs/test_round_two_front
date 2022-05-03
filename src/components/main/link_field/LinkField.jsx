const LinkField = ({ link }) => {
  return (
    <div className="container">
      <ul className="data-list">
        <li className="data_item link-list-item">
          <a className="link" href={link}>{link}</a>
        </li>
      </ul>
    </div>
  );
};

export default LinkField;

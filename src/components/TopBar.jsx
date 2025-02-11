import '../styles/TopBar.css';

const TopBar = ({ boardCount, memberCount }) => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <h1 className="title">Apple</h1>
        <p className="subtitle">
          {boardCount} boards - {memberCount} members
        </p>
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
};

export default TopBar;
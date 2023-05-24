interface Props {
  tab: string;
  setTab: Function;
  current: string;

  savedMap: any;
  savedChar: any;
  savedGame: any;
}

export default function Tabs(props: Props) {
  const handleOptionsTab = async () => {
    props.setTab("options");
  };

  const handleCurrentTab = async () => {
    props.setTab("current");
  };

  const displayCurrentTab = () => {
    if (props.current === "map") {
      return props.savedMap.name;
    } else if (props.current === "char") {
      return props.savedChar.name;
    } else if (props.current === "game") {
      return props.savedGame.name;
    }
  };

  return (
    <nav className="panel-tabs">
      <button
        className={`tab btn ${props.tab === "options" ? "active" : ""}`}
        onClick={handleOptionsTab}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        className={`tab btn ${props.tab === "current" ? "active" : ""}`}
        onClick={handleCurrentTab}
      >
        {displayCurrentTab()}
      </button>
    </nav>
  );
}

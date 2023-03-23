
interface Props {
  tab: string;
  setTab: Function;
  current: string;
}

export default function Tabs (props: Props) {

  const handleOptionsTab = () => {
    props.setTab('options');
  }

  const handleCurrentTab = () => {
    props.setTab('current');
  }

  const displayCurrentTab = () => {
    if (props.current === 'map') {
      return 'map'
    } else if (props.current === 'char') {
      return 'character'
    } else if (props.current === 'game') {
      return 'game'
    }
  }
  
  return (
    <nav className='panel-tabs'>
      <button 
        className={`tab btn ${props.tab === 'options' ? 'active' : ''}`}
        onClick={handleOptionsTab}
      >
        home
      </button>
      <button 
        className={`tab btn ${props.tab === 'current' ? 'active' : ''}`}
        onClick={handleCurrentTab}
      >
        {displayCurrentTab()}
      </button>
    </nav>
  )
}
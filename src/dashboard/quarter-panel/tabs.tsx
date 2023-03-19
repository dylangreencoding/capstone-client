
interface Props {
  tab: string;
  setTab: Function;
}

export default function Tabs (props: Props) {

  const handleOptionsTab = () => {
    props.setTab('options');
  }

  const handleCurrentTab = () => {
    props.setTab('current');
  }
  
  return (
    <nav className='panel-tabs'>
      <span 
        className={`tab ${props.tab === 'options' ? 'active' : ''}`}
        onClick={handleOptionsTab}
      >
        options
      </span>
      <span 
        className={`tab ${props.tab === 'current' ? 'active' : ''}`}
        onClick={handleCurrentTab}
      >
        current
      </span>
    </nav>
  )
}
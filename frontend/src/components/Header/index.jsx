import { useNavigate } from "react-router"

export const Header = () => {
  const navigate = useNavigate();

  return(
      <header>
      <button 
        style={{
          background: 'none',
          border: 'none',
          alignSelf: 'start',
          cursor: 'pointer'
        }}
        type="button" 
        onClick={()=>navigate('/')}>
        <h1>ChatBox</h1>
      </button>
    </header>
  )
}
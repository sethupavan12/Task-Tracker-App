import Button from "./Button"


const Header = ({onAdd,showForm}) => {



    return (
    <header className='header'>
        <h1> Task Tracker </h1>
        <Button color={showForm ? 'Red' : 'Green'} text = {showForm ? 'Close' : 'Add'} onClick ={onAdd}/>
        
    </header>

  )
}

export default Header
import { useRouteError } from "react-router-dom";


const NotFound = () =>{
    const error = useRouteError();
    console.warn(error);

    
    return (<>
    <div>
        <img style={{display:'block',marginLeft:'auto',marginRight:'auto',width:'60%',height:'20%',overflowY:'hidden'}} src="./storage/404.png" alt="" />
    </div>
    </>
    )
}

export default NotFound;
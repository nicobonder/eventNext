import auth from '../../firebase/auth'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';


export default function ButtonSingOut( ) {

    const handleSingOut = async () => {   
        const { error, suscess } = await auth.signOutUser()
        if (error) {
            console.log('Error al cerrar sesion', error)
        }

        if (suscess) {
            console.log('suscess', suscess) 
        } 
        window.location.href = '/';
    }
    
    return <Button
            color="info" outline
            style={{ margin: '40px 10%', position: 'absolute', top: '0', right: '0' }}
            onClick={handleSingOut}
            >
        Cerrar Sessión
    </Button>
}
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { useState, useContext } from "react"
import { AppContext } from '../Context/context';

function PreLoader() {
    let { user, setUser, loader, setLoader } = useContext(AppContext);

    const [open, setOpen] = useState(false);
    console.log(loader)
    return <div>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loader}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    </div>
}

export default PreLoader;
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDispatch} from "react-redux";
import {ErrorAc} from "../../State/dataTool.reducer";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius:'50px',
    bgcolor: 'background.paper',
    backgroundColor: '#d081f1',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type ModalError = {
    Error: string;
}

export default function ModalError( props: ModalError ) {
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(ErrorAc({Error: ''}))
    };

    return (
        <div>
            <Modal
                open={true}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onKeyPress={(e)=> e.code === "Enter" ? handleClose() : null}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" style={{color:'#42030d',textAlign:'center'}} variant="h6" component="h2">
                        Error
                    </Typography>
                    <Typography id="modal-modal-description" style={{textAlign:'center',color:'#42030d',fontSize:'18px'}} sx={{ mt: 5 }}>
                        {props.Error}
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
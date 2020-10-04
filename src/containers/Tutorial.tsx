import React, {useEffect, useState} from "react";
import {TutorialForm} from "../components/Tutorial/TutorialForm";
import AxiosAPI from "../services/AxiosAPI";
import {useHistory} from "react-router";

export type Tutorial = {
    id: number;
    nombre: string;
    profesor: string;
    materia: string;
    fecha: Date;
    fechaString?: string;
    materia_id?: number
};


const Tutorial = (props: any) => {
    const dateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', hour12: false,
    };

    const initialData: Tutorial = {
        id: 0,
        profesor: '',
        nombre: '',
        materia: '',
        fecha: new Date(),
        fechaString: ''
    };

    const [newTutorial, setNewTutorial] = useState(initialData);

    const [validateForm, setValidateForm] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');
    const [isEdit, setIsEdit] = useState(false);

    const history = useHistory();

    useEffect(() => {
        document.title = 'Agregar tutorial';
        if (props.location.state !== undefined) {
            setNewTutorial(props.location.state.tutorial);
            setIsEdit(true);
        }
    }, [props.location.state])

    const addTutorial = () => {
        AxiosAPI.post(`/createtutorial`, newTutorial)
            .then(response => setNewTutorial(response))
            .catch(reason => setErrorMsg(JSON.stringify(reason)));
    };

    const editTutorial = (id: number) => {
        AxiosAPI.put(`/updatetutorial/${id}`)
            .then(response => setNewTutorial(response))
            .catch(reason => setErrorMsg(JSON.stringify(reason)));

    }

    const stringToDate = (dateString: string | undefined) => {
        // let dateString = new Date(date).toLocaleDateString('es-CL', dateOptions)
        if (dateString !== undefined) {
            try {
                const [fecha, hora] = dateString.split(" ");
                const [dd, mm, yyyy] = fecha.split("-").map(value => parseInt(value));
                if (hora !== undefined && hora.includes(':')) {
                    const [hh, mins] = hora.split(":").map(value => parseInt(value));
                    console.log(dd, mm, yyyy, hh, mins)
                    console.log(new Date(yyyy, mm - 1, dd, hh, mins))
                    return new Date(yyyy, mm - 1, dd, hh, mins);
                }
                return new Date(yyyy, mm - 1, dd);
            } catch (err) {
                console.log(`stringToDate error formateando la fecha: ${err}`);
                setErrorMsg(JSON.stringify(err));
                return null;
            }
        }
        return null;
    };

    const handleFormSubmit = async (form: any, isEditing: boolean) => {
        let model = Object.assign({}, newTutorial);
        try {
            // @ts-ignore
            model.fecha = stringToDate(model.fechaString);
            if (model.fecha.toDateString() === 'Invalid Date')
                throw new Error();

            console.log(model);

            if (form.checkValidity()) {
                isEditing ? await editTutorial(newTutorial.id) : await addTutorial();
                setTimeout(() => history.push({pathname: "/tutoriales", state: {message: 'Tutorial guardado con éxito'}}), 750);
            } else setErrorMsg('Faltan campos obligatorios por llenar');
        } catch (e) {
            setErrorMsg('Formato de fecha inválido');
        }
    };

    const handleFormChange = (type: any, value: any) => {
        setNewTutorial({...newTutorial, [type]: value});
    }

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Eliminar?")) {
            await AxiosAPI.remove(`/deletetutorial/${id}`);
            history.push({pathname: "/tutoriales", state: {message: 'Tutorial eliminado con éxito'}})
        }
    }

    return (
        <>
            <TutorialForm
                tutorial={newTutorial}
                validate={validateForm}
                errorMsg={errorMsg}
                isEdit={isEdit}
                handleDelete={handleDelete}
                handleChange={handleFormChange}
                handleSubmit={handleFormSubmit}
            />
        </>
    );
}

export default Tutorial;
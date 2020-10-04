import * as React from 'react';
import {Tutorial} from "../../containers/Tutorial";
import {Form, Button} from 'react-bootstrap';
import {useRef} from "react";
import FormRowInput from "../FormRow/FormRowInput";

type Props = {
    tutorial: Tutorial;
    handleSubmit: any;
    handleChange: any;
    handleDelete: any;
    validate: boolean;
    errorMsg: string;
    isEdit: boolean;
};

export const TutorialForm = ({handleChange, handleSubmit, tutorial, validate, errorMsg, isEdit, handleDelete}: Props) => {
    const formRef = useRef(null);
    const {nombre, fechaString, materia, profesor, id} = tutorial;

    return (
        <Form className={"form"} noValidate validated={validate} ref={formRef}>
            <FormRowInput
                label={"Título"}
                type={"text"}
                placeholder={"Título"}
                value={nombre}
                handleChange={handleChange}
                property={"nombre"}
            />
            <FormRowInput
                label={"Profesor"}
                type={"text"}
                placeholder={"Profesor"}
                value={profesor}
                handleChange={handleChange}
                property={"profesor"}
            />
            <FormRowInput
                label={"Materia"}
                type={"text"}
                placeholder={"Materia"}
                value={materia}
                handleChange={handleChange}
                property={"materia"}
            />
            <FormRowInput
                label={"Fecha"}
                type={"text"}
                placeholder={"DD-MM-YYYY hh:mm"}
                value={fechaString}
                handleChange={handleChange}
                property={"fechaString"}
            />
            {errorMsg !== '' &&
            <Form.Group className="alert-danger">
                {errorMsg}
            </Form.Group>
            }
            {isEdit &&
            <Button variant={"danger"} className={"mr-2"}
                    onClick={() => handleDelete(id)}>Eliminar</Button>
            }
            <Button variant={"primary"} className={"mr-2"}
                    onClick={() => handleSubmit(formRef.current, isEdit)}>{isEdit ? 'Modificar' : 'Agregar'}</Button>
        </Form>
    );
};
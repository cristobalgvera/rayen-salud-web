import React from "react";
import {Tutorial} from "../../containers/Tutorial";
import {Button, Table} from "react-bootstrap";

type Props = {
    tutorials: Tutorial[];
    handleDeleteAll: any;
    handleEdit: any;
};

export const TutorialslList = ({tutorials, handleDeleteAll, handleEdit}: Props) => {

    const tutorialList = tutorials.map(tutorial => {
        const {id, fecha, nombre, profesor} = tutorial;
        return (
            <tr key={id}>
                <td>{nombre}</td>
                <td>{profesor}</td>
                <td>{fecha}</td>
                <td>
                    <Button variant={"primary"} className={"me-2"}
                            onClick={() => handleEdit(tutorial)}>Modificar</Button>
                </td>
            </tr>
        );
    })

    return (
        <Table>
            <tbody>
            {tutorialList}
            </tbody>
            <tfoot>
            <tr>
                <td colSpan={4}>
                    <Button variant={"primary"} className={"mr-2"}
                            onClick={handleDeleteAll}>Eliminar todos</Button>
                </td>
            </tr>
            </tfoot>
        </Table>
    );
};
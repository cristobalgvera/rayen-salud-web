import * as React from 'react';
import {Link, useHistory} from 'react-router-dom';
import AxiosAPI from "../services/AxiosAPI";
import {useEffect, useState} from "react";
import {TutorialslList} from '../components/Home/TutorialslList';
import {Tutorial} from "./Tutorial";
import {log} from "util";
import {Message} from "../components/Home/Message";

const Home = (props: any) => {
    const [tutorials, setTutorials] = useState<Tutorial[]>([]);
    const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState('');

    const history = useHistory();

    useEffect(() => {
        getTutorials();
        document.title = 'Home';
        if (props.location.state !== undefined) {
            setMessage(props.location.state.message);
        }
    }, [props.location.state]);


    useEffect(() => {
        let filtered: Tutorial[] = tutorials.filter(tutorial => tutorial.nombre.includes(title));
        setFilteredTutorials(filtered);
    }, [title, tutorials]);

    const getTutorials = () => {
        AxiosAPI.get(`/tutorials`)
            .then(response => {
                setTutorials(response);
                setFilteredTutorials(response);
            });
    }

    const handleSort = (sortBy: string) => {
        let ordered: Tutorial[];
        if (sortBy === 'date')
            ordered = filteredTutorials.sort((a, b) => {
                const dateA = new Date(a.fecha).getTime();
                const dateB = new Date(b.fecha).getTime();
                return dateA > dateB ? 1 : -1;
            });
        else ordered = filteredTutorials.sort((a, b) => a.nombre.localeCompare(b.nombre))

        setFilteredTutorials(ordered);
    };

    const handleDeleteAll = async () => {
        await AxiosAPI.remove(`/deletetutorials`)
            .then(getTutorials);
    }

    const handleEdit = (tutorial: Tutorial) => {
        history.push({
            pathname: '/editar-tutorial',
            state: {tutorial: tutorial}
        });
    }

    return (
        <div className={"container mt-4"}>
            <input
                type={"text"}
                placeholder={"Buscar por título"}
                className={"form-control"}
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <div className={"d-flex flex-row justify-content-end bd-highlight mb-3"}>
                <label htmlFor={"order-by"}>Ordenado por</label>
                <select className={"custom-select"} defaultValue={"title"} onChange={e => handleSort(e.target.value)}>
                    <option value={"title"}>Título</option>
                    <option value={"date"}>Fecha</option>
                </select>
            </div>

            <TutorialslList
                tutorials={filteredTutorials}
                handleEdit={handleEdit}
                handleDeleteAll={handleDeleteAll}
            />
            <Link to={"/agregar-tutorial"}>
                <button type="button" className="btn btn-primary btn-circle btn-xl btn-holder"><span
                    className="glyphicon glyphicon-plus"/></button>
            </Link>
            <Message message={message}/>
        </div>
    );
};

export default Home;
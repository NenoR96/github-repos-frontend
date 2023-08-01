import './Home.css';
import React, { useEffect, useState } from 'react';
import { getRepositories, saveFavorites } from '../../Utils/Utils';
import NavigationBar from '../AppBar/AppBar';

import CircularProgress from '@mui/material/CircularProgress';
import MaterialCard from '../../Components/MaterialCard/MaterialCard';

function Home() {
    const [dbRepositories, setDBRepositories] = useState([]);
    const [repositories, setRepositories] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [filteredFavorites, setFilteredFavorites] = useState(false);
    const [languageFilters, setLanguageFilters] = useState([]);
    const [currentFilter, setCurrentFilter] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRepositories().then((response) => {
            let { repositories, favorites } = response;

            setDBRepositories(repositories);
            setRepositories(repositories);
            setFavorites(favorites);
            setLanguageFilters([...new Set(repositories.map(repo => repo.language).filter(lang => lang))]);
            setIsLoading(false);
        }).catch((err) => alert(err));
    }, []);

    const handleFavorites = (repo) => {
        let favs = [...dbRepositories.filter(el => el.isFavorite).map(el => el.id)];
        let exists = favs.find(el => el === repo.id);
        if (exists) favs = favs.filter(el => el !== repo.id)
        else favs.push(repo.id);

        let index = dbRepositories.findIndex(el => el.id === repo.id);
        dbRepositories[index].isFavorite = !dbRepositories[index].isFavorite;

        saveFavorites(favs).then(() => {
            setFavorites(favs);
            if (filteredFavorites)
                setRepositories(dbRepositories.filter(el => favs.some(fav => fav === el.id)));
        }).catch((err) => alert(err));
    }

    const showFavorites = (event) => {
        if (event.target.checked) {
            if (currentFilter)
                setRepositories(dbRepositories.filter(el => el.isFavorite && currentFilter === el.language));
            else setRepositories(dbRepositories.filter(el => el.isFavorite));
            setFilteredFavorites(true);
        }
        else {
            if (currentFilter)
                setRepositories(dbRepositories.filter(el => currentFilter === el.language));
            else setRepositories(dbRepositories);

            setFilteredFavorites(false);
        }
    }

    const handleFilter = (event, filter) => {
        if (event.target.checked) {
            if (filteredFavorites)
                setRepositories(dbRepositories.filter(el => el.isFavorite && filter === el.language));
            else setRepositories(dbRepositories.filter(el => filter === el.language));

            setCurrentFilter(filter);
        }
        else {
            setCurrentFilter(null);
            setRepositories(dbRepositories);
        }
    }
    if (isLoading) return <CircularProgress className='circular-progress' />
    else return (
        <>
            <NavigationBar showFavorites={showFavorites} languageFilters={languageFilters} currentFilter={currentFilter} handleFilter={handleFilter} />
            <div className="repos-list">
                {repositories.map((repo) =>
                    <MaterialCard repo={repo} favorites={favorites} key={repo.id}
                        handleFavorites={handleFavorites} />
                )}
            </div>
        </>
    );
}

export default Home;
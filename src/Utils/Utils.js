const API_URL = 'http://localhost:5000';

export const getRepositories = () => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/repositories`)
            .then(response => response.json())
            .then(data => resolve(data))
            .catch(reject);
    });
}

export const saveFavorites = (data) => {
    return new Promise((resolve, reject) => {
        fetch(`${API_URL}/favorites`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
            .then(data => resolve(data))
            .catch(reject);
    });
}
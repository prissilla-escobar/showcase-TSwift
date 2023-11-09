export async function getAlbums() {
    let Url = 'https://taylor-swift-api.sarbo.workers.dev/albums'
    try {
        const response = await fetch(Url);
        if (!response.ok) {
            throw new Error(`Album not found.`)
        }
        return response.json()
    } catch (error) {
        throw new Error(`Error fetching albums: ${error.message}`)
    }
}

export async function getAllSongs() {
    let Url = 'https://taylor-swift-api.sarbo.workers.dev/songs'
    try {
        const response = await fetch(Url);
        if (!response.ok) {
            throw new Error(`Songs not found.`)
        }
        return response.json()
    } catch (error) {
        throw new Error(`Error fetching albums: ${error.message}`)
    }
}

export function getSongLyrics(songID) {
    return fetch(`https://taylor-swift-api.sarbo.workers.dev/lyrics/${songID}`).then(
        (response) => {
        if (!response.ok) {
            throw new Error(`Song(s) not found.`);
        }
        return response.json();
        }
    )
}
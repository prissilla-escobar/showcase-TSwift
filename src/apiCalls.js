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
            throw new Error(`Lyrics not found.`);
        }
        return response.json();
        }
    )
}

export const getAllSongLyrics = async () => {
    const allLyricsCall = []

    for (let i=1; i<=177; i++) {
        const url = `https://taylor-swift-api.sarbo.workers.dev/lyrics/${i}`
        allLyricsCall.push(fetch(url)
        .then(response => response.json())
        .catch((error) => {
            console.error(`Error fetching lyrics for song ${i}: ${error.message}`)
            return null
          })
        )
    }

    try {
        const allLyrics = await Promise.all(allLyricsCall)
        return allLyrics
    } catch (error) {
        console.error(`Error in getAllSongLyrics Promise.all: ${error.message}`)
        throw new Error(`Error fetching lyrics: ${error.message}`)
    }
}
// export function getAlbums() {
//     return fetch("https://taylor-swift-api.sarbo.workers.dev/albums").then(
//       (response) => {
//         if (!response.ok) {
//           throw new Error(`Album not found.`);
//         }
//         return response.json();
//       }
//     );
//   }

// Is async necessary? Otherwise the .map() randomly does not work

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

export function getAlbumSongs(albumId) {
return fetch(`https://taylor-swift-api.sarbo.workers.dev/albums/${albumId}`).then(
    (response) => {
    if (!response.ok) {
        throw new Error(`Album songs not found.`);
    }
    return response.json();
    }
);
}

export function getAllSongs() {
return fetch("https://taylor-swift-api.sarbo.workers.dev/songs").then(
    (response) => {
    if (!response.ok) {
        throw new Error(`Song(s) not found.`);
    }
    return response.json();
    }
);
}

export function getSongLyrics(songID) {
return fetch(`https://taylor-swift-api.sarbo.workers.dev/lyrics/${songID}`).then(
    (response) => {
    if (!response.ok) {
        throw new Error(`Song(s) not found.`);
    }
    return response.json();
    }
);
}
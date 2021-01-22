export function fetchListDrives() {
    return (
        fetch("http://localhost:3001/listDrives")
            .then(res => res.json())
            .then(result => result)
            .catch(console.log)
    )
}

export function fetchBrowse(fileId) {
    return (
        fetch("http://localhost:3001/browse/" + fileId)
            .then(res => res.json())
            .then(result => result)
            .catch(console.log)
    )
}
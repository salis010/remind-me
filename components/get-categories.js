export const pruneData = data => {

    const arr = []

    data.forEach(item => arr.push(Object.fromEntries([ ["value", item.id], ["text", item.categoryName] ])))
        
    return arr
}

export const getCategories = () => {
    
    const categoriesURL = "https://api-gateway.remind.me/provider/category"

    return new Promise((resolve, reject) => {
        fetch(categoriesURL)
        .then(response => response.json())
        .then(data => pruneData(data))
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
}
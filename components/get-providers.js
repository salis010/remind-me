export const pruneData = data => {

    const arr = []

    data.forEach(item => arr.push(Object.fromEntries([ ["value", item.company.id], ["text", item.company.companyName] ])))
        
    return arr
}

export const getProviders = id => {
    
    const providersURL = "https://api-gateway.remind.me/provider/categoryProvider/category/"
    
    return new Promise((resolve, reject) => {
        fetch(providersURL + id)
        .then(response => response.json())
        .then(data => pruneData(data))
        .then(data => resolve(data))
    })
}
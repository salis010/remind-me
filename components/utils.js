export const initializeReminder = () => (
    {
        category: { 
            value: '',
            status: fieldStatus.notVisited,
            isValid: false,
        },
        provider: { 
            value: '',
            status: fieldStatus.notVisited,
            isValid: false,
        },
        expiryDate: { 
            value: '',
            status: fieldStatus.notVisited,
            isValid: false,
        },
        email: { 
            value: '',
            status: fieldStatus.notVisited,
            isValid: false,
        },
    }
)

export const fieldStatus = {
    notVisited: 0,
    beingEdited: 1,
    userLeftField: 2,
}

// The below is not robust at all, a library like date-fns should be used or else a more thorough implementation
export const isDateValid = strDate => {
    
    if(strDate.length < 8 || strDate.length > 10) {
        return false
    } 

    const arr = strDate.split('/')
    const day = parseInt(arr[0])
    const month = parseInt(arr[1] - 1)
    const year = parseInt(arr[2])

    if( !((day >= 1 && day <= 31)
        && (month >= 0 && month <= 11)
        && (year >= 2020 && year <= 2040)) ) {
            return false
        }

    const expiryDate = new Date(year, month, day)

    return expiryDate > new Date() 
}

export const isEmailValid = strEmail => {

    const regex = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    
    return regex.test(strEmail)
}

export const isDropDownValueValid = value => value != -1 && value != ""
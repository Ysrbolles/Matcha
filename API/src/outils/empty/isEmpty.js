const isEmpty = (inpt) => {
    if(!inpt) return true
    if (typeof inpt === 'undefined') return true
    if(inpt.length === 0) return true
    if(JSON.stringify(inpt) === '{}') return true
    return false
}

module.exports = isEmpty
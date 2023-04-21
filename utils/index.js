const { log, warn } = require('console')

const calculateSizeInBits = (item = null) => {
    try {
        if (!item)
            return null;
        else if (typeof item === 'number') {
            return item.toString(2).length;
        } else if (typeof item === 'string') {
            let binary = '';
            binary = item.split('').map(char => {
                return char.charCodeAt(0).toString(2);
            }).join(' ');

            return binary.length;
        }
    } catch (e) {
        warn(`Error with util/calculateSizeInBits(): ${e.message}`)
    }
}

const getTimeStamp = () => {
    const date = new Date();
    return (date.toGMTString());
}


module.exports = { calculateSizeInBits, getTimeStamp };
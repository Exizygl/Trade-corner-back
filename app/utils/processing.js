
const existInArray = (array, element) => {

    const exist = array.find(x => JSON.stringify(x) === JSON.stringify(element));

    return exist === undefined ? false : true
};

const emptyString = (val) => (val === undefined || val === null || (`${val}`).replace(' ', '') === '');


module.exports = {
    existInArray,
    emptyString
}
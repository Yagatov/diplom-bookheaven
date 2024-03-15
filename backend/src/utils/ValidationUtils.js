export function isProps(object, values) {
    let result = true;
    values.forEach(item => {
        if(!Object.hasOwn(object, item)) {
            result = false;
        }
    });
    return result;
}
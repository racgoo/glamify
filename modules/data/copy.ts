const copy = <T>(object: T): T => {
    return JSON.parse(JSON.stringify(object));
}
export default copy;
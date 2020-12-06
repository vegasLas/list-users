const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
const required = (value) => {
    if (value) return undefined
    return 'Field is required';
}
export const minLength = (minLength) => (value) => {
    if (value && value.length < minLength) return `Min length is ${minLength} symbols`;
    return undefined
}
const minValue11 = minLength(11)

export {
    minValue11,
    number,
    email,
    required
}
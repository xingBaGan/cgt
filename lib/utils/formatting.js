/**
 *
 * @param str
 * @returns formated string
 * @description normalizes input to supported path and file name format.
 * Changes camelCase strings to kebab-case, replaces spaces with dash and keeps underscores.
 */
function normalizeToKebabOrSnakeCase(str) {
    const STRING_DASHERIZE_REGEXP = /\s/g;
    const STRING_DECAMELIZE_REGEXP = /([a-z\d])([A-Z])/g;
    return str
    // camelCase to kebab-case
        .replace(STRING_DECAMELIZE_REGEXP, '$1-$2')
        .toLowerCase()
        // replace spaces with dash
        .replace(STRING_DASHERIZE_REGEXP, '-');
}
module.exports = {
    normalizeToKebabOrSnakeCase,
}

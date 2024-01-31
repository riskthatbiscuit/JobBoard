// prettier.config.js or .prettierrc.js

/** @type {import("prettier").Config} */
const config = {
    trailingComma: 'es5',
    tabWidth: 2,
    semi: true,
    singleQuote: true,
    plugins: ['prettier-plugin-tailwindcss'], // Adding the Tailwind CSS plugin
}

module.exports = config

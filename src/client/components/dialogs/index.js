import _ from "lodash";

/**
 * Web pack packages all js files
 */
const context = require.context("./", false, /\.js$/);

/**
 * Functions as a require for all components but excludes index file
 */
const components = context
    .keys()
    .filter(name => name.indexOf("index") == -1)
    .map(name => context(name).default);

/**
 * Maps components to:
 * [{id:1, comp: component}]
 */
export default _.zipObject(
    components.map(c=>c.id),
    components.map(c=>c.component)
);
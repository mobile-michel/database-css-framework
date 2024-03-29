module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/admin");
    eleventyConfig.addPassthroughCopy("./src/assets");
    return {
        dir: {
            input: "src",
            layouts: "_layouts"
        },
        templateFormats: ["html", "md", "liquid"]
    };
};
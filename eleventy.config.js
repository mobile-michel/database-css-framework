module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/admin");
    return {
        dir: {
            input: "src",
            layouts: "_layouts"
        },
        templateFormats: ["html", "md", "liquid"]
    };
};
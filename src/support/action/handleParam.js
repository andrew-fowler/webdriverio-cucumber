/**
 * Created by andrewfowler on 2/28/17.
 */
module.exports = (type, page, done) => {
    /**
     * The URL to navigate to
     * @type {String}
     */
    const url = (type === 'url') ? page : browser.options.baseUrl + page;

    browser.url(url);

    done();
};

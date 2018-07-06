let themes = {};

const randomSort = () => {
    return Math.random() - Math.random();
};

const initArray = (src) => {
    return [].concat(src).sort(randomSort);
};

class Namey {
    constructor(source = 'classic') {
        this.sourceNames = [];
        this.firstNames = [];
        this.lastNames = [];

        this.setSource(source);
    };

    getName = () => {
        if (!this.firstNames.length) {
            this.firstNames = initArray(this.sourceNames.first);
        }
        if (!this.lastNames.length) {
            this.lastNames = initArray(this.sourceNames.last);
        }

        const first = firstNames.pop();
        const last = lastNames.pop();
        return `${first} ${last}`;
    };

    setSource = (source) => {
        if (typeof source === 'object') {
            this.sourceNames = themes[source.theme] = Object.assign({}, source);
            if (!Array.isArray(this.sourceNames.first) || this.sourceNames.first.length === 0) {
                this.sourceNames.first = ['Foo'];
            }
            if (!Array.isArray(this.sourceNames.last) || this.sourceNames.last.length === 0) {
                this.sourceNames.last = ['Bar'];
            }
        } else if (typeof source === 'string') {
            if (!themes[source]) {
                try {
                    themes[source] = require(`./themes/${source}`);
                } catch (e) {
                    console.error(`Namey Error: Invalid theme ("${source}") specified. Using "classic" theme instead.`);
                    themes[source] = require(`./themes/classic`);
                }
            }
            this.sourceNames = themes[source];
        }

        this.firstNames = initArray(this.sourceNames.first);
        this.lastNames = initArray(this.sourceNames.last);
    };
}

// themes
// - classic (default)
// - baddies
// - cute & cuddly
// - sci-fi
// - fantasy
// - common
// - historical
// - metal
// - custom
module.exports = Namey;

class Cheat10ff {
    /**
     * @type {number}
     */
    errorPerc = 0.04;

    /**
     * @type {number|null}
     */
    intervalTimer = 1000;

    /**
     * @type {number}
     */
    restartTimer = 5000;

    /**
     * @type {KeyboardEvent}
     */
    spaceEvent = new KeyboardEvent('keyup', {which: 32, keyCode: 32});

    /**
     * @type {number|null} Interval identifier
     */
    interval = null;

    /**
     * @param {number} errorPerc
     * @param {number|null} intervalTimer
     * @param {number} restartTimer
     */
    constructor(errorPerc = this.errorPerc, intervalTimer = this.intervalTimer, restartTimer = this.restartTimer) {
        this.errorPerc = errorPerc;
        this.intervalTimer = intervalTimer;
        this.restartTimer = restartTimer;
    }

    /**
     * Get box containing the test's text.
     *
     * @returns {HTMLElement}
     */
    getReloadBox() {
        return document.getElementById('reload-box');
    }

    /**
     * Get the element containing the highlighted word.
     *
     * @returns {Element}
     */
    getHighlightElement() {
        return document.getElementsByClassName('highlight').item(0);
    }

    /**
     * Get the input text element.
     *
     * @returns {HTMLElement}
     */
    getInputElement() {
        return document.getElementById('inputfield');
    }

    /**
     * Get the highlighted word, uses the error percentage.
     *
     * @returns {string}
     */
    getString() {
        const text = this.getHighlightElement().textContent;
        return Math.random() < this.errorPerc? 'xxx' + text.slice(1) : text;
    }

    /**
     * Put the highlighted word in the input and simulate the press of the space bar.
     */
    writeWord() {
        const input = this.getInputElement();
        input.focus();
        input.value = this.getString();
        input.dispatchEvent(this.spaceEvent);
    }

    /**
     * Check if the box containing the text exists.
     *
     * @returns {boolean}
     */
    check() {
        const checkFailed = () => {
            console.warn('check failed: highlight not found');
            return false;
        };
        const box = this.getReloadBox();
        if(box === undefined) return checkFailed();
        if(box.style.display !== 'block') return checkFailed();
        return true;

    }

    /**
     * Wait for the box with text to appear and then start the algorithm.
     */
    restartWhenReady() {
        const restartInterval = setInterval(() => {
            if(this.check) {
                window.clearInterval((restartInterval));
                this.run();
            }
        }, this.restartTimer);
    }

    /**
     * Stop writing the text and, if restart is true, when the box appear restart writing.
     *
     * @param {boolean} restart
     */
    stopInterval(restart = true) {
        if(this.interval === null) return;
        window.clearInterval(this.interval);
        if(restart) this.restartWhenReady();
    }

    /**
     * Play the game using a static time between words.
     */
    runInterval() {
        this.interval = setInterval(() => {
            if(this.check()) {
                this.writeWord();
            } else {
                this.stopInterval();
            }
        }, this.intervalTimer);
    }

    /**
     * Play the game using a dynamic time between words, calculated on the word complexity.
     */
    runTimeout() {
        // TODO
    }

    /**
     * Play the game.
     */
    run() {
        if(this.intervalTimer !== null) {
            this.runInterval();
        } else {
            this.runTimeout();
        }
    }
}

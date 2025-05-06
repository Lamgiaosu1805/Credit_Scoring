const Utils = {
    getRank: (score) => {
        if (score >= 900 && score <= 1000) return 'A3';
        if (score >= 800 && score < 900) return 'A2';
        if (score >= 700 && score < 800) return 'A1';
        if (score >= 600 && score < 700) return 'B3';
        if (score >= 500 && score < 600) return 'B2';
        if (score >= 400 && score < 500) return 'B1';
        if (score >= 300 && score < 400) return 'C3';
        if (score >= 200 && score < 300) return 'C2';
        if (score >= 100 && score < 200) return 'C1';
        return 'D';
    }
}

module.exports = Utils
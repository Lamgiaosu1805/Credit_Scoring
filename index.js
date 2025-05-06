const express = require('express');
const app = express();
app.use(express.json());

const fs = require('fs');
const Utils = require('./src/Utils');


// Trọng số cho từng tiêu chí lớn
const weights = {
  "Character": 0.38,
  "Capacity": 0.36,
  "Capital": 0.4,
  "Collateral": 0.36,
  "Conditions": 0.25
};
const scoringData = JSON.parse(fs.readFileSync('./credit_scoring_corrected.json', 'utf8'));
// Tính điểm từ lựa chọn người dùng
function calculateScoreFromSelection(userInput) {
    let totalScore = 0;
    console.log("\n====== Chi tiết điểm từng mục ======");
    var error = []
    for (const [category, subcriteria] of Object.entries(userInput)) {
        const categoryWeight = weights[category] || 0;
        let categoryScore = 0;

        for (const [criterion, choice] of Object.entries(subcriteria)) {
        const score = scoringData[category]?.[criterion]?.[choice];
        if (typeof score === 'number') {
            const weightedScore = score * categoryWeight;
            categoryScore += weightedScore;
            console.log(`${category} > ${criterion} > ${choice} = ${score} * ${categoryWeight} = ${weightedScore}`);
        } else {
            console.warn(`Không tìm thấy điểm cho: ${category} > ${criterion} > ${choice}`);
            error.push(`Không tìm thấy điểm cho: ${category} > ${criterion} > ${choice}`)
        }
        }

        console.log(`→ Tổng điểm "${category}" (có trọng số): ${categoryScore.toFixed(2)}\n`);
        totalScore += categoryScore;
  }

  console.log("➡️ Tổng điểm cuối cùng (có trọng số):", totalScore.toFixed(2));
  return {
    totalScore: error.length > 0 ? -1 : parseFloat(totalScore.toFixed(2)),
    rating: Utils.getRank(totalScore),
    error: error
  };
}

// Tính tổng điểm tối đa có thể đạt được (cho kiểm tra)
function logMaxPossibleScore() {
  let maxScore = 0;

  for (const [category, subcriteria] of Object.entries(scoringData)) {
    const categoryWeight = weights[category] || 0;

    for (const item of Object.values(subcriteria)) {
      const max = Math.max(...Object.values(item));
      maxScore += max * categoryWeight;
    }
  }

  console.log("🎯 Tổng điểm tối đa (có trọng số):", maxScore.toFixed(2));
}

app.post('/calculate-score', (req, res) => {
    try {
        logMaxPossibleScore(); // Log khi có request
        const userInput = req.body;
        const result = calculateScoreFromSelection(userInput);
        res.json(result);
    } catch (error) {
        console.log(error)
    }
  
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`✅ Credit scoring server running on port ${PORT}`);
});
const express = require('express');
const app = express();
app.use(express.json());

const fs = require('fs');
const scoringData = JSON.parse(fs.readFileSync('./credit_scoring_corrected.json', 'utf8'));

// Trọng số cho từng tiêu chí lớn
const weights = {
  "Character": 0.38,
  "Capacity": 0.36,
  "Capital": 0.4,
  "Collateral": 0.36,
  "Conditions": 0.25
};

// Tính điểm từ lựa chọn người dùng
function calculateScoreFromSelection(userInput) {
  let totalScore = 0;

  console.log("\n====== Chi tiết điểm từng mục ======");

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
      }
    }

    console.log(`→ Tổng điểm "${category}" (có trọng số): ${categoryScore.toFixed(2)}\n`);
    totalScore += categoryScore;
  }

  console.log("➡️ Tổng điểm cuối cùng (có trọng số):", totalScore.toFixed(2));
  return {
    totalScore: parseFloat(totalScore.toFixed(2))
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
  logMaxPossibleScore(); // Log khi có request
  const userInput = req.body;
  const result = calculateScoreFromSelection(userInput);
  res.json(result);
});

const PORT = 1000;
app.listen(PORT, () => {
  console.log(`✅ Credit scoring server running on port ${PORT}`);
});
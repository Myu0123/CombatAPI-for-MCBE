const math = require('mathjs');

// 假設有一系列位置數據點和時間標記
const time = [0, 0.05, 0.1, 0.15, 0.2];
const position = [0, 1, 4, 9, 16]; // 比如這是平方加速運動

// 擬合線性運動模型
const fit = math.lstsq(time.map(t => [1, t]), position);
const model = t => fit[0] + fit[1] * t;

// 計算擬合曲線上的點
const tValues = Array.from({ length: 100 }, (_, i) => i * 0.05);
const curvePoints = tValues.map(ti => model(ti));

console.log(curvePoints);

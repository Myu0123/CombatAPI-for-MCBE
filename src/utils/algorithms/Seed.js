import { Search } from "./Search";

const LCG = {
  max: 2147483647,
  period: [16807, 48271, 214013, 1103515245], //6364136223846793005 *lol*  
};

export class Seed{
  constructor(seed){
    this.seed = this.check(seed) ?? Math.floor(Math.random() * (LCG.max-1)) + 1;
  }

  /**
   * 檢查輸入值是否有效。
   * @param {number} input - 要檢查的數值。
   * @returns {number} - 如果數值有效，返回 input。
   * @returns {boolean} - 如果數值無效，返回 false。
   */
  check(input){
    if(typeof input === 'number' && isFinite(input) && input > 0) return input;
    return false;
  }

  /**
   * 生成下一個隨機數。
   * @param {number} [index=3] - 選擇周期常數的索引。
   * @returns {number} - 標準化生成的隨機數。
   */
  next(index=3){
    index = Math.max(0, Math.min(index, LCG.period.length-1));
    const period = LCG.period[index];
    
    this.seed = (this.seed * period) % LCG.max;
    return this.normalize(this.seed);
  }

  /**
   * 將數值標準化到 [0, 1] 範圍內。
   * @param {number} input - 要標準化的數值。
   * @returns {number} - 標準化後的數值。
   * @throws {Error} - 當 input 超出有效範圍時拋出錯誤。
   */
  normalize(input){
    if(input < 1 || input > LCG.max) throw new Error(`Input '${input}' is out of bounds [1, ${LCG.max}]`);
    return (input-1) / (LCG.max-1);
  }
}

export const Random = {
  /**
   * 將數值標準化到 [0, 1] 範圍內。
   * @param {number} x - 要標準化的數值。
   * @param {number} min - 範圍的最小值。
   * @param {number} max - 範圍的最大值。
   * @returns {number} - 標準化後的數值。
   */
  UIT(x, min, max){
    return (x-min) / (max-min);
  },

  /**
 * 根據對應的權重從 'choices' 陣列中選擇 'k' 個項目。
 * @param {any[]} choices - 用於選擇的選項陣列。
 * @param {number[]} weights - 與選項對應的權重陣列。
 * @param {number} k - 要選擇的項目數量。
 * @param {number} seed - 用於隨機數生成的種子。
 * @returns {any[]} - 返回一個選擇的項目陣列，其大小為 'k'。
 * @throws {Error} - 如果 'choices' 和 'weights' 陣列長度不同，則拋出錯誤。
 */
  weight(choices, weights, k, seed){
    const c = choices;
    const w = weights;
    const len = w.length;
    if(len !== c.length) throw new Error("The lengths of 'Choices' and 'Weights' must be the same.");

    //Weight Array
    let total = new Array(len);
    total[0] = w[0];
    for(let i=1; i<len; i++) total[i] = total[i-1] + w[i];

    //Pick
    let result = [];
    const rng = Seed(seed);
    for(let i=0; i<k; i++){
      let rn = rng.next();
      let index = Search.binaryW(total, rn);
      result.push(c[index]);
    }
    
    return result;
  }
}





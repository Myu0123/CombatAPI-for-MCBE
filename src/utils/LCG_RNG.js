import { Search } from "./algorithms";

export const Seed = {
  max: 2147483647,
  period: [16807, 48271, 214013, 1103515245], //6364136223846793005 *lol*

  /**
   * 檢查輸入值是否有效。
   * @param {number} input - 要檢查的數值。
   * @returns {boolean} - 如果數值有效，返回 true；否則，返回 false。
   */
  check(input){
    return typeof input === 'number' && isFinite(input) && input > 0;
  },

  /**
   * 生成一個隨機數。
   * @param {number} [max=this.max] - 隨機數的最大值。
   * @returns {number} - 生成的隨機數。
   */
  generate(){
    return Math.floor(Math.random() * (this.max-1)) + 1;
  },

  /**
   * 生成下一個隨機數。
   * @param {number} input - 用於生成隨機數的種子值。
   * @param {number} [index=0] - 選擇周期常數的索引。
   * @returns {number} - 生成的隨機數。
   * @throws {Error} - 當 input 無效時拋出錯誤。
   */
  next(input, index=3){
    let seed;
    if(this.check(input)) seed = Math.floor(input) % this.max;
    else seed = this.generate();
    
    index = Math.max(0, Math.min(index, this.period.length-1));
    const period = this.period[index];
    return (seed * period) % this.max;
  },

  /**
   * 將數值標準化到 [0, 1] 範圍內。
   * @param {number} input - 要標準化的數值。
   * @returns {number} - 標準化後的數值。
   * @throws {Error} - 當 input 超出有效範圍時拋出錯誤。
   */
  normalize(input){
    if(input < 1 || input > this.max) throw new Error(`Input '${input}' is out of bounds [1, ${this.max}]`);
    return (input-1) / (this.max-1);
  }
};

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
   * 生成指定數量的隨機數。
   * @param {number} k - 要生成的隨機數量。
   * @param {number} seed - 用於生成隨機數的種子值。
   * @returns {number[]} - 包含生成隨機數的數組。
   */
  RNG(k, seed){
    const result = [];
    if(Seed.check(seed)){
      let currentSeed = seed;
      for(let i=0; i<k; i++){
        result.push(Seed.normalize(currentSeed));
        currentSeed = Seed.next(currentSeed);
      }
    }
    else{
      for(let i=0; i<k; i++) result.push(Math.random());
    }
    return result;
  },

  /**
 * 根據對應的權重從 'choices' 陣列中選擇 'k' 個項目。
 * @param {any[]} choices - 用於選擇的選項陣列。
 * @param {number[]} weights - 與選項對應的權重陣列。
 * @param {number} k - 要選擇的項目數量。
 * @param {number} seed - 用於隨機數生成的種子。如果無效，則使用 Math.random()。
 * @returns {any[]} - 返回一個選擇的項目陣列，其大小為 'k'。
 * @throws {Error} - 如果 'choices' 和 'weights' 陣列長度不同，則拋出錯誤。
 */
  weight(choices, weights, k, seed){
    const c = choices;
    const w = weights;
    const len = w.length;
    if(len !== c.length) throw new Error("The lengths of 'Choices' and 'Weights' must be the same.");

    let total = new Array(len);
    total[0] = w[0];
    for(let i=1; i<len; i++) total[i] = total[i-1] + w[i];

    let result = [];
    let RN = this.RNG(k, seed);
    for (let cmW of RN) {
      let index = Search.binary(total, cmW * total[len-1]); // 正規化隨機數，乘以總權重
      result.push(c[index]);
    }
    return result;
  }
}





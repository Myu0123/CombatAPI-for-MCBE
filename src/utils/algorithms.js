export const Search = {
    /**
     * 使用二分搜尋法從累積權重陣列中查找對應的範圍。
     * @param {number[]} total - 累積權重陣列。
     * @param {number} value - 隨機數 (0-1)。
     * @returns {number} - 選擇的對應索引。
     */
    binary(total, value){
        let low = 0;
        let high = total.length - 1;
    
        while(low < high){
            let mid = Math.floor((low + high) / 2);
            if(value < total[mid]) high = mid;
            else low = mid + 1;
        }
        
        return low;
    }
}

export class MinHeap{
    constructor(){
        this.heap = [];
    }

    /**
     * 插入新項目到堆中
     * @param {Object} item - 要插入的項目，必須包含一個 value 屬性
     */
    insert(item){
        item.index = this.heap.length - 1;
        this.heap.push(item);
        this.heapify(this.heap.length - 1);
    }

    /**
     * 提取堆中的最小值
     * @returns {Object|null} - 返回堆中的最小值，如果堆為空則返回 null
     */
    extractMin(){
        if(this.heap.length < 1) return null;
        const min = this.heap[0];
        const end = this.heap.pop();

        if(this.heap.length > 0){
            this.heap[0] = end;
            this.heapify(0);
        }
        return min;
    }

    /**
     * 更新指定索引的元素
     * @param {Object} item - 要更新的元素
     * @param {number} newValue - 新的值
     */
    update(item, newValue){
        item.value = newValue;
        this.heapify(item.index);
    }

    /**
     * 向下調整堆結構
     * @param {number} index - 要調整的元素的索引
     */
    heapify(index = 0){
        const size = this.heap.length;

        while(index < size){
            let change = index;
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            const parent = Math.floor((index-1) / 2);

            const thisValue = this.heap[index].value;
            if(left < size && this.heap[left].value < thisValue) change = left;
            if(right < size && this.heap[right].value < thisValue) change = right;
            if(parent > -1) if(thisValue < this.heap[parent].value) change = parent;

            if(change === index) break;
            
            this.swap(change, index);
            index = change;
        }
    }

    /**
     * 交換位置索引
     * @param {number} i - 第一個索引
     * @param {number} j - 第二個索引
     */
    swap(i, j){
        [this.heap[i].index, this.heap[j].index] = [this.heap[j].index, this.heap[i].index];
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}





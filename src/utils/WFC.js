import { Seed, Random } from "./algorithms/Seed";
import { MinHeap } from "./algorithms/Queue";

export class WFC_3D{
    constructor(volume, tiles, adjustment){
        this.seed = new Seed();
        this.volume = volume;
        //初始化candidate以便之後執行some
        this.candidateGrid = Array.from({ length: volume.x }, () => 
            Array.from({ length: volume.y }, () => 
                Array.from({ length: volume.z }, () => ({ ...tiles }))
            )
        );
        //初始化EG(for座標)和EH(for最小值)
        this.entropyHeap = new MinHeap();
        this.entropyGrid = Array.from({ length: volume.x }, (_, xIndex) => 
            Array.from({ length: volume.y }, (_, yIndex) => 
                Array.from({ length: volume.z }, (_, zIndex) => {
                    const entropyObject = {
                        position: { x: xIndex, y: yIndex, z: zIndex },
                        value: Infinity
                    };
                    this.entropyHeap.insert(entropyObject);
                    return entropyObject;
                })
            )
        );
        this.resultGrid = Array.from({ length: volume.x }, () => 
            Array.from({ length: volume.y }, () => 
                Array.from({ length: volume.z }, () => null)
            )
        );
        this.adjustment = adjustment;
    }

    //待確認是否需要 異步/步進
    run(){
        while(this.entropyHeap.length > 0){
            this.selectTile(this.entropyHeap.extractMin());
        }
        return this.resultGrid;
    }

    selectTile(cell){
        const [x, y, z] = [cell.position.x, cell.position.y, cell.position.z];
        const candidate = this.candidateGrid[x][y][z];
        const ids = Object.keys(candidate);
        const weights = Object.values(candidate);
    
        //抽出tileId
        const tileId = Random.weight(ids, weights, 1)[0];
        this.resultGrid[x][y][z] = tileId;
        //更新周圍
        this.update([x, y, z], tileId);

    }

    update(x, y, z, tileId){
        //刪除不合理candidate

        //計算entropy
        const candidate = this.candidateGrid[x][y][z];
        const totalWeight = candidate.reduce((sum, item) => sum + item.weight, 0);
        const entropy = -candidate.reduce((sum, item) => {
            const p = item.weight / totalWeight;
            return sum + p * Math.log(p);
        }, 0);
        this.entropyHeap.update(this.entropyGrid[x][y][z], entropy);
    }

}
/*const Neighbors = {up: [0, 1], down: [0, -1], left: [-1, 0], right: [1, 0]};
        //Apply adjacency rules here to filter out invalid tiles based on neighbors.
        Object.entries(Neighbors).forEach(([offset, [dx, dy]]) => {
            const nbX = x + dx;
            const nbY = y + dy;
            const check = nbX >= 0 && nbX < this.width && nbY >= 0 && nbY < this.height && this.grid[nbX][nbY] !== Infinity;
            if(check){
                this.candidate[nbX][nbY] = this.candidate[nbX][nbY].filter(tile => this.adjacency[tile.id].includes(this.grid[nbX][nbY].id)); //需要修改
                this.calculateEntropy(nbX, nbY);
            }
        });
 */
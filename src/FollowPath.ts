import PathLocation from "./PathLocation";
import Path from "./Path";

function dump(input: number[][], width: number, height: number) {
   let row: number;
   let col: number;
   let output: string = "";
   console.log(width + ' X ' + height);
   for(row = 0; row < height; row++) {
      for (col = 0; col < width; col++) {
         output += input[row][col] + "\t";
      }
      output += "\n";
   }
   console.log(output);
}

function follow(key: number, row: number, col: number, input: number[][], width: number, height: number, locations: PathLocation[], level: number): number {
   let cnt: number = 1;
   // transform to mark at looked at
   input[row][col] = 0 - key;
   locations.push(new PathLocation(row, col));
   // look left
   if (col + 1 < width && input[row][col + 1] == key) cnt += follow(key, row, col + 1, input, width, height, locations, level + 1);
   // look right
   if (col - 1 >= 0 && input[row][col - 1] == key) cnt += follow(key, row, col - 1, input, width, height, locations, level + 1);
   // look down
   if (row + 1 < height && input[row + 1][col] == key) cnt += follow(key, row + 1, col, input, width, height, locations, level + 1);
   // look up
   if (row - 1 >= 0 && input[row - 1][col] == key) cnt += follow(key, row - 1, col, input, width, height, locations, level + 1);
   
   return cnt;
}

function run(input: number[][]): Path {
   const width: number = input[0].length;
   const height: number = input.length;
   let map = new Map<number, Path>();

   dump(input, width, height);
   for(let row = 0; row < height; row++) {
      for (let col = 0; col < width; col++) {
         const key: number = input[row][col];
         if (key < 0) continue;
         const locations: PathLocation[] = [];
         const cnt = follow(key, row, col, input, width, height, locations, 0);
         if (map.has(key)) {
            let value: Path = map.get(key);
            if (cnt > value.cnt) {
               map.set(key, new Path(key, cnt, locations));
            }
         }
         else {
            map.set(key, new Path(key, cnt, locations));
         }
         // dump(input, width, height);
      }
   }
   let maxPath: Path = new Path(0, 0, []);
   for(let path of map.values()) {
      console.log(`Found ${path.key} ${path.cnt}`);
      if (path.cnt > maxPath.cnt) {
         maxPath = path;
      }
   }
   console.log('===============================');

   return maxPath;
}

let input: number[][] = Array(6);
let i = 0;
input[i++] = [1, 2, 3, 4, 4];
input[i++] = [1, 3, 3, 4, 2];
input[i++] = [1, 1, 3, 1, 3];
input[i++] = [3, 4, 3, 1, 2];
input[i++] = [3, 2, 3, 1, 1];
input[i++] = [3, 3, 3, 1, 1];

let path: Path = run(input);
console.log(`(${path.key}, ${path.cnt})`);
let output: string = '';
path.locations.forEach(location => {
   output += output.length == 0 ? `${location.row},${location.col}` : ` => ${location.row},${location.col}`;
});
console.log(output);

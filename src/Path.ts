import PathLocation from "./PathLocation";

class Path {
   key: number;
   cnt: number;
   locations: PathLocation[];

   constructor(key: number, cnt: number, locations: PathLocation[]) {
      this.key = key;
      this.cnt = cnt;
      this.locations = locations;
   }
}

export default Path;
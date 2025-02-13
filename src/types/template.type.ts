export interface ITemplate {
    _id: string;
    name: string;
    timeRanges: ITimeRange[];
    classRooms: IClassRoom[];
    subjects: IClassRoom[];
    __v: number;
  }
  
  export interface IClassRoom {
    name: string;
    _id: string;
  }
  
  export interface ITimeRange {
    startTime: string;
    endTime: string;
    _id: string;
  }
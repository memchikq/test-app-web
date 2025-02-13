export interface ITemplate {
    _id: string;
    name: string;
    timeRanges: ITimeRange[];
    __v: number;
  }
  

  export interface ITimeRange {
    startTime: string;
    endTime: string;
    _id: string;
  }
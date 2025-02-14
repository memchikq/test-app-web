export interface ISchedule {
    _id: string;
    originalId: string;
    order: number;
    slots: ISlot[];
  }
  
  export interface ISlot {
    timeSlot: ITimeSlot;
    isFixed: boolean;
    classroomData: IClassroomData[];
    groupData: IClassroomData[];
    subjectData: IClassroomData[];
  }
  
  export interface IClassroomData {
    _id: string;
    name: string;
    __v: number;
  }
  
  export interface ITimeSlot {
    startTime: string;
    endTime: string;
  }


  
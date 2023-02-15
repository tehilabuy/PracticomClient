import { HammerModule } from "@angular/platform-browser";
import Child from "./Child";


export default class User {
    
    constructor(
       
        public UserId:string,
        public UserName: string,
        public UserFamilyName: string,
        public HMO:String,
        public UserBirthday: Date,
        public Gender:string,
        public ChildrenOfParent:Child[]
    ) {

    }
}
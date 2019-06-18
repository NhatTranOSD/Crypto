import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ComonFunctions {

    public convertTimestampToDisplayTime(unixtimestamp: string): any {

        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        const date = new Date(+unixtimestamp * 1000);

        // Will display time in 10:30:23 format
        const formattedTime = date.toLocaleString();

        return formattedTime;

    }

    public equalHash(a: string, b: string): any {
        if (a.toLowerCase() === b.toLowerCase()) {
            return true;
        } else {
            return false;
        }
    }
}

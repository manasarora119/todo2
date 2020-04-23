import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable()
export class BroadcastService {
    private subject = new Subject<any>();
    private serviceTypeSubject = new BehaviorSubject("domestic");

    
    changeService(val) {
        this.serviceTypeSubject.next(val);
    }
    
    checkService():Observable<string> {
        return this.serviceTypeSubject.asObservable();
    }

    publish(message) {
      
        this.subject.next({ event: message });
    }

    listen(): Observable<any> {
        return this.subject.asObservable();
    }

    //required to clear data
    clearSubscription(){
        this.subject.next();
    }

    //unsubscribe multiple listeners
    unsubscribeListener(subscriptions){
        let flag = true;
        try {
            if(subscriptions && typeof subscriptions == 'object'){
                if(Array.isArray(subscriptions)) {
                    subscriptions.forEach(s => {
                        flag = flag && s && s.unsubscribe && typeof s.unsubscribe == 'function'; 
                        flag && s.unsubscribe();
                    })
                }else{
                    flag = flag && subscriptions.unsubscribe && typeof subscriptions.unsubscribe == 'function';
                    flag && subscriptions.unsubscribe();
                }
            }else{
                flag = false;
            }
        } catch (error) {
            flag = false;
        }
        return flag ? true : false;
    }

}
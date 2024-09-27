import {
  combineLatest,
  combineLatestWith,
  delay,
  Observable,
  withLatestFrom,
} from 'rxjs';

/* Does combineLatest execute an observable that implements an API call? */

interface User {
  id: number;
  name: string;
  email: string;
}

const userData$: Observable<User[]> = new Observable<User[]>((observer) => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((data: User[]) => {
      observer.next(data);
      observer.complete();
    })
    .catch((err) => observer.error(err));
});

interface Album {
  id: number;
  title: string;
  userId: number;
}

const albumData$: Observable<Album[]> = new Observable<Album[]>((observer) => {
  fetch('https://jsonplaceholder.typicode.com/albums')
    .then((response) => response.json())
    .then((data: Album[]) => {
      observer.next(data);
      observer.complete();
    })
    .catch((err) => observer.error(err));
}).pipe(
  delay(2000)
);

/* -------------------------------------------------------------------------- */
/* 
This subscription will only execute the complete callback
It will not execute the next callback
This because while the albumData$ observable is delayed and the 'Next' notification is only sent
after after the Complete notification 
*/

// userData$.pipe(
//   withLatestFrom(albumData$),
// ).subscribe({
//   next: (data) => console.log('results',data),
//   error: (err) => console.error(err),
//   complete: () => console.log('Completed'),
// });

/* -------------------------------------------------------------------------- */
/* Both next notification and complete notification received by the subscription */

// combineLatest([userData$, albumData$]).subscribe({
//   next: (data) => console.log('results',data),
//   error: (err) => console.error(err),
//   complete: () => console.log('Completed'),
// });

/* -------------------------------------------------------------------------- */
/* Both next notification and complete notification received by the subscription */

userData$.pipe(combineLatestWith(albumData$)).subscribe({
  next: (data) => console.log('results combineLatestWith',data),
  error: (err) => console.error(err),
  complete: () => console.log('Completed'),
});


// How would this work with merge map
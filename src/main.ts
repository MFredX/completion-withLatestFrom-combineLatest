import {
  combineLatest,
  combineLatestWith,
  delay,
  Observable,
  withLatestFrom,
  tap
} from 'rxjs';

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
}).pipe((
  tap({
      next: (data) => console.log('User Data',data),
      error: (err) => console.error('User error',err),
      complete: () => console.log('User Data Completed')
    })
  )
);

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
  tap({
    next: (data) => console.log('Album data',data),
    error: (err) => console.error('Album error',err),
    complete: () => console.log('Album data Completed')
  }),
  delay(2000)
);

/* SCENARIO 1 */
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
//   next: (data) => console.log('Scenario 1 Next',data),
//   error: (err) => console.error(err),
//   complete: () => console.log('Scenario 1 Completed'),
// });

/* SCENARIO 2 */
/* -------------------------------------------------------------------------- */
/* Both next notification and complete notification received by the subscription */

// combineLatest([userData$, albumData$]).subscribe({
//   next: (data) => console.log('Scenario 2 Next',data),
//   error: (err) => console.error(err),
//   complete: () => console.log('Scenario 2 Completed'),
// });

/* SCENARIO 3 */
/* -------------------------------------------------------------------------- */
/* Both next notification and complete notification received by the subscription */

userData$.pipe(combineLatestWith(albumData$)).subscribe({
  next: (data) => console.log('Scenario 3 Next',data),
  error: (err) => console.error(err),
  complete: () => console.log('Scenario 3 Completed'),
});


// Thought: How would this work with merge map?
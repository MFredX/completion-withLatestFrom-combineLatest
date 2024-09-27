# Differences between `withLatestFrom`,`combineLatest` and `combineLatestWith`

There are subtle differences in behaviour of these RxJs operators, this app explore this.

## 

- This subscription will only execute the complete callback
- It will not execute the next callback
- This because while the albumData$ observable is delayed and the 'Next' notification is only sent after after the Complete notification 

```
userData$.pipe(
    withLatestFrom(albumData$),
 ).subscribe({
   next: (data) => console.log('results',data),
   error: (err) => console.error(err),
   complete: () => console.log('Completed'),
});
```


## Why make a vanilla TS app for this?

A local app test app provides the opportunity to utilise browser developer tools to explore these subtleties of these operators.

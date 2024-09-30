# Differences between `withLatestFrom`,`combineLatest` and `combineLatestWith`

There are subtle differences in behaviour of these RxJs operators, this app explore this.

## How to use this

- To setup and run the application

```
cd completion-withLatestFrom-combineLatest
npm i
npm run dev
```

- Uncomment the scenario you wish to run and comment out the remaining scenarios
- Open dev tools and observe the Console and Network tabs

## Scenario 1

```
userData$.pipe(
  withLatestFrom(albumData$),
).subscribe({
  next: (data) => console.log('Scenario 1 Next',data),
  error: (err) => console.error(err),
  complete: () => console.log('Scenario 1 Completed'),
});
```

- This subscription will only execute the complete callback
- It will not execute the next callback
- This because while the albumData$ observable is delayed and the 'Next' notification is only emitted after after the emission of the Complete notification
   
## Scenario 2

```
combineLatest([userData$, albumData$]).subscribe({
  next: (data) => console.log('Scenario 2 Next',data),
  error: (err) => console.error(err),
  complete: () => console.log('Scenario 2 Completed'),
});
```

- This subscription will execute the next callback followed by the complete callback
- The combineLatests stream will run the complete callback when **both** streams complete
- If you remove one of the `observer.complete()` calls in the observable definition, you will notice that the complete callback never runs


## Scenario 3

```
userData$.pipe(combineLatestWith(albumData$)).subscribe({
  next: (data) => console.log('Scenario 3 Next',data),
  error: (err) => console.error(err),
  complete: () => console.log('Scenario 3 Completed'),
});
```

- This subscription will execute the next callback followed by the complete callback
- The combineLatests stream will run the complete callback when **both** streams complete
- If you remove one of the `observer.complete()` calls in the observable definition, you will notice that the complete callback never runs

## Why make a vanilla TS app for this?

A local app test app provides the opportunity to utilise browser developer tools to explore these subtleties of these operators.

// Todo: Add marble diagrams

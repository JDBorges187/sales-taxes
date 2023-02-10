# Sales Tax Calculator

![Screenshot 2023-02-10 112638](https://user-images.githubusercontent.com/22569070/218143912-8a0737ae-0d0b-4b57-9c21-be4250b256b8.png)

## Problem Statement
The goal of this project is to write an application that takes input for shopping baskets and returns receipts in the format shown below, calculating all taxes and totals correctly. The sales tax should be rounded up to the nearest 5 cents.

### Acceptance Criteria:
- The application should correctly calculate the total sales price, total sales taxes, and sales price of each item, taking into account the tax policies described above.
- The sales tax for each item should be rounded up to the nearest 5 cents.
- The receipts should be returned in the format shown below, which includes all of the items purchased, the sales price of each item, the total sales taxes for all items, and the total sales price.

```
Input:
1 Imported bottle of perfume at 27.99
1 Bottle of perfume at 18.99
1 Packet of headache pills at 9.75
1 Imported box of chocolates at 11.25
1 Imported box of chocolates at 11.25

Output:
Imported bottle of perfume: 32.19
Bottle of perfume: 20.89
Packet of headache pills: 9.75
Imported box of chocolates: 23.70 (2 @ 11.85)
Sales Taxes: 7.30
Total: 86.53
```

## Solution
I solved this problem utilizing a single page web app created in React and Typescript. I used an Object Oriented Programming approach which allowed me to separate business logic from the display and input of data. At the end I beleive since items aren't mutable once they are processed that this could probably just be handled by a processing function.

## How to run
To run the application just run the following commands:
```
npm install
```
and 
```
npm run dev
```

## Future Improvements
If given more time I would like to add:
- More error handling (process good lines and remove from input)
- revisit the class structure a bit
- some unit tests and functional tests
- more mobile responsive
- separate css files

## Author
Jorge Borges

## Introduction
This project implements a simple react-native application called `ChargingHub` which allows users to register electric vehicle charging points usings `location`, `chargerType`, `availability`. They can also view, edit, and delete these entries.



## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```
   npx expo start
   ```

## Screens
- Splash screen upon starting
- Navigate to tab screen where there are an `Add` & `Profile` tabs.
- `Add` tab allows user to add charging points.
- `Profile` tab allows user to see all the charging points added. They can also delete points and choose to modify.
- Modifying navigates to the `Edit` screen which allows the user to modify the selected point.

https://github.com/user-attachments/assets/e54c0549-adfa-48b9-8471-510d82f15914


## Challenges faced
- Faced challenges in using pre-built libraries for dropdown/searchable dropdown components. Nothing seem to work as expected and most rendered unusable. I opted to build my own component for the time being.
   - For example, I tried using `react-native-autocomplete-dropdown` but the dropdown would not open. I could not find out the reason why.
   - Then I switched to `react-native-search-dropdown-picker` which had a severe zIndex issue and all dropdowns overlapped.

- The SQLite database could only be initiated on iOS and I will keep looking into it to find out why.
   ```
   Failed to fetch charging points [Error: Call to function 'NativeDatabase.prepareAsync' has been rejected.
   → Caused by: Error code : no such table: ChargingPoints]
   ```

## Backlog fixes
- Code repetition between `add.tsx` & `edit.tsx`, I still want to eliminate that in order to have better shareable components.

- Typescript complains about certain parts of the code.

- The TextInputs display values directly from the DB instead of the label intended.

- Need to make sure that I prevent queries from being ran without sanitizing the values first.

- Enhance the Picker. On android it does not need to be in a modal, this causes a bad user experience because there are many clicks needed in order to select a value.

- Add unit testing.

## Notes
A `.sql` file can be found in the root folder which includes a couple of SQL statement to if needed.





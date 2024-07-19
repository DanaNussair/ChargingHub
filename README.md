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


## Challenges faced
- Faced challenges in using pre-built libraries for dropdown/searchable dropdown components. Nothing seem to work as expected and most rendered unusable. I opted to build my own component for the time being.
   - For example, I tried using `react-native-autocomplete-dropdown` but the dropdown would not open. I could not find out the reason why.
   - Then I switched to `react-native-search-dropdown-picker` which had a severe zIndex issue and all dropdowns overlapped.

- The SQLite database could only be initiated on iOS and I will keep looking into it to find out why.
   ```
   Failed to fetch charging points [Error: Call to function 'NativeDatabase.prepareAsync' has been rejected.
   → Caused by: Error code : no such table: ChargingPoints]
   ```

## Notes
A `.sql` file can be found in the root folder which includes a couple of SQL statement to if needed.





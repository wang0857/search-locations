# Search for locations

Find your locations and saved the search history

## How to Use

1. Download or clone the repository.
2. Replace `${this.myApiKey}` with the API Key. The API Key will be provided seperately by request, or you can apply a free one through [Google Console Platform](https://console.cloud.google.com/)
3. Open the terminal and type `npm run dev`.
4. Click on the localhost link shown in the terminal.

## Completed Tasks

- [x] A button to allow users to acquire their current location from their browser.
- [x] A search module that lets users input the name of a location. The search feature is triggered by both button clicks and pressing the enter key on the keyboard.
- [x] A table with pagination to show all searched places:
    - [x] Display a maximum of 10 records on each page.
    - [x] A checkbox at the beginning of each row to let users select multiple records at the same time.
    - [x] A delete button on the top to remove all selected records as well as their markers on the map.
- [x] Display the time zone and local time of the latest searched location.


## Notes:

Please note that it takes few seconds to load your current location on Google map as well as the local time and time zone after you click on 'Allow' button.

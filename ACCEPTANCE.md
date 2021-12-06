# World View (landing page)

- [ ] When the app first starts, it would ask for permission on user location access
  - [ ] If granted permission, it would display a green marker on the users location
  - [ ] If not granted permission, a default green marker should appear which is located at the center of California
  - [ ] To view the tooltip, click on the marker which changes the color from green to red
- [ ] The display of the map should be shown with/without user location
- [ ] The bottom sheet modal which is located at the bottom of the app should be partially displayed
  - [ ] User should be able to open the bottom sheet modal fully by swiping up.
  - [ ] Clicking on the 'data' button located at the bottom right should open bottom sheet modal partially
- [ ] When bottom sheet modal is open fully, there should be details on the cases/recovered/deaths and the overview graph
- [ ] To close the bottom sheet modal, swipe down and the data button should appear again at the bottom right

# Search Country/Province

- [ ] If the user has not granted permission from the **World View** (landing page), a modal would appear asking for user location access again
  - [ ] If the user has allowed location access, the prior message should not appear
- [ ] The display of the map should be shown with/without user location centered at California
- [ ] The search button should be displayed on the top right corner of the screen
  - [ ] Pressing the search icon should toggle the searchbar
    - [ ] "Search by country" should be the placeholder
    - [ ] "Search by province" should be the new placeholder after user searches country
- [ ] If the user searches by country, it should center the map on that country with the marker
  - [ ] Pressing on the search icon, or "enter" button on your keyboard, to search for the country
  - [ ] A loading spinner should appear at the right side of the searchbar
  - [ ] Clicking on the search icon in the searchbar, or the data button at the bottom right, to partially display the bottom sheet modal
  - [ ] When the bottom sheet modal is fully open, the name of the searched country should appear along with its provinces, also at the bottom is a line chart displaying the cases/deaths/recovered for that country
    - [ ] Pressing one of the points in the line chart should open the tooltip with the y-value
- [ ] After the user searches for a country, user should be able to search for province
  - [ ] The user can search any possible province available for that country, and can click on the search icon or press "enter" on the keyboard to search
  - [ ] A loading spinner should appear at the right side of the searchbar
  - [ ] The map and the marker should change its location based on the searched province in that country
  - [ ] Bottom sheet modal should open partially after user clicks on the search icon in the searchbar or the 'data' button at the bottom right
    - [ ] New data should be displayed in bottom sheet modal if user searched without closing it
  - [ ] When the bottom sheet modal is fully open, the name of the searched province should appear and at the bottom should be a line chart displaying the cases/deaths/recovered for that province
  - [ ] User should be able to enter another province in that country in the searchbar
- [ ] User should be able to click on the previous region button located underneath the leftside of the searchbar which has a gray color titled "Search by country" to search for a different country
  - [ ] Once the previous region button is clicked, the map and the marker should re-center to the country
  - [ ] The bottom sheet modal should disappear upon clicking a previous region button
    - [ ] Clicking on the search icon or 'data' button should open the bottom sheet modal
  - [ ] The placeholder for the searchbar should change from "Search by province" to "Search by country"
  - [ ] A loading spinner should briefly appear at the right side inside the searchbar
  - [ ] User should be able to search for another country
- [ ] An error modal should appear if the country or province name is not entered correctly, or if it does not exist in the API
  - [ ] The bottom sheet modal should not be displayed anywhere on the screen
  - [ ] The previous region button should not be displayed
  - [ ] The placeholder for the searchbar should not change to "Search by province" if there is an error for searching by country
  - [ ] An error modal should appear at the center of the screen with an overlay behind it
  - [ ] At the center of the error modal should be an error description
  - [ ] Clicking on the 'close' button at the bottom of the error modal should close it and remove overlay

# U.S. View

- [ ] If the user has not granted permission from the **World View** (landing page), a modal would appear asking for user location access again
  - [ ] If the user has allowed location access, the prior message should not appear
- [ ] The display of the map should be shown with/without user location
- [ ] The bottom sheet modal which is located at the bottom of the app should be partially displayed
  - [ ] User should be able to open the bottom sheet modal fully by swiping up.
  - [ ] Clicking on the 'data' button located at the bottom right should open bottom sheet modal partially
- [ ] When bottom sheet modal is open fully, there should be details on the cases/recovered/deaths and the overview graph for each states in the US
  - [ ] Scrolling through the list of states should display a loading spinner at the bottom as it renders more state
- [ ] User should see the data button should appear again at the bottom right after closing bottom sheet modal via swiping down

# Search State/Counties Data

- [ ] If the user has not granted permission from the **World View** (landing page), a modal would appear asking for user location access again
  - [ ] If the user has allowed location access, the prior message should not appear
- [ ] The display of the map should be shown with/without user location centered at California
- [ ] The search button should be displayed on the top right corner of the screen
  - [ ] Pressing the search icon should toggle the searchbar
    - [ ] "Search by state" should be the placeholder
    - [ ] "Search by county" should be the new placeholder after user searches state
- [ ] If the user searches by state, it should center the map on that state with the marker
  - [ ] Pressing on the search icon, or "enter" button on your keyboard, to search for the state
  - [ ] A loading spinner should appear at the right side of the searchbar
  - [ ] Clicking on the search icon in the searchbar, or the data button at the bottom right, to partially display the bottom sheet modal
  - [ ] When the bottom sheet modal is fully open, the name of the searched state should appear with all its counties, also each county has a line chart displaying the cases/deaths/recovered for the last 30 days
    - [ ] Scrolling through the list of counties should display a loading spinner at the bottom as it renders more counties
    - [ ] Pressing one of the points in the line chart should open the tooltip with the y-value
- [ ] After the user searches for a state, user should be able to search for county
  - [ ] The user can search any possible county available for that state, and can click on the search icon or press "enter" on the keyboard to search
  - [ ] A loading spinner should appear at the right side of the searchbar
  - [ ] The map and the marker should change its location based on the searched county in that state
  - [ ] Bottom sheet modal should open partially after user clicks on the search icon in the searchbar or the 'data' button at the bottom right
    - [ ] New data should be displayed in bottom sheet modal if user searched without closing it
  - [ ] When the bottom sheet modal is fully open, the name of the searched county should appear and at the bottom should be a line chart displaying the cases/deaths/recovered for that county
  - [ ] User should be able to enter another county in that state in the searchbar
- [ ] User should be able to click on the previous region button located underneath the leftside of the searchbar which has a gray color titled "Search by state" to search for a different state
  - [ ] Once the previous region button is clicked, the map and the marker should re-center to the state
  - [ ] The bottom sheet modal should disappear upon clicking a previous region button
    - [ ] Clicking on the search icon or 'data' button should open the bottom sheet modal
  - [ ] The placeholder for the searchbar should change from "Search by county" to "Search by state"
  - [ ] A loading spinner should briefly appear inside the searchbar at the right side
  - [ ] User should be able to search for another state
- [ ] An error modal should appear if the state or county name is not entered correctly, or if it does not exist in the API
  - [ ] The bottom sheet modal should not be displayed anywhere on the screen
  - [ ] The previous region button should not be displayed
  - [ ] The placeholder for the searchbar should not change to "Search by county" if there is an error for searching by state
  - [ ] An error modal should appear at the center of the screen with an overlay behind it
  - [ ] At the center of the error modal should be an error description
  - [ ] Clicking the 'close' button at the bottom of the error modal should close modal and remove overlay

# Vaccine: World Vaccination Total

- [ ] If the user has not granted permission from the **World View** (landing page), a modal would appear asking for user location access again
  - [ ] If the user has allowed location access, the prior message should not appear
- [ ] The display of the map should be shown with/without user location
- [ ] The bottom sheet modal which is located at the bottom of the app should be partially displayed
  - [ ] User should be able to open the bottom sheet modal fully by swiping up.
  - [ ] Clicking on the 'data' button located at the bottom right should open bottom sheet modal partially
- [ ] When bottom sheet modal is open fully, there should be names of the country with its line graph on the vaccines administered for each country
  - [ ] Scrolling through the list of countries should display a loading spinner at the bottom as it renders more countries
  - [ ] Pressing one of the points in the line chart should open the tooltip with the y-value
- [ ] User should see the data button should appear again at the bottom right after closing bottom sheet modal via swiping down

# Vaccine: View US Vaccination Total

- [ ] If the user has not granted permission from the **World View** (landing page), a modal would appear asking for user location access again
  - [ ] If the user has allowed location access, the prior message should not appear
- [ ] The display of the map should be shown with/without user location
- [ ] The bottom sheet modal which is located at the bottom of the app should be partially displayed
  - [ ] User should be able to open the bottom sheet modal fully by swiping up.
  - [ ] Clicking on the 'data' button located at the bottom right should open bottom sheet modal partially
- [ ] When bottom sheet modal is open fully, there should be names of the states in the US with its line graph on the vaccines administered for each state
  - [ ] Scrolling through the list of states should display a loading spinner at the bottom as it renders more states
  - [ ] Pressing one of the points in the line chart should open the tooltip with the y-value
- [ ] User should see the data button should appear again at the bottom right after closing bottom sheet modal via swiping down

# Vaccine: Search Country Vaccination

- [ ] If the user has not granted permission from the **World View** (landing page), a modal would appear asking for user location access again
  - [ ] If the user has allowed location access, the prior message should not appear
- [ ] The display of the map should be shown with/without user location centered at California
- [ ] The search button should be displayed on the top right corner of the screen
  - [ ] Pressing the search icon should toggle the searchbar
    - [ ] "Search by country" should be the placeholder
- [ ] If the user searches by country, it should center the map on that country with the marker
  - [ ] Pressing on the search icon, or "enter" button on your keyboard, to search for the country
  - [ ] A loading spinner should appear at the right side of the searchbar
  - [ ] Clicking on the search icon in the searchbar, or the data button at the bottom right, to partially display the bottom sheet modal
  - [ ] When the bottom sheet modal is fully open, the name of the searched country should appear, also at the bottom is a line chart displaying the vaccines administered for that country
    - [ ] Pressing one of the points in the line chart should open the tooltip with the y-value
- [ ] An error modal should appear if the name of the country is not entered correctly, or if it does not exist in the API
  - [ ] The bottom sheet modal should not be displayed anywhere on the screen
  - [ ] An error modal should appear at the center of the screen with an overlay behind it
  - [ ] At the center of the error modal should be an error description
  - [ ] Clicking on the 'close' button at the bottom of the error modal should close it and remove overlay

# Vaccine: Search State & Counties(US)

- [ ] If the user has not granted permission from the **World View** (landing page), a modal would appear asking for user location access again
  - [ ] If the user has allowed location access, the prior message should not appear
- [ ] The display of the map should be shown with/without user location centered at California
- [ ] The search button should be displayed on the top right corner of the screen
  - [ ] Pressing the search icon should toggle the searchbar
    - [ ] "Search by state" should be the placeholder
- [ ] If the user searches by state, it should center the map on that state with the marker
  - [ ] Pressing on the search icon, or "enter" button on your keyboard, to search for the state
  - [ ] A loading spinner should appear at the right side of the searchbar
  - [ ] Clicking on the search icon in the searchbar, or the data button at the bottom right, to partially display the bottom sheet modal
  - [ ] When the bottom sheet modal is fully open, the name of the searched state should appear, also at the bottom is a line chart displaying the vaccines administered for that state
    - [ ] Pressing one of the points in the line chart should open the tooltip with the y-value
- [ ] An error modal should appear if the name of the state is not entered correctly, or if it does not exist in the API
  - [ ] The bottom sheet modal should not be displayed anywhere on the screen
  - [ ] An error modal should appear at the center of the screen with an overlay behind it
  - [ ] At the center of the error modal should be an error description
  - [ ] Clicking on the 'close' button at the bottom of the error modal should close it and remove overlay

# Vaccine Trial Data View

- [ ] There should be a gray line separating each VaccineItem (article) component
- [ ] Each VaccineItem should have a "View More/Hide Details" button
- [ ] When user taps "View More", the full article should be visible
- [ ] Article details should be partially hidden after user taps "Hide Details"

# Drawer Navigation

- [ ] Drawer should have the following sections: Logo, World, U.S., Vaccine Doses Administered & Trial, and Footer(About Us, Github link)
- [ ] Drawer should slide out from the left when user taps the hamburger button at navigation header component
- [ ] When user clicks on Github icon in Footer, browser should open URL to project repository

# About Us View

- [ ] User should see round app logo at the top of the view
- [ ] About Us view should have the following sections: Our Story, Our Team, and Connect with Us
- [ ] When user taps on on a LinkedIn icon under Connect with Us, it should redirect user to browser, then see team member's LinkedIn profile page

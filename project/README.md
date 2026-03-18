# Oly Lift PR Tracker
#### Video Demo:  [text](https://youtu.be/ewm0Jew4rr8)
#### Description:

This project is a simple and functional personal record tracker for Olympic lifts (snatch and the clean & jerk). This project was inspired by my personal love of weightlifting training and the sport. I made it so I and my weightlifting friends could track our PRs while getting insight that one would not get if we wrote it in a notepad or a piece of paper. It not only records our PRs, but it also shows us how much stronger we got by percentage compared to our previous PRs, which helps to see if we have made sufficient progress in the time between or if we should change our protocol. Besides that, it also shows the 80%, 75%, 70%, etc. percent of our current max, which is useful if wanting to do optimal rep work, technique work, or utilize a pyramid strategy for training.

I initially wanted a Big 3 barbell lifts (squat, bench, dead) PR tracker since it would be more useful to many more people, since there are significantly more powerlifters and general gym-goers that partake in those lifts than weightlifters. But I decided against that since I don't personally barbell bench, so it did not have much application to me, and since it is my project, it should cater to me as well. After that I considered adding a line graph to the site to visually see progress but ultimately chose not to since it only tracks overall PRs, not the best snatch or clean and jerk you did this day, which would have made it a line graph that just progressively gets higher and higher with every entry and therefore is utterly useless.

The whole thing runs 100% in your browser with no accounts, no passwords, no internet after the first load. You just type your name, hit ENTER, and boom - your own profile loads. Everything saves automatically in your browser's localStorage so even if you close the tab or restart your computer the data is still there when you come back.

Here's what each file actually does so you can see how simple but solid it is:

**index.html**  
This is the main skeleton of the app. It has all the HTML structure: the big header with the barbell emoji, the name input screen, the main dashboard with Current Personal Records card, the Add New Entry form (date + Clean & Jerk kg + Snatch kg), the Training Load Calculator with the dropdown, and the History table at the bottom. I used Tailwind CSS (via CDN) because it lets me make it look clean and modern super fast without writing a ton of custom CSS. All the buttons call the functions from script.js like initializeUserProfile(), saveNewLiftEntry(), refreshLoadCalculator(), etc.

**styles.css**  
Super short and clean. Just imports the Inter and Space Grotesk fonts (so the title looks dope) and sets the default font for the body. Nothing fancy - keeps the whole site feeling consistent and gym-like with the dark zinc colors.

**script.js**  
This is where all the magic happens. I kept the code abstracted on purpose (variables like activeUserName, userProfilesDB, liftHistory, lift1/lift2 instead of hard-coding "cj" and "snatch" everywhere) so if I ever wanna add more lifts later it won't be a nightmare. It handles:
- Creating/loading user profiles
- Saving new entries with date checks (won't let you accidentally overwrite unless you confirm)
- Calculating the % increase from your last PR and popping a little alert like "Clean & Jerk: +4.2%"
- The live calculator that takes your latest max and instantly shows 5% steps from 5% all the way to 100%
- Building the history table with color-coded % change arrows (green for gains, red for whatever)
- Rendering the current PR big numbers at the top

I spent extra time making the code clean and readable because I hate when my own projects become spaghetti later. Everything is wrapped in nice functions like synchronizeAllUIComponents() so one call refreshes the whole screen after you save.

The percent dropdown is locked to 5% jumps because that's what actually makes sense in the gym - nobody is loading 73.4% of their max. The weights round to the nearest 0.5 kg automatically because that's how plates work. And the % change is calculated from the previous entry in chronological order so you can see real progress over months, not just random numbers.

I debated adding a dark/light mode toggle or export buttons right in the UI but kept it minimal on purpose. This is meant to be opened on your phone in the gym or on your laptop between sessions - the simpler the better. No bloat. Just open, type your name, log your PR, and get the insights.

If you wanna run it locally: just download the three files, double-click index.html, or open it in GitHub Codespaces with Live Server like I showed in the video. Your data stays on whatever device you're using until you clear browser storage. Want to backup? Hit F12, go to Application - Local Storage - copy the "wl_profiles" JSON and save it as a .json file. Super easy.

This little tracker has already helped me and a couple buddies see that we were stalling on snatch and needed to switch programs, while our clean & jerk was climbing nicely. That's the exact insight I wanted when I started building it. Nothing crazy, nothing over-engineered - just a tool that actually gets used in the gym.

If you lift Oly and want to track your own PRs without paying for some fancy app or writing everything on paper, clone this repo and you're good to go. Feel free to fork it and add whatever you want (I made the code abstract for a reason). Hope it helps you chase those PRs the same way it's helping me.

Made with passion and way too many hours in the gym thinking "man I wish this was easier to track."   
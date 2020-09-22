<p align="center">
    <img src="src/assets/icon/Logo-1.png" height="75" width="75" />
</p>
<h1 align="center">Gigwerk Freelancer App (Cookie)</h1>
<p align="center">In this guide we will set you up and teach you how to contribute.</p>

## Requirements
- We recommend using WebStorm which you can find <a href="https://www.jetbrains.com/webstorm/download">here</a>. Otherwise <a href="https://code.visualstudio.com/download">Visual Studio Code</a> works fine. You'll need something that you can write TypeScript code comfortably in. 
- You should have the API set up before you set up the frontend. Find that <a href="https://github.com/gigwerk-io/api">here</a>.
- Get a business token from the backend MySQL database.
## Installation
- Clone the dev branch by running, `git clone https://github.com/gigwerk-io/cookie-pwa.git`
- Create a new branch for your ticket from develop with the ticket's name, `git branch GIGWERK-{your ticket number}`
- Install ionic globally `npm install -g @ionic/cli`
- Install tailwindcss angular cli `npm i ng-tailwindcss -g`
- Run `npm install`
- Change the `apiRootUrl` in `./environments/environment.ts` variable with a valid Business Token acquired from the backend MySQL database.

        export const environment = {
            production: false,
            apiRootUrl: 'http://local.gigwerk.io',
            apiRootUrl: http://local.gigwerk.io/business/{business token here}
        };
        
- Run `npm run start`
## Resources
- For UI Components we use <a href="https://tailwindui.com/">Tailwind UI</a>. Virtually all of our css needs are handled by this utility. You will likely never write css code on this project if you learn how to use it. Learn more <a href="https://tailwindcss.com/course">here</a>
- For UI icons used in buttons and elsewhere this project uses a Flaticons UI interface pack. Most of them are already downloaded but if you find that one you need isn't in `./src/assets/icon/interface/*.svg` go <a href="https://www.flaticon.com/packs/ui-interface-25">here</a> to find them. **Make sure to download svg only**
- For 'artsy' iconography we use Undraw as our design solution. Find that <a href="https://undraw.co/search">here</a>. **Make sure to set the color of the Undraw images to #3AC23E** before downloading them into the project. These Undraw images are located in `./src/assets/undraw`.
- Never hurts to learn some <a href="https://angular.io/">Angular</a>, <a href="https://angular.io/">Capacitor</a> and <a href="https://rxjs-dev.firebaseapp.com/">RxJS</a> either as these are always going to be in use. On a lesser extent we are lightly using the <a href="https://ionicframework.com/">Ionic Framework</a>. **Lightly!** we don't want to use almost any of their components. However, if you're in a pinch you may be able to get away with using something lowkey like an Ion List or Ion Item. Beware we will most likely have custom built components already for almost all of our needs so any usage is strictly temporary.
## Coding Practices
- We will use the **camelCase** naming convention for variable naming.
- When you're programming prefer to use <a href="https://en.wikipedia.org/wiki/Dynamic_programming">Dynamic Programming</a> wherever you encounter a problem that could be solved best with it. You should also prefer using <a href="https://en.wikipedia.org/wiki/Functional_programming">Functional Programming</a> (Declaritive) techniques over <a href="https://en.wikipedia.org/wiki/Imperative_programming">Imperative Programming</a> (traditional).
#### Don't do this
    someVariable = undefined; // This variable has some assumed type
#### Do this
    someVariable: someType = undefined; // This is for all types even any. We want to know what this variable's type is because not everyone might have their IDE set up to see the type generated
    
#### Don't do this
    public foo()
    {
        this.myFooLogic();
    }
    
#### Do this
    public foo(): someType {
        this.myFooLogic();
    }
## Useful Tidbits
- If you're trying to build something really complicated to do something simple, check to see if it's already been built or there's something in the code that can help make that thing you're making.
- Use the `alertService` to alert the user with some useful message. The API is already built in and there's a few examples in the codebase already.

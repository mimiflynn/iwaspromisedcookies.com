---
title: Stepping Up Your JS Skills
author: mimiflynn
date: 2014-02-27
template: article.jade
---

Lets say you're a front-end developer that has historically worked on marketing sites. You can make dropdown menus and modal pop-ups and animate hover states and other fun things. Plugins, jQuery is your best friend and the plugin selection really helps you with most of the tasks you are given. You've never written a jQuery plugin and do not fully understand what they are and how they work within the terms of Javascript.

<span class="more"></span>

The most complicated 'app' aspect of the marketing sites you've created are the search and contact forms and those were mostly managed by a CMS. You want a new job but all the new jobs are looking for front-end developers that build applications with complex interactions and huge Javascript codebases. The couple of interviews you've recently had were bad and a little embarrassing, but you feel confident in your knowledge of Javascript and your ability to learn more.

What do you need to do to step up your JS skills?

## Read

Its hard to know where to start because your don't know what you don't know. A good place to start is at the beginning. Read about Javascript; its a great way to fill in the gaps. There are plently of free references online that can help you along.

[Javascript Allonge](https://leanpub.com/javascript-allonge/read)

[Mozilla Developer Network JS Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)

Reading can be taken to a whole other level, though. Don't just read books about Javascript, but, as you get to understand JS more and more through technical book, start to look at the code of the tools you currently use and look up what you don't understand in the [Mozilla Developer JS reference site](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference).



## Use the console

The Chrome console is an excellent space to test out your new JS skills.

For example, lets say you see this code:

```javascript
function findWhere(objArray, find, where, is) {

    console.log('find ' + find + ' where ' + where + ' is ' + is);

    var asw = '';

    objArray.forEach(function (element, index, array) {

        if (element[where] === is) {
            console.log(element[find]);
            asw = element[find];
        }

    });

    return asw;
}

var groupMembers= [{
        name: 'Jane Preston',
        location: 'Boise, Idaho'
    }, {
        name: 'Jonathan Maxwell',
        location: 'Manhattan, Kansas'
    },{
        name: 'Harper Ferry',
        location: 'Atlanta, Georgia'
    }];

// outputs name of person that is located in Atlanta, Georgia
findWhere(groupMembers, 'name', 'location', 'Atlanta, Georgia');
```

`.foreach` is something you've not seen before, so, [you go ahead and look it up](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).

Then, lets say you want to play with `.forEach` a little bit to get a better unstanding of it. Open up the console in your browser, and copy and paste the above function.

## Codewars and other JS code fun

A great way to review and further learn more about Javascript fundamentals is through [Codewars](http://codewars.com). Sign up and do all the 'kata' that you can. If you Google something and use it to get through a 'kata' be sure you understand why it works. Don't be lazy about this understanding. Its really going to help once you get to writing code for real projects with real teams.

[Code Combat](http://codecombat.com/)

## Don't be afraid of the command line:

The was javascript frameworks are being distributed and developed these days requires that you not be afraid to use the command line.

## 'I keep getting this question about closures'

Scope is a big deal. If you don't understand the scope of a variable in Javascript, you will run into all kinds of bugs that feel like phantoms.

Learn how to use `.call` and `.apply` and `.bind` and why they are necessary.

```javascript
function log(){
    var args = Array.prototype.slice.call(arguments);
    console.log.apply(console, args);
}
```

```javascript
var stuff = {
    line : 'say these things',
    say :  function(name) {
        console.log(name + ' ' + this.line);
    }
}

var things = {
    line: 'other things'
}

stuff.say.call(things, 'mimi');

var other = stuff.say.bind(stuff);

other('someone needs to');
```

* Learn about prototypical inheritance

* Learn about variable scope (hoisting, `this`, `.call` and `.apply` and `.bind`)

* Understand why the JS tools and frameworks you use work, what problem they were created to fix, and what alternatives are available.

## Modular Javascript

Modern Javascript requires a lot of code. In order to organize and maintain that code, functionality can be organized into modules that can be easily reused.

[Writing Modular Javascript with AMD, CommonJS and ES Harmony](http://addyosmani.com/writing-modular-js/)


## References

[Call, Apply, and Bind](http://dailyjs.com/2012/06/25/this-binding/)

[Learning Advanced Javascript](http://ejohn.org/apps/learn/)

[Javascript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)

[Currying in Javascript](https://medium.com/p/ce6da2d324fe)


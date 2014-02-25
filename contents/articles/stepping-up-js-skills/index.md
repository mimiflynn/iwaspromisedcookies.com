---
title: Stepping Up Your JS Skills
author: mimiflynn
date: 2014-02-17
template: article.jade
---

Lets say you're a front-end developer that has historically worked on marketing sites. The most complicated 'app' aspect of this marketing site is the search and contact forms and those were mostly managed by a CMS. You want a new job but all the new jobs are looking for front-end developers that build applications with complex interactions and huge Javascript codebases. The couple of interviews you've recently had were bad and a little embarrassing, but you feel confident in your knowledge of Javascript.

Recently, I've been interviewing candidates for front end web development positions and have been noticing that there are two kinds of Javascript developers: one that creates movement and fancy UI's for marketing sites and one that creates complex Rich Internet Applications (RIA).

<span class="more"></span>

As we all know, there has been a huge change in how JavaScript is being used on the web. Previously, one could get away with using jQuery for various carousels, dropdown menus and other UI doodads, but, now, complex applications and data modeling. As Rich Internet Applications become the expected norm, front end developers can't get away with only using jQuery.

## 'I keep getting this question about closures'

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



## References

[Javascript Design Patterns](http://addyosmani.com/resources/essentialjsdesignpatterns/book/)

[Currying in Javascript](https://medium.com/p/ce6da2d324fe)


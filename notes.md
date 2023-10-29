**UNSOLVED**: 

- Use a **module** pattern?
  - https://medium.com/@kadir.yavuz/encapsulation-in-javascript-iife-and-revealing-module-pattern-bebf49ddfa14
  - https://forum.freecodecamp.org/t/using-an-iife-to-create-a-module/369628/2
- About requestAnimationFrame (11-21 & 40-49) -> I think it's supposed to make smooth animation
  - Not sure what line 41&42 doing?
- About UNIT testing 
  - need some experienced suggestions

- Question in stretchtext.css:
  - it seems that all lines for [*epub**\:**type*=... do nothing.
  - have eliminated unnecessary codes based on the display. Not sure if there is a standard to do so.
- .html
  - move link to .js to the end of \<body> part



1. IIFE

```javascript
(Function(){
 // 闭包  Immediately Invoked Function Expression (IIFE) 
 // https://kaijuan.co/qa/2421911
 // https://segmentfault.com/q/1010000042982253
})();
```

```javascript
var italianSayinSomething = function(){ console.log('mamamia!'); }();
// 不能直接使用function(){ console.log('mamamia!'); }();会报错
// 相当于将函数表达式转换为函数声明

// 也可以写作
(function(){ console.log('mamamia!'); })(); 
// live demo: jsbin.com/zokuwodoco/1/edit?js,console.
```



2. [DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM) - document object moel

> structured representation of HTML documents. Allows javascipt to access HTML elements and styles to manipulate them. (stored as DOM tree)



3. **[Window](https://developer.mozilla.org/en-US/docs/Web/API/Window)** interface represents a window containing a DOM document; the `document` property points to the Dom document loaded in that window. 

Instance properties:

- **`window.console`**: returns a reference to the console object, which provides methods for logging information to the browser's console.

Instance methods: 

- **`window.requestAnimationFrame()`** : tells the browser that you wish to perform an animation. 

  - [Link1](https://juejin.cn/post/7190728064458817591) (ch) [Link2](https://blog.csdn.net/victoryzn/article/details/83109881)(ch)

- `setTimeout()`: [a function](https://www.codecademy.com/resources/docs/javascript/window/setTimeout) serviced globally by the window object provided by the user’s browser. It allows users to execute callbacks after a period of time expressed in milliseconds.

- ```javascript
  /* Provides requestAnimationFrame in a cross browser way
  	Ref: https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  	https://joshondesign.com/p/books/canvasdeepdive/chapter04.html
  */
  
  // A declaration of function named requestAnimationFrame 
  var requestAnimationFrame =
      window.requestAnimationFrame || // standard way to schedule animations
      // browser-specific
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame || 
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      // if none available, self-set frame rate
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  ```

  

4. **[Event](https://developer.mozilla.org/en-US/docs/Web/API/Event)** interface represents an event takes place in the DOM

Instance properties:

- **`target`**: read-only, is a reference to the object onto which the event was dispatched. Can be used in order to implement event delegation. (target 属性规定哪个 **DOM 元素**触发了该事件。target 事件属性可返回事件的目标节点（触发该事件的节点），如生成事件的元素、文档或窗口)

Instance methods:

- **`preventDefault()`**: tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be.



5. **[Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)** is the most general base class from which all element objects (i.e. objects that represent elements) in a `Document` inherit.

Property:

- **`classList`**: a read-only property that returns a live DOMtokenList collection of the `class` attributes of the element. Although the `classList` property itself is read-only, you can modify its associated `DOMTokenList` using the add(), remove(), replace(), and toggle() methods.
  - **`toggle()`**: removes an existing token from the list and returns False. It the token doesn't exist it's added and the function returns true. Returns a boolean value, t/f indicating whether token is in the list **after the call** or not.

Instant methods:

- **`hasAttribute(name)`**: returns a **Boolean** value indicating whether the specified element has the specified attribute or not. `name` is a string representing the name of the attribute.
  - 'title' in our code, 
- **`setAttribute(name, value)`**: Sets the value of an attribute on the specified element. If the attribute already exists, the value is updated; otherwise a new attribute is added with the specified name and value.

Events:

- `mousedown`: the event is fired at an Element when a pointing device button is pressed while the pointer is inside the element.
  - **Note:** This differs from the [`click`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) event in that `click` is fired after a full click action occurs; that is, the mouse button is pressed and released while the pointer remains inside the same element. `mousedown` is fired <u>the moment the button is initially pressed</u>.
- `touchstart`: the event is fired when one or more touch points are placed on the touch surface.
  - The touchstart event occurs when the user touches an element. But a click event is fired when the user clicks an element. *Usually, both the touchstart and click events are fired in the very same click in the touch and click enabled devices*.  
  - So, in this case, if the browser fires both touch and mouse events because of single user input, the browser must fire a touchstart before any mouse events. 
    There are two popular ways of solving this issue. 
    - Use of the **preventDefault()** or stopPropagation() method. This method prevents the event handler from responding to both touchstart and clicks events. If an application does not want mouse events fired on a specific touch target element, the element’s touch event handlers should call preventDefault() or stopPropagation() and no additional mouse events will be dispatched.
      **Example:** 



6. **[Document](https://developer.mozilla.org/en-US/docs/Web/API/Document)** interface represents any web page loaded in the browser and serves as an entry point into the web page's content, which is the DOM tree.

Instance properties:

- **`readyState`**: The **`Document.readyState`** property describes the loading state of the document. 
  - `complete`: The document and all sub-resources have finished loading. The state indicates that the load event is about to fire.s

Instance methods:

- **`getElementById(id)`**: returns an Element object representing the element whose `id` property matches the specified string.
- **`getElementsByClassName(names)`**: returns an **array-like object** of all child elements which have all of the given class name(s).
- **`querySelectorAll(selectors)`**: returns a static (not live) [`NodeList`](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) representing a list of the document's elements that match the specified group of selectors.

Events:

- **`DOMContentLoaded`**: the event fires when the HTML document has been completely parsed, and all deferred scripts have downloaded and executed. It doesn't wait for other things like images, subframes, and async scripts to finish loading. 
  - `DOMContentLoaded` does not wait for stylesheets to load. 
  - A different event, `load`, should be used only to detect a fully-loaded page. It is a common mistake to use `load` where `DOMContentLoaded` would be more appropriate.



7. where to insert Javascript link 

https://developer.aliyun.com/article/1054073 

https://ost.51cto.com/posts/85



8. Iterable

Old syntax: [[\].forEach.call()](https://stackoverflow.com/questions/16053357/what-does-foreach-call-do-in-javascript) 

About the [**spread syntax (...)**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax): 

- the syntax allows an iterable, such as an array or string, to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.
- for concatenate: 
  - [Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)
  - [es6 spread for concat](https://stackoverflow.com/questions/43455911/using-es6-spread-to-concat-multiple-arrays)
  - [spread v.s. array.concat()](https://stackoverflow.com/questions/48865710/spread-operator-vs-array-concat#:~:text=As%20you%20can%20see%2C%20spread,times%20faster%20on%20large%20arrays.)



More:

https://www.designcise.com/web/tutorial/how-to-iterate-over-an-array-like-object-in-javascript

https://masteringjs.io/tutorials/fundamentals/foreach-object



9. Others

Char entities: https://oinam.github.io/entities/ 

CSS selector: https://www.w3schools.com/cssref/css_selectors.php

Thur Course: https://www.craft.me/s/g2yePWbjdwOOae -- Haven't checked every bullet points yet
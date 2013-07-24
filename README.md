#jQuey-slide
===========
jQuery plugin that can slide elements using touch event.

##Getting Started

Basically html/css/javascript files look like this.

###html
```html:
<div id="slide-elements">
  <div class="slide-child">slide-a</div>
  <div class="slide-child">slide-b</div>
  <div class="slide-child">slide-c</div>
</div>
```
###css
```css:
#slide-element{
  width:100%;
  height:100px;
}
.slide-child{
  width:100%;
  height:100%;
  visibility:hidden;  #required;
  position:absolute;  #required;
}
```
###javascript
```js:
$(function(){
  $('selector').slide();
});
```
##Options
this method have two paramate option and callback function.
$('selector').slide(option,callback);

###option.auto : boolen
  if element be slid automatically.
  
###callback function
  callback function when slide action end.
  It is usefull when you can change/set/get something value in the element showing in the window.
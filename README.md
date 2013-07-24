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
This method have two paramater option and callback function.
$('selector').slide(option,callback);

###option.auto : boolean
  If elements are slid automatically or not.
  
###callback function
  Callback function called when slide action is ended.
  It is usefull when you can change/set/get something value in the element showing in the window.

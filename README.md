# jQuery-slide
=====
jQuery plugin that can slide elements using swipe action on the mobile.

## Getting Started

Basically html/css/javascript files look like this.

### html
```html:
<div id="slide-elements">
  <div class="slide-child">slide-a</div>
  <div class="slide-child">slide-b</div>
  <div class="slide-child">slide-c</div>
</div>
```
### css
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
### javascript
```js:
$(function(){
  $('selector').slide();
});
```
## Options
Type:PlainObject  
This method have two paramaters. option and callback function.  
$('selector').slide(option,callback);  

### auto  
Type:Boolean (default:false)  
Whether or not the elements are slid automatically.  
  
### Callback
Type:function  
A function to be called when slide action is ended.  
It is usefull when you change/set/get something value in the element showing in the window.  

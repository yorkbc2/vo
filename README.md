# VO

### VO- progressive HTML + CSS + JS Library


## VO IN HTML AND VO.RENDER

If you want to create variables in HTML, you need to include vo in your project. It is so easy.

```html

  <script src="vo.js"></script>
  
```

Next, you need to create script and call VO method. 
Just add to html your block with different ID.

```html
  <div id="#root">
    <!-- Your code here -->
  </div>
```

And call it in your script

```javascript
  <script>
    VO.render("#root")
  </script>
```

Before root block you need to create <vo> block and init there some variables like this 

The symbol "|" as ";" in another programming languages. 

The structure of variables  :

name_of_varible = value_of_variable |

```html
  <vo>
    my_name = Alexander Yorke |  
  </vo>
```


And use it in your block

```html

  <div id="#root">
    My name is %my_name%
  </div>
  
  <!-- Post render -->
  
  <div id="#root">
    My name is Alexander Yorke
  </div>

```


Make styles for elements 
```html
  <vo>
    h1_style = color: red; font-family: Helvetica, sans-serif ; |  
  </vo>
  <div id="#root">
    <h1 style="%h1_style%">
      My header.
     </h1>
  </div>
```

---
layout: blog_layout
title: "Expanding JavaScript Knowlege"
---

Expanding JavaScript Knowlege
=========================
 
This week I decided to work on improving my final project in the boot camp, Tracker. Tracker is an app that allows users to create cards to keep track of thing and quickly look a the relationships between those things. One of the pieces I wanted to improve, was the user interface to provide functionality for the user to group similar tracks in a named collection. I have always admired functionality apps like Trello provide that allows users to quickly organize and manage their tasks. In my search for finding similar functionality, I discovered a javascript layout engine called Muuri that I think will do the trick.
Muuri provides custom layouts, drag & drop features, nested grids, and fast animation that will allow me to completely transform the user experience with my tracker app. But first, to become familiar with Muuri, I decided to create a small app to play around with it a bit. I have the code posted in a Github repo [js-muuriExample](https://github.com/nickveil/js-muuriExample).
## Set up 
The first thing we have to do is included the CDN and the dependencies in the HTML file.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/web-animations/2.3.1/web-animations.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/muuri/0.5.3/muuri.min.js"></script>
    <script type="text/javascript" src="script.js"></script>
```
Web Animations handles all of the annimations and Hammer.js handles all of the drag events. Similar to BootStrap, each grid needs to have a container element. Items that go into the grid also need at least 2 elements for positioning and animation. The inner element is where your content goes.
``` html
<div class="board">
    <!-- Column Container-->
    <div class="board-col team1">
        <div class="board-col-header">
            <!-- Column Name Goes Here -->
            Whiskey Team
        </div>

        <div class="board-col-content">
            
            <div class="board-team-member">
                <div class="board-member-name">
                    <!-- Content goes here -->
                    Jon
                </div>
            </div>
        </div>
    </div>
</div>
```
## Style It
A couple things to note when styling. First, the container has to have a position set to relative, absolute or fixed. Second, elements need to have their positions set to absolute and display set to block. Third, you cannot use custom animations or transitions with any of the elements.
```css
.board {
  position: relative;
}
.board-col {
  position: absolute;
  left:0;
  right:0;
  width:30%;
  margin:0 1.5%;
  background:#a59a8f;
  border-radius: 3px;
  z-index:1;
}
.board-col.muuri-item-dragging {
  z-index: 3;
  cursor:move;
}
.board-col.muuri-item-releasing {
  z-index: 2;
}
.board-col-header {
  position: relative;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  padding: 0 20px;
  text-align: center;
  font-family: 'Anton', sans-serif;
  font-size: 24px;
  background: #6d584d;
  color: #b1b5ab;
  border-radius: 3px 3px 0 0;
}
.board-col-content {
  position: relative;
  border: 10px solid transparent;
  min-height: 95px;
}
.board-team-member {
  position: absolute;
  width: 100%;
  margin: 5px 0;
}
.board-team-member.muuri-item-releasing {
  z-index: 9998;
}
.board-team-member.muuri-item-dragging {
  z-index: 9999;
  cursor: move;
}
.board-team-member.muuri-item-hidden {
  z-index: 0;
}
.board-member-name {
  position: relative;
  padding: 20px;
  background: #61664e;
  border-radius: 50%;
  text-align: center;
  font-size: 17px;
  color: #a59a8f;
  cursor: pointer;
  -webkit-box-shadow: 0px 3px 5px 0 rgba(0,0,0,0.4);
  box-shadow: 0px 3px 5px 0 rgba(0,0,0,0.4);
}
```
## Let It Fly
You have to provide the container element and set the grid options to make things work. In the example below I have grid options set up to control both the columns and the team members.
```javascript
var itemContainers = [].slice.call(document.querySelectorAll('.board-col-content'));
var columnGrids = [];
var boardGrid;

/* Team member controls */
itemContainers.forEach(function (container){
    var grid = new Muuri(container,{
        items: '.board-team-member',
        layoutDuration:400,
        layoutEasing: 'ease',
        dragEnabled:true,
        dragSort: function(){
            return columnGrids;
        },
        dragSortInterval:0,
        dragContainer: document.body,
        dragReleaseDuration: 400,
        dragReleaseEasing: 'ease'
        })
        .on('dragStart', function(item){
            item.getElement().style.width = item.getWidth() + 'px';
            item.getElement().style.height = item.getHeight() + 'px';
        })
        .on('dragReleaseEnd', function (item){
            item.getElement().style.width = '';
        item.getElement().style.height = '';
        columnGrids.forEach(function(grid){
            grid.refreshItems();
        });
        })
        .on('layoutStart', function(){
            boardGrid.refreshItems().layout();
        })
        columnGrids.push(grid);
});

/* Column Control */
boardGrid = new Muuri('.board', {
  layoutDuration: 400,
  layoutEasing: 'ease',
  dragEnabled: true,
  dragSortInterval: 0,
  dragStartPredicate: {
    handle: '.board-col-header'
  },
  dragReleaseDuration: 400,
  dragReleaseEasing: 'ease'
});
```
## Conclusion
This small exercise really helped me understand how to utilize the Muuri javascript layout engine. It will help me improve the visual layout of my Tracker app and help the user organize their tracks in a meaningful way.
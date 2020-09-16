---
layout: blog_layout
title: "Laravel and Pusher Chatroom App Part 4"
---

A Simple Chatroom Application with Laravel and Pusher(Part 4)  
=========================
A quick review... I came across an example for a chatroom app that utilized Laravel and Pusher, a connection and messaging app that provides real-time content relay. It also touches on several features within Laravel, such as database connection, model generation, Vue.js integration, and eventing. If you haven't started yet, go to [Part 1](http://localhost:3000/2020/09/11/laravel-pusher-chatroomapp-part-1.html) in this series to get started.    

<img class="blog-img" src='https://github.com/nickveil/nickveil.github.io/blob/master/_assets/blog/img/Chat_Room_display.gif?raw=true' alt='ChatRoom application made with Laravel, Vue.js, and Pusher' width='100%' >  

### Chat View

Create a view called ```chat.blade.php``` in  ```app/resources/views``` to display the chat room. This file can be done in many different ways. Here is how I did it:
<pre class='code-red'>
// app/resources/views/chat.blade.php

@extends('layouts.app')

@section('content')

&lt;div class="display-3 text-center"&gt;ChatRoom&lt;/div&gt;
&lt;div class="container"&gt;
    &lt;div class="row"&gt;
        &lt;div class="col-md-10 col-md-offset-1"&gt;
            &lt;div class="chat-block p-4"&gt;
                &lt;chat-messages :messages="messages" class="messages"&gt;&lt;/chat-messages&gt;
            &lt;/div&gt;
            &lt;div class="panel-footer"&gt;
                &lt;chat-form
                    v-on:messagesent="addMessage"
                    :user="{{ Auth::user() }}"
                &gt;&lt;/chat-form&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;
@endsection

</pre>
And the corresponding style in ```app/resources/sass/app.scss``` : 
<pre class='code-red'>

.text-right {
    text-align: right;
}


.blockquote {
    margin: 15px;
    color: $purple
    
}
.user-color {
    color: $cyan;
}
.chat {
    overflow-y: scroll;
    max-height: 400px;
   
}

.chat::-webkit-scrollbar {
    width: .5em;
}
 
.chat::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px $blue;
    border-radius: 10px;
    background-color: #F5F5F5;
}
 
.chat::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px $gray;
    background-color: $cyan;
}
</pre>
Again, this can really look however you want it to but the important pieces are ```@extends ('layouts.app')``` which maintains the key pieces of the rest of the site. 

The 
<pre class='code-red'>
  @section('content')
	// code....
  @endsection
</pre>
which defines where this blade file should insert itself into the ```layouts/app.blade.php``` file.  

And the ```<chat-form>``` and ```<chat-messages>``` elements which are Vue components we still need to create.


In the next post we'll build and register the Vue components. [View Part 5 here.](http://localhost:3000/2020/09/14/laravel-pusher-chatroom-app-part-5.html)


---
layout: blog_layout
title: "Laravel and Pusher Chatroom App Part 5"
---

A Simple Chatroom Application with Laravel and Pusher(Part 5)  
=========================
A quick review... I came across an example for a chatroom app that utilized Laravel and Pusher, a connection and messaging app that provides real-time content relay. It also touches on several features within Laravel, such as database connection, model generation, Vue.js integration, and eventing. If you haven't started yet, go to [Part 1](http://localhost:3000/2020/09/11/laravel-pusher-chatroomapp-part-1.html) in this series to get started.    

<img class="blog-img" src='https://github.com/nickveil/nickveil.github.io/blob/master/_assets/blog/img/Chat_Room_display.gif?raw=true' alt='ChatRoom application made with Laravel, Vue.js, and Pusher' width='100%' >  

### Creating the Vue Components

 In your ```resources/js/components``` folder, create two new files and call them ```ChatMessages.vue``` and 	```ChatForm.vue```. You'll notice there is already an example component and this is because Laravel comes out of the box with Vue. [Learn more about Vue here.](https://vuejs.org/v2/guide/) Let's create our ```ChatMessages.vue``` component and this can vary, mine looks like this:
<pre class='code-red'>
	<template>
    <div class="chat">
      <div class="message-bubble" v-for="message in messages" >
        <blockquote v-bind:class="{'text-right user-color' : checkUser(message.user.name)}" class="blockquote mx-5">
            <p class="mb-0">{{message.message}}</p>
            <small><footer class="blockquote-footer mt-0"><cite>{{message.user.name}}</cite></footer></small>
        </blockquote>
      </div>
    </div>
    
</template>

<script>
  export default {
    props: ['messages'],
  };
</script>
</pre>
This component takes and array of messages as ```props:``` and loops through them using the ```v-for="message in messages"``` directive.

Next, the ```ChatForm.vue``` file. Again, this can vary but mine is as follows:
<pre class='code-red'>
&lt;template&gt;
  &lt;div class="input-group"&gt;
        &lt;input id="btn-input" type="text" name="message" class="form-control input-sm" placeholder="Type your message here..." v-model="newMessage" @keyup.enter="sendMessage"&gt;

        &lt;span class="input-group-btn"&gt;
            &lt;button class="btn btn-primary btn-sm" id="btn-chat" @click="sendMessage"&gt;
                Send
            &lt;/button&gt;
        &lt;/span&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
    export default {
        props: ['user'],

        data(){
            return {
                newMessage: ''
            }
        },

        methods: {
            sendMessage() {
                this.$emit('messagesent', {
                    user: this.user,
                    message: this.newMessage
                });

                this.newMessage = ''
            }
        }
    }
&lt;/script&gt;
</pre>
A few things going on in this component. First, we accept the authenticated user as props. Second, the ```newMessage``` data is bound to the input field and the ```sendMessage()``` is called when the send button is clicked or the enter key is pressed. ```sendMessage()``` triggers a ```messagesent``` event to send the user message to the root ```Vue``` instance. Finally, the input field is cleared by returning ``` newMessage: '' ````.

With the components created, we will now register them in the root ```Vue``` instance located in the ```resources/js/app.js```.  Looking at this file you'll notice the example component is registered and we will want to do the same for our components. 
<pre class='code-red'>
Vue.component('chat-form', require('./components/ChatForm.vue').default);
Vue.component('chat-messages', require('./components/ChatMessages.vue').default);
</pre>

The next thing in this file is to update our vue instance:
<pre class='code-red'>
const app = new Vue({
    el: '#app',

    data: {
        messages: []
    },

    created() {
        this.fetchMessages();
    },

    methods: {
        fetchMessages() {
            axios.get('/messages').then(response => {
                this.messages = response.data;
            });
        },

        addMessage(message) {
            this.messages.push(message);

            axios.post('/messages', message).then(response => {
                console.log(response.data);
            })
        }
    }
});
</pre>

In the instance, we are creating a couple of methods to fetch and add our messages using Axios.

In the next post we'll set up the event listeners. [View Part 6 here.](http://localhost:3000/2020/09/15/laravel-pusher-chatroom-app-part-6.html)
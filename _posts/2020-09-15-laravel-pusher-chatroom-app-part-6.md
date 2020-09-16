---
layout: blog_layout
title: "Laravel and Pusher Chatroom App Part 6"
---

A Simple Chatroom Application with Laravel and Pusher(Part 6)  
=========================
A quick review... I came across an example for a chatroom app that utilized Laravel and Pusher, a connection and messaging app that provides real-time content relay. It also touches on several features within Laravel, such as database connection, model generation, Vue.js integration, and eventing. If you haven't started yet, go to [Part 1](http://localhost:3000/2020/09/11/laravel-pusher-chatroomapp-part-1.html) in this series to get started.    

<img class="blog-img" src='https://github.com/nickveil/nickveil.github.io/blob/master/_assets/blog/img/Chat_Room_display.gif?raw=true' alt='ChatRoom application made with Laravel, Vue.js, and Pusher' width='100%' >  

### Broadcasting Events

We are already taking the message created by the user and persisting it to the database with our Model and showing it to the user in the ```<chat-messages>``` element with Vue. But other users have no way of seeing the messages of others without having to refresh the browser. Fortunately, Laravel can broadcast events and take action to automatically display the messages in realtime. First, let's create an event called MessageSent in the terminal:
```php artisan make:event MessageSent```

This generates a ```app/Events/MessageSent.php``` file for us. In this file, let's add
<pre class="code-red">
App\User;
App\Message;
</pre>
 to the already created dependencies. Next, we have to implement the ``` ShouldBroadcast``` interface with the ```MessageSent``` class with the construct and broadcastOn function. 
<pre class="code-red">
class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * User that sent the message
     *
     * @var User
     */
    public $user;

    /**
     * Message details
     *
     * @var Message
     */
    public $message;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user, Message $message)
    {
        $this->user = $user;
        $this->message = $message;

    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('chat');
    }
}
</pre>

Notice that we are returning a ```PrivateChannel('chat')``` object. We now have to create a route that will allow authenticated users can listen to by adding the code below to ```routes/channels.php``` :
<pre class="code-red">
Broadcast::channel('chat', function ($user) {
    return Auth::check();
});
</pre>
With our event and route created, we need to update the ```sendMessges()``` in ```app/Http/Controllers/ChatsController.php```. Just after the ```$message``` variable, let's add  
```broadcast(new MessageSent($user, $message))->toOthers();```.    

```toOther()``` here avoids duplicating the message for the user that is sending the message.  
Now that the event is being broadcast, we have to listen for it to update with the new message. Back in the ```resources /js/app.js``` we will add to ```created()```:
<pre class="code-red">
 	Echo.private('chat')
        .listen('MessageSent', (e) => {
            this.messages.push({
                message: e.message.message,
                user: e.user
            });
        });
</pre>
just after ```this.fetchMessages()```.

### Checking it out

Now that we have everything set, if you haven't already, run```npm install && npm run dev``` in the terminal to compile our Javascript files. Finally, we run ```php artisan serve``` in the terminal which starts a dev server and provides a URL to test your app in the browser.

---
layout: blog_layout
title: "Laravel and Pusher Chatroom App Part 2"
---

A Simple Chatroom Application with Laravel and Pusher(Part 2)  
=========================
A quick review... I came across an example for a chatroom app that utilized Laravel and Pusher, a connection and messaging app that provides real-time content relay. It also touches on several features within Laravel, such as database connection, model generation, Vue.js integration, and eventing. If you haven't started yet, go to [Part 1](http://localhost:3000/2020/09/11/laravel-pusher-chatroomapp-part-1.html) in this series to get started.    

<img class="blog-img" src='https://github.com/nickveil/nickveil.github.io/blob/master/_assets/blog/img/Chat_Room_display.gif?raw=true' alt='ChatRoom application made with Laravel, Vue.js, and Pusher' width='100%' >  

### Adding Authentication

Since users need to be authenticated, we will need to add it to our project. Luckily, Laravel provides a quick way to scaffold this with its laravel/ui package. First, we have to add the package. From the terminal, run:
<pre class="code-red">
composer require laravel/ui:^2.4
php artisan ui vue --auth
</pre>
** Notice once php artisan scaffold vue for us there is a message ```Please run "npm install && npm run dev" to compile your fresh scaffolding.``` in the terminal. We're not going to compile until the end in this tutorial but if you want to see the progress of the app as it's built, you will have to run this command before running ```php artisan serve```

This command installs views for the layout, registration, and login;  sets up the routes for authentication; and generates a HomeController to handle post-login requests. The package also generates several pre-built controllers. More info can be found in the [documentation](https://laravel.com/docs/7.x/authentication#authentication-quickstart).
Additionally, the User model and migration tables associated with the user are created which we will need to store our authorized user information.
Before we can run our migration, we have to set up our database. I use PostgreSQL but other [databases are supported](https://laravel.com/docs/7.x/database#introduction). Connecting the database for our dev work is also done in the  ```.env``` file.
<pre class="code-red">
DB_CONNECTION=pgsql
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=XXXXXXXXXXXX
DB_USERNAME=XXXXXXXXXXXX
DB_PASSWORD=XXXXXXXXXXXX
</pre>
With our database connection set, we can now run ``` php artisan migrate``` in the teminal.

### Adding the Message Model
We'll start by creating a Model with a corresponding migration file.
```php artisan make:model Message -m```
This generates a ```Message.php``` model in the ```/app``` folder of our project that contains our Message class. Open our ```Message.php``` file and we will need to specify the table column where our messages will be stored to the database by adding a ```protected $fillable ``` variable like so:
<pre class='code-red'>
/**
     * Fields that are mass assignable
     * 
     * @var array
     */
    protected $fillable = ['message'];
</pre>
Now, we have to set up our database schema to store our messages. In ```app/database/migrations``` folder we want to open the ```messages``` table migration that was created with our ```make:model -m``` command above. Within the ``` up()``` function, we have to update the schema for our messages table to look like the code below:
<pre class="code-red">
Schema::create('messages', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->text('message');
            $table->timestamps();
        });
</pre>
With our model and schema updated we can now run the migration in the terminal:
```php artisan migrate```

** As a side note, if something looks messed up in the messages table(ie. 'messages' is spelled wrong) you can correct the error in your migrations table and run PHP artisan migrate:refresh``` in the terminal which will rollback your and re-execute the migrations. This is a good option at the beginning of a project when there might not be as much data loss, but if you're further along in your project, look at the [Migrations Section](https://laravel.com/docs/7.x/migrations#running-migrations) of the Laravel docs to find a suitable solution.

### Setting up the User and Message Relationship

Back to our models, we have to define the relationships between User and Message.
First, we will update the ```app/Message.php``` model by adding a user function to the Message class: 
<pre class="code-red">
 /**
     * A message belongs to a user
     * 
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
</pre>

Next, we will do something similar in the ```User``` model by adding a messages function to the User class:
<pre class='code-red'>
/**
     * A user can have many messages
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function messages()
    {
        return $this->hasMany(Message::class);
    }
</pre>

Notice the ```belongsTo``` and ```hasMany``` methods that are being returned in each function? These are part of the [Eloquent ORM](https://laravel.com/docs/7.x/eloquent-relationships#introduction) which is included with Laravel.


In the next post we'll define the routes and set up the Chats Controller. [View Part 3 here.](http://localhost:3000/2020/09/12/laravel-pusher-chatroom-app-part-3.html)



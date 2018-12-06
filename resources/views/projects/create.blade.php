<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.2/css/bulma.css">
    <style>
        body {padding: 40px; }
    </style>
</head>
<body>
    
    <div id="app" class="container">
        
        <ul>
            @foreach($projects as $project)
            <li>{{ $project->name }} </li>
            @endforeach
        </ul>
        <hr>
        
       <form action="/projects" method="post" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
            @csrf
            
            <div class="field">
                <label class="label">Project Name</label>
                <div class="control">
                    <input name="name" class="input" type="text" placeholder="Project name" v-model="form.name">
                </div>
                <span v-if="form.errors.has('name')" class="help is-danger" v-text="form.errors.get('name')"></span>
            </div>

            <div class="field">
                <label class="label">Project Descriptpon</label>
                <div class="control">
                    <textarea name="description" class="textarea" placeholder="Description" v-model="form.description"></textarea>
                </div>
                <span v-if="form.errors.has('description')" class="help is-danger" v-text="form.errors.get('description')"></span>
            </div>

            <div class="field is-grouped">
                <div class="control">
                    <button :disabled="form.errors.any()" class="button is-primary">Create</button>
                </div>
            </div>
        </form>
        @include('errors')
    </div>
    <script src="https://unpkg.com/vue@2.5.17/dist/vue.js"></script>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="/js/app.js"></script>
</body>
</html>